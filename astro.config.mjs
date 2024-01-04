import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind()],
  site: 'https://nicowebsite.com/astro',
  adapter: netlify()
});