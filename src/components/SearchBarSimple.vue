<script setup>
import { ref, onMounted } from 'vue';

import moment from 'moment';

import { useExpensesStore  } from '@/stores/expenses.js';

import { convertDateFromDeToUs } from '@/utilities/convertDate';

const expensesStore  = useExpensesStore();

const fromDate = ref('');
const toDate = ref('');

onMounted(() => {
  fromDate.value = moment().format('DD.MM.YYYY');
  toDate.value = moment().add(5, 'days').format('DD.MM.YYYY');
});

const onSearch = async () => {  
  await expensesStore.fetchExpensesPeriod(convertDateFromDeToUs(fromDate.value), convertDateFromDeToUs(toDate.value));
};

const onChangeFrom = () => {
  if(moment(convertDateFromDeToUs(fromDate.value)) > moment(convertDateFromDeToUs(toDate.value))) {
    fromDate.value = toDate.value;
  }
};

const onChangeTo = () => {
  if(moment(convertDateFromDeToUs(fromDate.value)) > moment(convertDateFromDeToUs(toDate.value))) {
    toDate.value = fromDate.value;
  }
};

</script>

<template>
  <div class="row">
    <div class="col-4 q-pa-sm">
      <q-input
        v-model="fromDate"
        filled
        :rules="['fromDate']"
        readonly
      >
        <template #append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="fromDate"
                mask="DD.MM.YYYY"
                minimal
                @click="onChangeFrom"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    style="display: absolute; top:-40px"
                    label="Close"
                    color="primary"
                    flat
                    @click="onChangeFrom"
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-4 q-pa-sm">
      <q-input
        v-model="toDate"
        filled
        :rules="['toDate']"
        readonly
      >
        <template #append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="toDate"
                mask="DD.MM.YYYY"
                minimal
                @click="onChangeTo"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    style="display: absolute; top:-40px"
                    label="Close"
                    color="primary"
                    flat
                    @click="onChangeTo"
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-4 q-pa-sm">
      <q-btn
        style="width: 100%"
        outline
        class="q-pa-md"
        color="info"
        :disable="expensesStore.getIsFetchExpensesPeriod"
        @click="onSearch"
      >
        <span
          v-if="!expensesStore.getIsFetchExpensesPeriod"
        >Search&nbsp;</span>
        <q-spinner-oval
          v-if="expensesStore.getIsFetchExpensesPeriod"
          color="amber"
        />
      </q-btn>
    </div>
  </div>
</template>