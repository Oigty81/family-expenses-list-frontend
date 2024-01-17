<script setup>
import { ref} from 'vue';

const title = ref(import.meta.env.VITE_LOCAL_ERROR_PAGE_TITLE);

</script>

<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 24vh">
        404
      </div>
      <div
        class="text-h2"
        style="opacity:.4"
      >
        ..... {{ title }} (SPA Route) .....
      </div>
      <div
        class="text-h3"
        style="opacity:.4"
      >
        Oops. Nothing here...
      </div>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>