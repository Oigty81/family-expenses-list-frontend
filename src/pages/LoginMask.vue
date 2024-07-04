<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';

import { useRouter } from 'vue-router';

import { useUserStore  } from '@/stores/user';
import { useLanguageDataStore } from '@/stores/languageData.js';
import { useUtilitiesStore } from '../stores/utilities.js';

import LanguageSelector from "@components/ui/LanguageSelector.vue";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();
const languageDataStore  = useLanguageDataStore();
const utilitiesStore = useUtilitiesStore();

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const appMode = ref(false);

onMounted(() => {
  if(import.meta.env.VITE_LOCAL_USE_FOR.toLowerCase() === 'app') {
    appMode.value = true;
  }
});

const headerFontSize = computed(()=> {
  return $q.screen.lt.md ? '1.3rem' : '2.1rem';
});

const clickLogin = async () => {
  if(username.value === "" || password.value === "") {
    username.value = "";
    password.value = "";
    return;
  }
  errorMessage.value = "";
  try {
    await userStore.login(username.value, password.value);
    await router.push("/");
  } catch(ex) {
    console.log('in catch block', ex);
    errorMessage.value = ex;
    username.value = "";
    password.value = "";
  }
};

const clickCloseApp = async () => {
  utilitiesStore.appQuit();
};


</script>

<template>
  <div class="fullscreen bg-white text-white text-center q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-grey-3">
          <q-card
            class="q-pa-sm q-ma-xs shadow-2"
            style="min-width: 370px; width: 600px"
            bordered
          >
            <q-card-section class="text-center">
              <div class="row">
                <div class="col text-left">
                  <q-avatar style="position: relative;">
                    <img
                      src="../assets/logo.png"
                      style="width: 80px; height: auto; position: absolute; top: -20px"
                    >
                  </q-avatar>
                </div>
                <div class="col text-center q-my-auto">
                  <div
                    class="text-grey-9 text-weight-bold"
                    :style="{ fontSize: headerFontSize }"
                  >
                    {{ languageDataStore.getLanguageText('singIn') }}
                  </div>
                </div>
                <div class="col text-right">
                  <LanguageSelector />
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="username"
                dense
                outlined
                :label="languageDataStore.getLanguageText('username')"
                @keydown.enter.prevent="clickLogin()"
              />
              <q-input
                v-model="password"
                dense
                outlined
                class="q-mt-md"
                type="password"
                :label="languageDataStore.getLanguageText('password')"
                @keydown.enter.prevent="clickLogin()"
              />
              <div class="text-red-8 text-subtitle1">
                {{ errorMessage }}
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                style="border-radius: 8px;"
                color="dark"
                rounded
                size="md"
                no-caps
                class="full-width"
                :disable="userStore.isLoginRequest"
                @click="clickLogin()"
              >
                <span
                  v-if="!userStore.isLoginRequest"
                >{{ languageDataStore.getLanguageText('singIn') }}&nbsp;</span>
                <q-spinner-oval
                  v-if="userStore.isLoginRequest"
                  color="amber"
                />
              </q-btn>
            </q-card-section>
            <q-card-section
              v-if="appMode"
            >
              <q-btn
                style="border-radius: 8px;"
                color="dark"
                rounded
                size="md"
                no-caps
                class="full-width"
                :disable="userStore.isLoginRequest"
                @click="clickCloseApp()"
              >
                <span>Close App</span>
              </q-btn>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>