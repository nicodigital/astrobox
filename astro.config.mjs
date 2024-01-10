import { defineConfig } from 'astro/config';

import NetlifyCMS from "astro-netlify-cms"

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    NetlifyCMS({
      config: {
        backend: {
          name: "git-gateway",
          branch: "decap-cms",
        },
        collections: [
          {
            label: "News",
            name: "news",
            slug: "{{title}}",
            folder: "src/pages/news",
            create: true,
            delete: true,
            fields: [
              {
                label: "Title",
                name: "title",
                widget: "string",
              },
              {
                label: "Description",
                name: "description",
                widget: "string",
              },
              {
                label: "Imagen",
                name: "img",
                widget: "image",
              },
              {
                label: "External URL",
                name: "extURL",
                widget: "string",
               required: false,
              },
            ],
          },
        ],
      },
    })
  ],
  // output:'hybrid', 
  site: 'https://nicowebsite.com/astro',
  adapter: netlify(),
});