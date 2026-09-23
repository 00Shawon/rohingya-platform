"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { camps } from "../data";

export default function DisplacementMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  const [selectedCamp, setSelectedCamp] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* -----------------------------
     DATA
  ----------------------------- */

  const totalPopulation = useMemo(() => {
    return camps.reduce(
      (total, camp) => total + Number(camp.population || 0),
      0
    );
  }, []);

  const visibleCamps = useMemo(() => {
    const q = search.toLowerCase().trim();

    return camps.filter((camp) => {
      const matchesSearch =
        !q ||
        camp.name.toLowerCase().includes(q) ||
        camp.description.toLowerCase().includes(q);

      const matchesFilter =
        filter === "all" ||
        (filter === "camp" && camp.id !== 5) ||
        (filter === "relocated" && camp.id === 5);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  /* -----------------------------
     MAP INITIALIZATION
  ----------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapRef.current || mapInstance.current) return;

    const L = require("leaflet");

    /* Fix marker icons */
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    /* Create map */
    const map = L.map(mapRef.current, {
      center: [21.1, 92.15],
      zoom: 8,
      minZoom: 7,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstance.current = map;

    /* English basemap */
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          '&copy; <a href="https://www.esri.com/">Esri</a> &amp; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);

    /* Scale */
    L.control
      .scale({
        imperial: false,
        position: "bottomright",
      })
      .addTo(map);

    /* Cox's Bazar district */
    const coxBazarBounds = [
      [20.74, 91.95],
      [21.52, 92.42],
    ];

    L.rectangle(coxBazarBounds, {
      color: "#c0392b",
      weight: 2,
      fillColor: "#c0392b",
      fillOpacity: 0.04,
      dashArray: "7,5",
    })
      .addTo(map)
      .bindTooltip("Cox's Bazar District");

    /* Myanmar border indicator */
    L.polyline(
      [
        [20.74, 92.37],
        [21.52, 92.37],
      ],
      {
        color: "#7c3aed",
        weight: 2,
        dashArray: "8,5",
        opacity: 0.8,
      }
    )
      .addTo(map)
      .bindTooltip("Myanmar Border");

    return () => {
      map.remove();
      mapInstance.current = null;
      markersRef.current = {};
    };
  }, []);

  /* -----------------------------
     ADD / UPDATE MARKERS
  ----------------------------- */

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const L = require("leaflet");

    /* Remove old markers */
    Object.values(markersRef.current).forEach((item) => {
      if (item.marker) map.removeLayer(item.marker);
      if (item.label) map.removeLayer(item.label);
    });

    markersRef.current = {};

    /* Add visible markers */
    visibleCamps.forEach((camp) => {
      const relocated = camp.id === 5;

      const radius = Math.max(
        8,
        Math.min(
          27,
          Math.sqrt(Number(camp.population || 0) / 1000) * 3.2
        )
      );

      const marker = L.circleMarker([camp.lat, camp.lng], {
        radius,
        color: "#ffffff",
        weight: 2,
        fillColor: relocated ? "#0284c7" : "#c0392b",
        fillOpacity: 0.8,
      }).addTo(map);

      /* Popup */
      const services = Array.isArray(camp.services)
        ? camp.services
            .map(
              (service) => `
                <div class="camp-popup-item">
                  <span>+</span>
                  ${service}
                </div>
              `
            )
            .join("")
        : "";

      const challenges = Array.isArray(camp.challenges)
        ? camp.challenges
            .map(
              (challenge) => `
                <div class="camp-popup-item challenge">
                  <span>—</span>
                  ${challenge}
                </div>
              `
            )
            .join("")
        : "";

      const popup = `
        <div class="camp-popup">
          <div class="camp-popup-type">
            ${relocated ? "RELOCATION SITE" : "REFUGEE CAMP"}
          </div>

          <div class="camp-popup-title">
            ${camp.name}
          </div>

          <div class="camp-popup-population">
            <span>Population</span>
            <strong>${Number(
              camp.population
            ).toLocaleString()}</strong>
          </div>

          <div class="camp-popup-description">
            ${camp.description}
          </div>

          ${
            services
              ? `
                <div class="camp-popup-section">
                  <div class="camp-popup-section-title">
                    SERVICES
                  </div>
                  ${services}
                </div>
              `
              : ""
          }

          ${
            challenges
              ? `
                <div class="camp-popup-section">
                  <div class="camp-popup-section-title red">
                    CHALLENGES
                  </div>
                  ${challenges}
                </div>
              `
              : ""
          }

          <div class="camp-popup-meta">
            Est. ${camp.established} · ${camp.area}
          </div>
        </div>
      `;

      marker.bindPopup(popup, {
        maxWidth: 320,
        minWidth: 260,
        className: "advanced-popup",
      });

      marker.on("click", () => {
        setSelectedCamp(camp);
      });

      marker.on("mouseover", function () {
        this.setStyle({
          weight: 3,
          fillOpacity: 1,
        });
      });

      marker.on("mouseout", function () {
        this.setStyle({
          weight: 2,
          fillOpacity: 0.8,
        });
      });

      /* Permanent label */
      const label = L.tooltip({
        permanent: true,
        direction: "top",
        offset: [0, -radius - 3],
        className: relocated
          ? "camp-label relocated-label"
          : "camp-label",
      })
        .setContent(camp.name.split("–")[0].trim())
        .setLatLng([camp.lat, camp.lng])
        .addTo(map);

      markersRef.current[camp.id] = {
        marker,
        label,
      };
    });
  }, [visibleCamps]);

  /* -----------------------------
     FOCUS CAMP
  ----------------------------- */

  const focusCamp = (camp) => {
    const map = mapInstance.current;
    if (!map) return;

    setSelectedCamp(camp);

    map.flyTo([camp.lat, camp.lng], 12, {
      duration: 0.8,
    });

    setTimeout(() => {
      const item = markersRef.current[camp.id];

      if (item?.marker) {
        item.marker.openPopup();
      }
    }, 700);
  };

  /* -----------------------------
     RESET
  ----------------------------- */

  const resetMap = () => {
    const map = mapInstance.current;

    setSearch("");
    setFilter("all");
    setSelectedCamp(null);

    if (map) {
      map.flyTo([21.1, 92.15], 8, {
        duration: 0.7,
      });
    }
  };

  /* -----------------------------
     RENDER
  ----------------------------- */

  return (
    <div className="displacement-map">
      {/* HEADER */}
      <div className="map-header">
        <div>
          <div className="map-eyebrow">
            FORCED DISPLACEMENT · BANGLADESH
          </div>

          <h2>Rohingya Displacement Map</h2>

          <p>
            Refugee settlements and population distribution
            in and around Cox&apos;s Bazar.
          </p>
        </div>

        <button
          type="button"
          className="reset-button"
          onClick={resetMap}
        >
          ↺ Reset
        </button>
      </div>

      {/* STAT BAR */}
      <div className="map-stats">
        <div className="stat-box">
          <div className="stat-label">SITES</div>
          <div className="stat-value">{camps.length}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">TOTAL POPULATION</div>
          <div className="stat-value">
            {totalPopulation.toLocaleString()}
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-label">VIEWING</div>
          <div className="stat-value">
            {visibleCamps.length}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="map-controls">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search camps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-buttons">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={filter === "camp" ? "active" : ""}
            onClick={() => setFilter("camp")}
          >
            Camps
          </button>

          <button
            type="button"
            className={
              filter === "relocated" ? "active" : ""
            }
            onClick={() => setFilter("relocated")}
          >
            Bhasan Char
          </button>
        </div>

        {/* SEARCH RESULTS */}
        {search && visibleCamps.length > 0 && (
          <div className="search-results">
            {visibleCamps.map((camp) => (
              <button
                type="button"
                key={camp.id}
                onClick={() => focusCamp(camp)}
                className="search-result"
              >
                <div>
                  <strong>{camp.name}</strong>
                  <span>
                    {Number(
                      camp.population
                    ).toLocaleString()}{" "}
                    people
                  </span>
                </div>

                <span className="arrow">→</span>
              </button>
            ))}
          </div>
        )}

        {search && visibleCamps.length === 0 && (
          <div className="no-results">
            No matching camp found.
          </div>
        )}
      </div>

      {/* MAP */}
      <div ref={mapRef} className="map-area" />

      {/* SELECTED CAMP PANEL */}
      {selectedCamp && (
        <div className="selected-panel">
          <button
            type="button"
            className="close-panel"
            onClick={() => setSelectedCamp(null)}
          >
            ×
          </button>

          <div className="panel-type">
            {selectedCamp.id === 5
              ? "RELOCATION SITE"
              : "REFUGEE CAMP"}
          </div>

          <h3>{selectedCamp.name}</h3>

          <div className="panel-population">
            <span>Population</span>
            <strong>
              {Number(
                selectedCamp.population
              ).toLocaleString()}
            </strong>
          </div>

          <p>{selectedCamp.description}</p>

          {selectedCamp.services?.length > 0 && (
            <div className="panel-section">
              <div className="panel-section-title">
                SERVICES
              </div>

              {selectedCamp.services.map((service) => (
                <div
                  className="panel-item"
                  key={service}
                >
                  <span>+</span>
                  {service}
                </div>
              ))}
            </div>
          )}

          {selectedCamp.challenges?.length > 0 && (
            <div className="panel-section">
              <div className="panel-section-title red">
                CHALLENGES
              </div>

              {selectedCamp.challenges.map(
                (challenge) => (
                  <div
                    className="panel-item muted"
                    key={challenge}
                  >
                    <span>—</span>
                    {challenge}
                  </div>
                )
              )}
            </div>
          )}

          <div className="panel-meta">
            Established {selectedCamp.established}
            {" · "}
            {selectedCamp.area}
          </div>

          <button
            type="button"
            className="focus-button"
            onClick={() => focusCamp(selectedCamp)}
          >
            Focus location →
          </button>
        </div>
      )}

      {/* LEGEND */}
      <div className="map-legend">
        <div className="legend-title">MAP KEY</div>

        <div className="legend-row">
          <span className="legend-circle red-circle" />
          Refugee camp
        </div>

        <div className="legend-row">
          <span className="legend-circle blue-circle" />
          Bhasan Char / relocated
        </div>

        <div className="legend-row">
          <span className="legend-border" />
          Myanmar border
        </div>

        <div className="legend-note">
          Circle size = population
        </div>
      </div>

      {/* SOURCE */}
      <div className="map-source">
        Source: UNHCR 2024 · Basemap: Esri / OpenStreetMap
      </div>

      {/* ALL CSS IN THIS COMPONENT */}
      <style>{`
        .displacement-map {
          position: relative;
          width: 100%;
          height: 720px;
          min-height: 600px;
          overflow: hidden;
          background: #f3f1ed;
          border: 1px solid #d8d5cf;
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .map-area {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* HEADER */

        .map-header {
          position: absolute;
          z-index: 500;
          top: 240px;
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          pointer-events: none;
        }

        .map-header > div {
          pointer-events: auto;
        }

        .map-eyebrow {
          margin-bottom: 6px;
          color: #c0392b;
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .map-header h2 {
          margin: 0;
          color: #202020;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.05;
        }

        .map-header p {
          max-width: 450px;
          margin: 7px 0 0;
          color: #666;
          font-size: 11px;
          line-height: 1.5;
        }

        .map-header > div:first-child {
          padding: 16px 18px;
          background: rgba(255, 255, 255, 0.94);
          border-left: 3px solid #c0392b;
          box-shadow:
            0 8px 30px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
        }

        .reset-button {
          pointer-events: auto;
          border: 1px solid #d3d0ca;
          background: rgba(255, 255, 255, 0.94);
          padding: 10px 13px;
          color: #333;
          cursor: pointer;
          font-family: monospace;
          font-size: 10px;
          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.08);
        }

        .reset-button:hover {
          background: #fff;
        }

        /* STATS */

        .map-stats {
          position: absolute;
          z-index: 500;
          top: 145px;
          left: 20px;
          display: flex;
          gap: 7px;
        }

        .stat-box {
          min-width: 115px;
          padding: 9px 11px;
          background: rgba(255, 255, 255, 0.93);
          border: 1px solid #d8d5cf;
          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(7px);
        }

        .stat-label {
          margin-bottom: 3px;
          color: #888;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .stat-value {
          color: #222;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 18px;
        }

        /* SEARCH */

        .map-controls {
          position: absolute;
          z-index: 500;
          top: 20px;
          right: 20px;
          width: 255px;
        }

        .search-box {
          display: flex;
          align-items: center;
          height: 38px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #d3d0ca;
          box-shadow:
            0 7px 24px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
        }

        .search-box > span {
          padding-left: 11px;
          color: #777;
          font-size: 17px;
        }

        .search-box input {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          padding: 0 8px;
          color: #222;
          font-size: 11px;
        }

        .search-box input::placeholder {
          color: #999;
        }

        .search-box button {
          border: 0;
          background: transparent;
          padding: 0 10px;
          color: #888;
          cursor: pointer;
          font-size: 18px;
        }

        /* FILTER */

        .filter-buttons {
          display: flex;
          margin-top: 7px;
          padding: 3px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #d3d0ca;
          box-shadow:
            0 7px 24px rgba(0, 0, 0, 0.07);
        }

        .filter-buttons button {
          flex: 1;
          border: 0;
          background: transparent;
          padding: 7px 5px;
          color: #777;
          cursor: pointer;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .filter-buttons button.active {
          background: #202020;
          color: #fff;
        }

        /* SEARCH RESULTS */

        .search-results {
          margin-top: 5px;
          max-height: 300px;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid #d3d0ca;
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .search-result {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: 0;
          border-bottom: 1px solid #ece9e4;
          background: transparent;
          padding: 10px;
          text-align: left;
          cursor: pointer;
        }

        .search-result:hover {
          background: #f7f5f1;
        }

        .search-result strong {
          display: block;
          color: #222;
          font-size: 10px;
        }

        .search-result span {
          display: block;
          margin-top: 3px;
          color: #999;
          font-family: monospace;
          font-size: 8px;
        }

        .search-result .arrow {
          color: #c0392b;
          font-size: 15px;
        }

        .no-results {
          margin-top: 5px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid #d3d0ca;
          color: #777;
          font-size: 10px;
        }

        /* SELECTED PANEL */

        .selected-panel {
          position: absolute;
          z-index: 600;
          left: 20px;
          bottom: 30px;
          width: 300px;
          max-height: 58%;
          overflow-y: auto;
          padding: 17px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid #d8d5cf;
          border-top: 3px solid #c0392b;
          box-shadow:
            0 15px 40px rgba(0, 0, 0, 0.14);
          backdrop-filter: blur(10px);
        }

        .close-panel {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 25px;
          height: 25px;
          border: 0;
          background: #f1efeb;
          color: #666;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
        }

        .panel-type {
          margin-bottom: 6px;
          color: #c0392b;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .selected-panel h3 {
          margin: 0;
          padding-right: 25px;
          color: #222;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 23px;
          line-height: 1.15;
        }

        .panel-population {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 13px 0;
          padding: 10px;
          background: #f5f3ef;
        }

        .panel-population span {
          color: #888;
          font-family: monospace;
          font-size: 8px;
          text-transform: uppercase;
        }

        .panel-population strong {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 18px;
        }

        .selected-panel p {
          margin: 0;
          color: #626262;
          font-size: 10px;
          line-height: 1.6;
        }

        .panel-section {
          margin-top: 15px;
        }

        .panel-section-title {
          margin-bottom: 7px;
          color: #555;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .panel-section-title.red {
          color: #c0392b;
        }

        .panel-item {
          display: flex;
          gap: 7px;
          margin-bottom: 5px;
          color: #555;
          font-size: 9px;
          line-height: 1.4;
        }

        .panel-item span {
          color: #0284c7;
          font-weight: 700;
        }

        .panel-item.muted {
          color: #777;
        }

        .panel-item.muted span {
          color: #aaa;
        }

        .panel-meta {
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #e7e3de;
          color: #999;
          font-family: monospace;
          font-size: 7px;
        }

        .focus-button {
          width: 100%;
          margin-top: 12px;
          border: 0;
          background: #202020;
          padding: 10px;
          color: #fff;
          cursor: pointer;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .focus-button:hover {
          background: #333;
        }

        /* LEGEND */

        .map-legend {
          position: absolute;
          z-index: 500;
          left: 20px;
          bottom: 20px;
          min-width: 190px;
          padding: 11px 12px;
          background: rgba(255, 255, 255, 0.93);
          border: 1px solid #d8d5cf;
          box-shadow:
            0 7px 24px rgba(0, 0, 0, 0.08);
        }

        .legend-title {
          margin-bottom: 8px;
          color: #222;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .legend-row {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 5px;
          color: #555;
          font-size: 9px;
        }

        .legend-circle {
          width: 10px;
          height: 10px;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 1px #bbb;
        }

        .red-circle {
          background: #c0392b;
        }

        .blue-circle {
          background: #0284c7;
        }

        .legend-border {
          width: 18px;
          border-top: 2px dashed #7c3aed;
        }

        .legend-note {
          margin-top: 8px;
          padding-top: 7px;
          border-top: 1px solid #ece9e4;
          color: #999;
          font-family: monospace;
          font-size: 7px;
        }

        /* SOURCE */

        .map-source {
          position: absolute;
          z-index: 500;
          right: 8px;
          bottom: 5px;
          padding: 3px 5px;
          background: rgba(255, 255, 255, 0.75);
          color: #666;
          font-family: monospace;
          font-size: 7px;
        }

        /* POPUP */

        .advanced-popup
          .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 0;
        }

        .advanced-popup
          .leaflet-popup-content {
          width: auto !important;
          margin: 0;
        }

        .camp-popup {
          padding: 15px;
        }

        .camp-popup-type {
          margin-bottom: 5px;
          color: #c0392b;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .camp-popup-title {
          margin-bottom: 11px;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 19px;
          font-weight: 600;
        }

        .camp-popup-population {
          display: flex;
          justify-content: space-between;
          padding: 9px;
          background: #f5f3ef;
        }

        .camp-popup-population span {
          color: #777;
          font-family: monospace;
          font-size: 8px;
        }

        .camp-popup-population strong {
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 16px;
        }

        .camp-popup-description {
          margin-top: 11px;
          color: #666;
          font-size: 9px;
          line-height: 1.55;
        }

        .camp-popup-section {
          margin-top: 12px;
        }

        .camp-popup-section-title {
          margin-bottom: 5px;
          color: #555;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
        }

        .camp-popup-section-title.red {
          color: #c0392b;
        }

        .camp-popup-item {
          display: flex;
          gap: 6px;
          margin-bottom: 3px;
          color: #666;
          font-size: 8px;
        }

        .camp-popup-item span {
          color: #0284c7;
          font-weight: 700;
        }

        .camp-popup-item.challenge span {
          color: #aaa;
        }

        .camp-popup-meta {
          margin-top: 11px;
          color: #aaa;
          font-family: monospace;
          font-size: 7px;
        }

        /* LABELS */

        .camp-label {
          padding: 2px 4px !important;
          border: 0 !important;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.85);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.1);
          color: #222;
          font-family: monospace;
          font-size: 8px;
          font-weight: 700;
        }

        .camp-label::before {
          display: none !important;
        }

        .relocated-label {
          border-left: 2px solid #0284c7 !important;
        }

        /* MOBILE */

        @media (max-width: 800px) {
          .displacement-map {
            height: 760px;
          }

          .map-header {
            top: 12px;
            left: 12px;
            right: 12px;
          }

          .map-header > div:first-child {
            max-width: calc(100% - 70px);
            padding: 12px;
          }

          .map-header h2 {
            font-size: 20px;
          }

          .map-header p {
            font-size: 9px;
          }

          .reset-button {
            padding: 8px;
            font-size: 9px;
          }

          .map-stats {
            top: 120px;
            left: 12px;
            right: 12px;
            gap: 5px;
          }

          .stat-box {
            min-width: 0;
            flex: 1;
            padding: 7px;
          }

          .stat-value {
            font-size: 14px;
          }

          .map-controls {
            top: 175px;
            left: 12px;
            right: 12px;
            width: auto;
          }

          .selected-panel {
            left: 12px;
            right: 12px;
            bottom: 30px;
            width: auto;
            max-height: 42%;
          }

          .map-legend {
            left: 12px;
            bottom: 10px;
            min-width: 0;
            padding: 8px;
          }

          .map-source {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}