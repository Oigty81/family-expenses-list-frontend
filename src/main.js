import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import { Quasar, Notify, Dialog, Loading } from 'quasar';
import lang from 'quasar/lang/de.js';

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
app.use(Quasar, {
    plugins: {
        Notify,
        Dialog,
        Loading
    },
    lang: lang
});

// -----

app.mount('#app');
