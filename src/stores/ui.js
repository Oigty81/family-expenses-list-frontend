import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

export const useUiStore = defineStore('uiStore', () => {

    const heightViewport = ref(0);
    const heightHeader = ref(56);
    const heightFooter = ref(28);
	const darkModeState = ref(false);
    
    // -------------------

    const getHeightHeader = computed(() => heightHeader.value);

    const getHeightFooter = computed(() => heightFooter.value);

    const getHeightContent = computed(() => {
        return heightViewport.value - ( heightHeader.value + heightFooter.value) + 80;
    });

    const getDarkModeState = computed({
		get: () => darkModeState.value,
        set: (v) => {
            if((typeof v) === 'boolean') {
                darkModeState.value = v;
            }
        }
	});
	
	const getDarkModeProps = computed(() => {
        const $q = useQuasar();
        if(darkModeState.value === false) {
        $q.dark.set(false);
        } else {
        $q.dark.set(true);
        }

        if(darkModeState.value === true) {
            return {
                color: "red",
                text: "Dark Mode On"
            };
        } else {
            return {
                color: "blue",
                text: "Dark Mode Off",
            };
        }
    });
	
    // -------------------

    const setViewportHeight = async (h) => {
        heightViewport.value = h;
    };
	
	function setDarkmode(v) {
        if((typeof v) === 'boolean') {
            darkModeState.value = v;
        }
    }

    const scrollMainContentToBottom = () => {
        const el = document.getElementById("main-content-el");
        setTimeout(() => {
            
            el.scrollTo({
                top: el.scrollHeight,
                behavior: "smooth",
              });
        }, 50);
    };

    // -------------------

    return {
        getHeightHeader, getHeightFooter, getHeightContent,
		getDarkModeState, getDarkModeProps,
		
        setViewportHeight, setDarkmode, scrollMainContentToBottom
    };
});