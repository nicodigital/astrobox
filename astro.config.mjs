import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import htmx from 'astro-htmx';
import netlify from "@astrojs/netlify";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), htmx(), icon()],
  output: 'server', // <-- Esto es condicional para HTMX

  // Site y Base son para colocar un Build en producción - En este caso también configurar HOME_URL en .env
  // Aqui va el dominio
  // site: 'https://nicolook.com',
  // site: 'http://localhost:4321',

  // Aqui va el folder, en caso de root -> /
  // base: '/astro',
  // base: '/',

  adapter: netlify(),
  prefetch: true
});