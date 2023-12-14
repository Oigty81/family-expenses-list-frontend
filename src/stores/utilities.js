import axios from "axios";

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';


export const useUtilitiesStore = defineStore('utilitiesStore', () => {

    const batteryState = ref(66);

    // -------------------

    const getBatteryState = computed(() => batteryState.value );

    // -------------------

    const loadBatterystate = () => {
        axios({
            method: 'get',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utilities/batterystate'
        })
        .then((response) => {
            const data = JSON.parse(response.data);
            batteryState.value = data;
        })
        .catch((error) => {
            console.log("error loadBatterystate() ", error);
        });
    };

    const appMinimize = () => {
        axios({
            method: 'get',
            url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utilities/minimize'
        });
      };
    
      const appQuit = () => {
          axios({
              method: 'get',
              url: import.meta.env.VITE_LOCAL_REQUEST_BASE + '/utilities/quit'
          });
      };

      // -------------------

      return {
            getBatteryState,
            loadBatterystate, appMinimize, appQuit
      };
});
