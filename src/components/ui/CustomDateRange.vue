<script setup>
import {ref, computed, watch } from "vue";
import { useLanguageDataStore  } from '@/stores/languageData';
import Datepicker from '@vuepic/vue-datepicker';
import moment from 'moment';

const languageDataStore = useLanguageDataStore();

const props = defineProps({
    datetimeRangeStrings: { type: Array, required: true, default: () => ['2024-01-01 00:00', '2024-01-03 12:00']},
    position: { type: Object, required: false, default: () => { return {x: 0, y: 0}; } },
    label: { type: String, required: true, default: () => ''},
});

const emit = defineEmits(['updateDateRange']);

const currentDateRange = ref([]);
const currentDateRangeModel = ref([]);

watch(props, () => {
    if(props.datetimeRangeStrings === undefined || props.datetimeRangeStrings.length === 0) {
      currentDateRange.value = [];
      currentDateRangeModel.value = [];
      return;
    }

    let fromString = moment(props.datetimeRangeStrings[0]).format('YYYY-MM-DD');
    let toString = "";

    if(props.datetimeRangeStrings[1] === null) {
      toString = fromString;
    } else {
      toString = moment(props.datetimeRangeStrings[1]).format('YYYY-MM-DD');
    }
    
    if(fromString === toString) {
      currentDateRangeModel.value = [ moment(fromString).toDate(), null ];
    } else {
      currentDateRangeModel.value = [ moment(fromString).toDate(), moment(toString).toDate() ];
    }

    currentDateRange.value = currentDateRangeModel.value;
    emit('updateDateRange', currentDateRangeFormated.value);
    
}, { immediate: false, deep: false});

const dtComponentPosition = ref(null);
const customPosition = () => { return customPositionComputed.value; };
const customPositionComputed = computed(() => {
  let pos = dtComponentPosition.value.getBoundingClientRect();
  if(dtComponentPosition.value === null || pos === undefined) {
    return { top: 0, left: 0 };
  }
  return { top: pos.y + (pos.height / 2) - 200 + props.position.y, left: pos.x + props.position.x};
});

const refDateRangePickerCustomSlot = ref(null);

const currentDateRangeFormated = computed(() => {
  if(currentDateRange.value === null || currentDateRange.value === undefined || currentDateRange.value.length === undefined || currentDateRange.value.length === 0) {
    return "";
  }

  if(currentDateRange.value[1] === null) {
      return [
        moment(currentDateRange.value[0]).format("YYYY-MM-DD 00:00"),
        moment(currentDateRange.value[0]).format("YYYY-MM-DD 23:59:59")  //NOTE: "value[0]" is correct here
      ];
    } else {
      return [
        moment(currentDateRange.value[0]).format("YYYY-MM-DD 00:00"),
        moment(currentDateRange.value[1]).format("YYYY-MM-DD 23:59:59")  //NOTE: and here than "value[1]"
      ];
    }
});

const currentDateRangeFormatedDE = computed(() => {
    if(currentDateRange.value === null || currentDateRange.value === undefined || currentDateRange.value.length === undefined || currentDateRange.value.length === 0) {
      return "";
    }
    if(currentDateRange.value[1] === null) {
      return moment(currentDateRange.value[0]).format("DD.MM.YYYY");
    } else {
      return moment(currentDateRange.value[0]).format("DD.MM.YYYY") + '-' + moment(currentDateRange.value[1]).format("DD.MM.YYYY");
    }
  });

  const dtPreviewFormatDe = (date) => {
    if(date.length < 2 || date[1] === null) {
      return `${date[0].getDate().toString().padStart(2, '0')}.${(date[0].getMonth() + 1).toString().padStart(2, '0')}.${date[0].getFullYear()}`;
    } else {
      return `${date[0].getDate().toString().padStart(2, '0')}.${(date[0].getMonth() + 1).toString().padStart(2, '0')}.${date[0].getFullYear()} -` +
        `${date[1].getDate().toString().padStart(2, '0')}.${(date[1].getMonth() + 1).toString().padStart(2, '0')}.${date[1].getFullYear()}`;
    }
};

</script>

<template>
  <div ref="dtComponentPosition">
    <Datepicker
      ref="refDateRangePickerCustomSlot"
      v-model="currentDateRangeModel"
      menu-class-name="custom-dtp-1"
      :teleport="true"
      time-picker-inline
      range
      :enable-time-picker="false"
      :preview-format="dtPreviewFormatDe"
      :alt-position="customPosition"
      :locale="languageDataStore.dateTimePickerLocation"
      @update:model-value="(e) => { currentDateRange = e;}"
    >
      <template #action-buttons>
        <q-btn
          no-caps
          color="primary"
          size="sm"
          @click="() => { refDateRangePickerCustomSlot.selectDate(); emit('updateDateRange', currentDateRangeFormated); }"
        >
          Ok
        </q-btn>
      </template>
      <template #trigger>
        <q-input
          v-model="currentDateRangeFormatedDE"
          filled
          stack-label
          :label="label"
          readonly
          class="q-mb-md input-field"
        >
          <template #append>
            <q-icon
              v-if="currentDateRange.length > 0"
              class="cursor-pointer"
              name="clear"
              @click.stop.prevent="() => { currentDateRange = []; currentDateRangeModel = [ moment().toDate(), null ], emit('updateDateRange', []) }"
            />
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