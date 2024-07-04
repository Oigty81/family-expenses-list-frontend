<script setup>
import { ref, onMounted } from 'vue';

import { useLanguageDataStore  } from '@/stores/languageData';

const languageDataStore = useLanguageDataStore();

const emit = defineEmits(['updateMetattext']);

const props = defineProps({
    currentMetatext: { type: String, required: true, default: () => {
            return "";
        }
    },
});

const inputRef = ref(null);
const metatext = ref('');

onMounted(() => {
    setTimeout(()=> {
      metatext.value = props.currentMetatext;
      inputRef.value.focus();
    }, 100);
});

</script>

<template>
  <div
    class="row"
    style="width: 100%;"
  >
    <div class="col-10 q-pb-sm">
      <q-input
        ref="inputRef"
        v-model="metatext"
        class="q-mt-sm q-ml-sm "
        @keydown.enter.prevent="emit('updateMetatext', metatext);"
      />
    </div>
    <div class="col-1">
      <q-btn
        class="q-ma-sm q-mt-md"
        outline
        no-caps
        size="md"
        color="primary"
        @click.stop="emit('updateMetatext', metatext);"
      >
        {{ languageDataStore.getLanguageText('ok') }}
      </q-btn>
    </div>
  </div>
</template>