import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="A community-centered digital platform documenting Rohingya displacement and everyday peacebuilding in Cox's Bazar, Bangladesh" />
        <meta property="og:title" content="Witnessing Rohingya — Digital Displacement Documentation" />
        <meta property="og:description" content="Documenting the world's largest refugee settlement through geospatial data, community voices, and displacement research." />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
