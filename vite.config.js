import { defineConfig, loadEnv } from 'vite';

import eslintPlugin from "vite-plugin-eslint";

import vue from '@vitejs/plugin-vue';

import { ViteAliases } from 'vite-aliases';

import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  const proxyRequestObject = {};

  proxyRequestObject["" + process.env.VITE_LOCAL_REQUEST_BASE] = {
        target: 'http://localhost:8001/',
        changeOrigin: true,
        secure: false,
        ws: true,
      };

  return defineConfig({
    build: {
      emptyOutDir: true,
    },
    define: {
      'process.env': {}   // set fake for process.env object in vite-env
    },
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/styles/quasar/quasar.variables.scss'
      }),
      eslintPlugin(),
      ViteAliases({
        dir: 'src',
        prefix: '@',
      }),
    ],
    server: {
      proxy: proxyRequestObject,
    },
  });

};


