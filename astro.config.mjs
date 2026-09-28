import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
import AstroPWA from '@vite-pwa/astro';
import { seoconfig } from "./utils/seoconfig";

// https://astro.build/config
export default defineConfig({
  site: seoconfig.site,
  base: seoconfig.base,
  compressHTML: true,
  build: {
    assets: "assets",
  },
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Fredoka",
    cssVariable: "--font-display",
    weights: ["300 700"],
    styles: ["normal"],
    subsets: ["latin"],
  }, {
    provider: fontProviders.fontsource(),
    name: "Nunito",
    cssVariable: "--font-body",
    weights: ["200 900"],
    styles: ["normal"],
    subsets: ["latin"],
  }],
  vite: {
    logLevel: "info",
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
  },
  integrations: [AstroPWA({
    registerType: 'autoUpdate',
    injectRegister: 'inline',
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'Numberbee Game by Voltable.com',
      short_name: 'Numberbee Game',
      description: seoconfig.description,
      theme_color: '#ffc237',
      background_color: '#fff8e2',
      icons: [{
        src: 'favicon-192.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: 'favicon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }, {
        src: 'favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }]
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}']
    },
    devOptions: {
      enabled: true,
      navigateFallback: '/404'
    }
  })]
});
