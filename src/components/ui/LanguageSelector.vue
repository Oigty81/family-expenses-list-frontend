<script setup>
  import {useAppStateStore} from "@stores/appState.js";

  const appState = useAppStateStore();

</script>

<template>
  <q-btn-toggle
    v-model="appState.currentLanguageId"
    toggle-color="green-4"
    class="toggle-1 bg-white"
    no-caps
    unelevated
    color="gray-7"
    text-color="blue-9"
    :options="[
      {label: 'En', value: 1},
      {label: 'De', value: 2},
    ]"
  />
</template>

<style scoped>

</style>