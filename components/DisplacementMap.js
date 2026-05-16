import { useEffect, useRef } from 'react'
import { camps } from '../data'

export default function DisplacementMap() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (mapInstance.current) return

    const L = require('leaflet')

    // Fix default marker icons
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })

    const map = L.map(mapRef.current, {
      center: [21.1, 92.15],
      zoom: 9,
      zoomControl: true,
    })

    mapInstance.current = map

    // Minimal dark tile
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18,
    }).addTo(map)

    // Cox's Bazar district highlight
    const coxBazarBounds = [
      [20.74, 91.95],
      [21.52, 92.42]
    ]
    L.rectangle(coxBazarBounds, {
      color: '#c0392b',
      weight: 2,
      fillColor: '#c0392b',
      fillOpacity: 0.06,
      dashArray: '6,4'
    }).addTo(map).bindTooltip('Cox\'s Bazar District — Primary Refugee Zone', {
      permanent: false,
      className: 'zone-tooltip'
    })

    // Myanmar border indicator
    L.polyline([
      [20.74, 92.37],
      [21.52, 92.37]
    ], {
      color: '#9333ea',
      weight: 3,
      dashArray: '8,4',
      opacity: 0.7
    }).addTo(map).bindTooltip('Myanmar Border', { permanent: false })

    // Camp markers with custom sizing by population
    camps.forEach(camp => {
      const radius = Math.sqrt(camp.population / 1000) * 3.5
      const circle = L.circleMarker([camp.lat, camp.lng], {
        radius: Math.max(radius, 8),
        fillColor: camp.id === 5 ? '#0284c7' : '#c0392b',
        color: '#fff',
        weight: 2,
        fillOpacity: 0.75,
      })

      const popupContent = `
        <div class="popup-inner">
          <div class="popup-name">${camp.name}</div>
          <div class="popup-pop">Population: ${camp.population.toLocaleString()}</div>
          <div class="popup-desc">${camp.description}</div>
          <div style="margin-top:0.75rem">
            <div style="font-size:0.72rem;font-weight:600;color:#555;margin-bottom:0.3rem;font-family:monospace;">SERVICES</div>
            ${camp.services.map(s => `<div style="font-size:0.72rem;color:#666;margin-bottom:0.15rem">• ${s}</div>`).join('')}
          </div>
          <div style="margin-top:0.5rem">
            <div style="font-size:0.72rem;font-weight:600;color:#c0392b;margin-bottom:0.3rem;font-family:monospace;">CHALLENGES</div>
            ${camp.challenges.map(c => `<div style="font-size:0.72rem;color:#888;margin-bottom:0.15rem">• ${c}</div>`).join('')}
          </div>
          <div style="font-size:0.7rem;color:#aaa;margin-top:0.5rem;font-family:monospace;">Est. ${camp.established} · ${camp.area}</div>
        </div>
      `

      circle.bindPopup(popupContent, { className: 'custom-popup', maxWidth: 280 })
      circle.addTo(map)

      // Label
      L.tooltip({
        permanent: true,
        direction: 'top',
        className: 'camp-label',
        offset: [0, -10]
      })
      .setContent(`<span style="font-size:0.65rem;font-weight:600;font-family:monospace;color:#333">${camp.name.split('–')[0]}</span>`)
      .setLatLng([camp.lat, camp.lng])
      .addTo(map)
    })

    // Legend
    const legend = L.control({ position: 'bottomleft' })
    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'map-legend')
      div.style.cssText = 'background:white;padding:1rem;border:1px solid #ddd;border-top:3px solid #c0392b;font-family:monospace;font-size:0.72rem;line-height:1.6;min-width:160px'
      div.innerHTML = `
        <div style="font-weight:700;margin-bottom:0.5rem;font-family:serif;font-size:0.85rem">Legend</div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem">
          <div style="width:12px;height:12px;border-radius:50%;background:#c0392b;flex-shrink:0"></div>
          <span>Refugee Camp</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem">
          <div style="width:12px;height:12px;border-radius:50%;background:#0284c7;flex-shrink:0"></div>
          <span>Bhasan Char (relocated)</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem">
          <div style="width:20px;height:3px;border-top:2px dashed #9333ea;flex-shrink:0"></div>
          <span>Myanmar Border</span>
        </div>
        <div style="color:#999;margin-top:0.5rem;font-size:0.65rem">Circle size = population</div>
        <div style="color:#999;font-size:0.65rem">Source: UNHCR 2024</div>
      `
      return div
    }
    legend.addTo(map)

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  )
}
