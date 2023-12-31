import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

import { useLanguageStore } from '@/stores/language.js';

// Import font and icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// -----

// App Styles
import './styles/main.scss';

// -----

import App from './App.vue';

const store = createPinia();
const app = createApp(App);

app.use(store);
app.use(router);
app.use(Quasar, quasarUserOptions);

// -----

useLanguageStore().loadLanguageSettings(import.meta.env.VITE_LOCAL_LANGUAGE);

app.mount('#app');
