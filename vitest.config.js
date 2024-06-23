import { defineConfig, configDefaults  } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import { ViteAliases } from 'vite-aliases';

export default defineConfig({
    plugins: [
        Vue({
            template: {
              compilerOptions: {
                isCustomElement: (tag) => ['q-btn', 'q-input'].includes(tag),
              }
            }
        }),
        ViteAliases({
            dir: 'src',
            prefix: '@',
        }),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
        ////include: ['./test/**/*.spec.ts'],
        exclude:[
            ...configDefaults.exclude,
            'dist2',

            'tests/unit/stores/ui.spec.js',
            'tests/unit/stores/languageData.spec.js',
            'tests/unit/stores/user.spec.js',
            //'tests/unit/stores/categoriesData.spec.js',
            //'tests/unit/stores/expensesData.spec.js',
            'tests/unit/stores/utilities.spec.js',

            'tests/unit/utilities/ajaxWeb.spec.js'
 
        ]
    },
    root: ".",
});
