import { Notify, Loading } from 'quasar';

import lang from 'quasar/lang/de.js';

// to be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    Loading
  },
  lang: lang
};
