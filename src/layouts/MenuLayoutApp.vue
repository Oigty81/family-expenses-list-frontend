<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useUiStore } from '@/stores/ui.js';
import { useLanguageDataStore } from '@/stores/languageData.js';
import { useUserStore } from '@/stores/user.js';
import { useUtilitiesStore } from '../stores/utilities.js';

import LanguageSelector from "@components/ui/LanguageSelector.vue";

const MENU_BREAKPOINT = 4096; // hack, always display menu-button when use mobile-app layout

const router = useRouter();
const uiStore = useUiStore();
const languageDataStore  = useLanguageDataStore();
const userStore = useUserStore();
const utilitiesStore = useUtilitiesStore();

const leftDrawerOpen = ref(false);
const isDesktopBreakPoint = ref(false);
const showTopMenuButton = ref(false);

const toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value;
};

const onResize = (size) => {
    
  if(size.width >= MENU_BREAKPOINT) {
      leftDrawerOpen.value = true;
      showTopMenuButton.value = false;
      isDesktopBreakPoint.value = true;
  } else {
      leftDrawerOpen.value = false;
      showTopMenuButton.value = true;
      isDesktopBreakPoint.value = false;
  }
};

const clickLogout = async () => {
  userStore.logout();
  await router.push({ path: '/dummy' });
  await router.push({ path: '/' });
};

</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          v-if="showTopMenuButton"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="non-selectable">
          <q-avatar>
            <img
              src="@/assets/logo.png"
              style="width: 80%; height: auto;"
            >
          </q-avatar>
          <span class="q-mx-md">Family Expenses List</span>
          <q-badge
            class="q-ml-xl text-subtitle1"
            outline
            color="warning"
          >
            <i class="fa-solid fa-user" />
            <span class="q-mx-md">
              {{ userStore.getUserData.displayname }}
            </span>
          </q-badge>
        </q-toolbar-title>
        <q-btn
          v-if="userStore.isAuthenticated"
          class="q-ma-xs"
          color="primary"
          icon="fa-solid fa-arrow-right-from-bracket"
          label="Logout"
          @click="clickLogout()"
        />
        <LanguageSelector />
        <span
          v-if="utilitiesStore.getBatteryState >= 90"
          class="text-h4 q-ml-md q-mr-md"
        ><i class="fa-solid fa-battery-full" /></span>
        <span
          v-if="utilitiesStore.getBatteryState >= 66 && utilitiesStore.getBatteryState < 90"
          class="text-h4 q-ml-md q-mr-md"
        ><i class="fa-solid fa-battery-three-quarters" /></span>
        <span
          v-if="utilitiesStore.getBatteryState >= 33 && utilitiesStore.getBatteryState < 66"
          class="text-h4 q-ml-md q-mr-md"
        ><i class="fa-solid fa-battery-half" /></span>
        <span
          v-if="utilitiesStore.getBatteryState >= 10 && utilitiesStore.getBatteryState < 33"
          class="text-h4 text-red-3 q-ml-md q-mr-md"
        ><i class="fa-solid fa-battery-quarter" /></span>
        <span
          v-if="utilitiesStore.getBatteryState >= 0 && utilitiesStore.getBatteryState < 10"
          class="text-h4 text-red-14 q-ml-md q-mr-md"
        ><i class="fa-solid fa-battery-empty" /></span>
        <q-btn
          class="q-ma-xs"
          icon="fa-solid fa-window-minimize"
          @click="utilitiesStore.appMinimize()"
        />
        <q-btn
          class="q-ma-xs"
          icon="fa-solid fa-power-off"
          @click="utilitiesStore.appQuit()"
        />
      </q-toolbar>
    </q-header>
  
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      :breakpoint="MENU_BREAKPOINT"
    >
      <!-- drawer content -->
      <q-list
        bordered
        separator
      >
        <q-item class="non-selectable">
          <q-item-section class="text-h5 text-center">
            {{ languageDataStore.getLanguageText('menu') }}
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
          active-class="bg-grey-4 text-blue-12"
          to="/"
        >
          <q-item-section>
            <q-item-label>Show Expenses</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
          active-class="bg-grey-4 text-blue-12"
          to="/edit-category"
        >
          <q-item-section>
            <q-item-label>Edit Category</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
          active-class="bg-grey-4 text-blue-12"
          to="/edit-category-composition"
        >
          <q-item-section>
            <q-item-label>Edit Category Composition</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  
    <q-page-container
      id="main-content-el"
      style="overflow-x: hidden; overflow-y: auto;"
      :style="{'max-height': uiStore.heightContent + 'px'}"
    >
      <router-view />
      <q-resize-observer @resize="onResize" />
    </q-page-container>
  </q-layout>
</template>