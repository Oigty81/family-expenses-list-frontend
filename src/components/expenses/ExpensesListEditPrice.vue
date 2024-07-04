<script setup>
import { ref, onMounted } from 'vue';
import { useCurrencyInput } from "vue-currency-input";

import { useLanguageDataStore  } from '@/stores/languageData';

const languageDataStore = useLanguageDataStore();

const emit = defineEmits(['updatePrice']);

const props = defineProps({
    currentPrice: { type: Number, required: true, default: () => {
            return 0;
        }
    },
});

const price = useCurrencyInput({ currency: 'EUR' });

onMounted(() => {
    setTimeout(() => {
        price.setValue(props.currentPrice);
        price.inputRef.value.focus();
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
        :ref="price.inputRef"
        v-model="price.formattedValue"
        class="q-mt-sm q-ml-sm "
        @keydown.enter.prevent="emit('updatePrice', price.numberValue._value);"
      />
    </div>
    <div class="col-1">
      <q-btn
        class="q-ma-sm q-mt-md"
        outline
        no-caps
        size="md"
        color="primary"
        @click.stop="emit('updatePrice', price.numberValue._value);"
      >
        {{ languageDataStore.getLanguageText('ok') }}
      </q-btn>
    </div>
  </div>
</template>