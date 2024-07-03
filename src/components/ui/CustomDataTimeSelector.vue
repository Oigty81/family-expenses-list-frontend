<script setup>

import {ref, computed, watch } from "vue";

import { useUiStore  } from '@/stores/ui';
import { useLanguageDataStore  } from '@/stores/languageData';
import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';

const uiStore = useUiStore();
const languageDataStore = useLanguageDataStore();

const props = defineProps({
    initialDateTime: { type: String, required: true, default: () => '2024-01-01 12:00' },
    label: { type: String, required: true, default: () => ''},
});

const emit = defineEmits(['update']);

const currentDateTime = ref(moment("2024-01-12 10:30").toDate());

const dtComponentPosition = ref(null);
const customPosition = () => { return customPositionComputed.value; };

const customPositionComputed = computed(() => {
  let pos = dtComponentPosition.value.getBoundingClientRect();
  if(dtComponentPosition.value === null || pos === undefined) {
    return { top: 0, left: 0 };
  }
  
  if(uiStore.heightViewport < pos.y + 200) {
    return { top: 240 , left: pos.x};
  } else if(pos.y < 300) {
    return { top: 280 , left: pos.x};
  } else {
    return { top: pos.y + (pos.height / 2) - 200 , left: pos.x};
  }

});

const refDatetimePickerCustomSlot = ref(null);

watch(props, () => {
  currentDateTime.value = moment(props.initialDateTime).toDate();
}, { immediate: true, deep: false});


const currentDateTimeFormated = computed(() => {
  if(currentDateTime.value === null || currentDateTime.value === undefined) {
    return "";
  }
  return moment(currentDateTime.value).format("YYYY-MM-DD HH:mm");
});

//TODO: refactor this -> also available in @/components/ui/CustomDatetime.vue
const dtPreviewFormatDe = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};
</script>

<template>
  <div
    ref="dtComponentPosition"
    style="display: inline-block;"
    @click.stop
  >
    <Datepicker
      ref="refDatetimePickerCustomSlot"
      v-model="currentDateTime"
      menu-class-name="custom-dtp-1"
      :teleport="true"
      time-picker-inline
      :preview-format="dtPreviewFormatDe"
      :alt-position="customPosition"
      :locale="languageDataStore.dateTimePickerLocation"
    >
      <template #action-buttons>
        <q-btn
          no-caps
          color="primary"
          size="sm"
          @click="() => { refDatetimePickerCustomSlot.selectDate(); emit('update', currentDateTimeFormated); }"
        >
          Ok
        </q-btn>
      </template>
      <template #trigger>
        <i class="q-ml-sm fa-solid fa-pencil" />
      </template>
    </Datepicker>
  </div>
</template>