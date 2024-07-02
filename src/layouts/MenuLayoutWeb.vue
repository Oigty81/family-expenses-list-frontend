<script setup>
import { ref } from 'vue';

import { useUiStore } from '@/stores/ui.js';
import { useLanguageDataStore } from '@/stores/languageData.js';
import { useUserStore } from '@/stores/user.js';

import LanguageSelector from "@components/ui/LanguageSelector.vue";

const MENU_BREAKPOINT = 2024;

const uiStore = useUiStore();
const languageDataStore  = useLanguageDataStore();
const userStore = useUserStore();

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
        <LanguageSelector />
        <q-btn
          v-if="userStore.isAuthenticated"
          class="q-ma-xs"
          color="primary"
          icon="fa-solid fa-arrow-right-from-bracket"
          label="Logout"
          @click="userStore.logout()"
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