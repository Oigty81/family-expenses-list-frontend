<script setup>
import { ref } from 'vue';

import { useUiStore } from '@/stores/ui.js';
import { useLanguageDataStore } from '@/stores/languageData.js';
import { useUserStore } from '@/stores/user.js';

import LanguageSelector from "@components/ui/LanguageSelector.vue";

const uiStore = useUiStore();
const languageDataStore  = useLanguageDataStore();
const userStore = useUserStore();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value;
};

const onCloseMenu = () => {
  leftDrawerOpen.value = false;
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
      :breakpoint="8192"
    >
      <!-- drawer content -->
      <q-list
        bordered
        separator
      >
        <q-item class="non-selectable">
          <q-item-section class="text-h5 text-left">
            {{ languageDataStore.getLanguageText('menu') }}
          </q-item-section>
          <q-btn
            icon="close"
            flat
            round
            dense
            @click="onCloseMenu()"
          />
        </q-item>

        <q-item
          v-ripple
          clickable
          active-class="bg-grey-4 text-blue-12"
          to="/"
        >
          <q-item-section>
            <q-item-label>{{ languageDataStore.getLanguageText('menuShowExpenses') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
          active-class="bg-grey-4 text-blue-12"
          to="/edit-category"
        >
          <q-item-section>
            <q-item-label>{{ languageDataStore.getLanguageText('menuEditCategory') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          clickable
          active-class="bg-grey-4 text-blue-12"
          to="/edit-category-composition"
        >
          <q-item-section>
            <q-item-label>{{ languageDataStore.getLanguageText('menuEditCategoryComposition') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  
    <q-page-container
      id="main-content-el"
      style="overflow-x: hidden; overflow-y: hidden;"
      :style="{'max-height': uiStore.heightContent + 'px'}"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>