<script setup>
import {ref, computed, watch, onMounted } from "vue";
import { useLanguageDataStore  } from '@/stores/languageData';
import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';

const languageDataStore = useLanguageDataStore();

const props = defineProps({
    datetimeString: { type: String, required: true, default: () => '2024-01-01 00:00' },
    position: { type: Object, required: false, default: () => { return {x: 0, y: 0}; } },
    label: { type: String, required: true, default: () => ''},
    disable: { type: Boolean, required: false, default: () => false},
});

const emit = defineEmits(['updateDatetime']);

const currentDateTime = ref(moment("2024-01-12 10:30").toDate());

const dtComponentPosition = ref(null);
const customPosition = () => { return customPositionComputed.value; };
const customPositionComputed = computed(() => {
  let pos = dtComponentPosition.value.getBoundingClientRect();
  if(dtComponentPosition.value === null || pos === undefined) {
    return { top: 0, left: 0 };
  }
  return { top: pos.y + (pos.height / 2) - 200 + props.position.y, left: pos.x + props.position.x};
});

const refDatetimePickerCustomSlot = ref(null);

const coverStyleForDisabledMode = ref({});

onMounted(() => {
  setTimeout(() => {
    if(dtComponentPosition.value !== undefined && dtComponentPosition.value !== null) {
      const pos = dtComponentPosition.value.getBoundingClientRect();
      coverStyleForDisabledMode.value = {
        position: 'absolute',
        backgroundColor: '#0000',
        width: pos.width + 'px',
        height: pos.height + 'px',
        zIndex: 9999
      };
    }
  }, 500);
});



watch(props, () => {
  currentDateTime.value = moment(props.datetimeString).toDate();
}, { immediate: true, deep: false});


const currentDateTimeFormated = computed(() => {
  if(currentDateTime.value === null || currentDateTime.value === undefined) {
    return "";
  }
  return moment(currentDateTime.value).format("YYYY-MM-DD HH:mm");
});

const currentDateTimeFormatedDE = computed(() => {
    if(currentDateTime.value === null || currentDateTime.value === undefined) {
      return "";
    }
    return moment(currentDateTime.value).format("DD.MM.YYYY HH:mm");
  });

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
  <div ref="dtComponentPosition">
    <div
      v-if="disable === true"
      class="cursor-not-allowed"
      :style="coverStyleForDisabledMode"
    />
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
          @click="() => { refDatetimePickerCustomSlot.selectDate(); emit('updateDatetime', currentDateTimeFormated); }"
        >
          Ok
        </q-btn>
      </template>
      <template #trigger>
        <q-input
          v-model="currentDateTimeFormatedDE"
          filled
          readonly
          :label="label"
          class="q-mb-md input-field"
          :disable="disable === true"
        >
          <template #append>
            <q-icon
              name="event"
              class="cursor-pointer"
            />
          </template>
        </q-input>
      </template>
    </Datepicker>
  </div>
</template>

<style lang="scss" scoped>
.input-field {
  transition: all linear 100ms 0ms;
}

.input-field:hover {
  background-color: #ececec !important;
}
</style>
