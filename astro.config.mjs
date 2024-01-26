import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: 'server',
  // site: 'http://astro.test/astrobox/dist',
  adapter: netlify(),
  prefetch: true,
  // base: './'
});