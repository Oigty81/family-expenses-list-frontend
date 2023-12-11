<script setup>

import { useUiStore } from '@/stores/ui.js';
import { useUserStore } from '@/stores/user.js';

import MenuLayoutWeb from '@/layouts/MenuLayoutWeb.vue';
import MenuLayoutApp from '@/layouts/MenuLayoutApp.vue';
import MenuLayoutError from '@/layouts/MenuLayoutError.vue';

const userStore  = useUserStore();

userStore.setUserIsAuthenticatedWhenTokenIsAvailableAndValid();

useUiStore().setDarkmode(false);
useUiStore().setViewportHeight(window.innerHeight);

let MenuLayout = null;

addEventListener("resize", () => {
  useUiStore().setViewportHeight(window.innerHeight);
});

if(import.meta.env.VITE_LOCAL_USE_FOR === null || import.meta.env.VITE_LOCAL_USE_FOR === undefined) {
  MenuLayout = MenuLayoutError;
} else {
  if(import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "web") {
    MenuLayout = MenuLayoutWeb;
  } else if(import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === "app") {
    MenuLayout = MenuLayoutApp;
  } else {
    MenuLayout = MenuLayoutError;
  }
}
</script>

<template>
  <MenuLayout />
</template>
