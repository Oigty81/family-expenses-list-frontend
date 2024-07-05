<script setup>
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps({
    title: { type: String, required: false, default: () => {
        return "";
        }
    },
    full: { type: Number, required: false, default: () => {
            return false;
        }
    },
    persistent: { type: Boolean, required: false, default: () => {
                return false;
            }
    },
    visible: { type: Boolean, required: false, default: () => {
            return false;
        }
    },
    minHeight: { type: Number, required: false, default: () => {
            return 0;
        }
    },
    draggable: { type: Boolean, required: false, default: () => {
            return false;
        }
    },
});

const emit = defineEmits(['dialogClosed']);

const $q = useQuasar();

const isVisible = ref(false);
const dialogPosition = ref({x: 0, y: 0});

const headerFontSize = computed(()=> {
  return $q.screen.lt.sm ? '0.8rem' : '1.4rem';
});

const dialogTranslation = computed(() => {
  return {
        transform: `translate(${dialogPosition.value.x}px, ${dialogPosition.value.y}px)`
  };
});

const onClose = () => {
    emit('dialogClosed');
};

const onHide = () => {
  onClose();
};

const onPan = ($e) => {
  if(props.draggable === true) {
    dialogPosition.value = {
    x: dialogPosition.value.x + $e.delta.x,
    y: dialogPosition.value.y + $e.delta.y,
  };
  }
};

watch(props, (newValue) => {
    if(newValue.visible === true) {
        isVisible.value = true;
        dialogPosition.value = {x: 0, y: 0};
    } else {
        isVisible.value = false;
    }
  }, {deep: false, immediate: false }
);

const currentContentHeight = ref(0);
const currentDialogHeight = ref(0);

const onResizeContent = (size) => {
    currentContentHeight.value = size.height;
};

const onResizeDialog = (size) => {
    currentDialogHeight.value = size.height;
};

const styleContent = computed(() => {
  if(currentDialogHeight.value < currentContentHeight.value + 96) {
    return { overflowY: 'auto', height: (currentDialogHeight.value - 86) + 'px' };
  } else {
    return {};
  }
});

</script>

<template>
  <q-dialog
    v-model="isVisible"
    :full-width="full"
    :persistent="persistent"
    @hide="onHide"
  >
    <q-resize-observer @resize="onResizeDialog" />
    <q-card
      style="max-width: 99vw;overflow: hidden !important;"
      :style="{...dialogTranslation, minHeight: props.minHeight + 'px' }"
    >
      <q-card-section
        v-touch-pan.prevent.mouse="onPan"
        :style="{ height: 50 + 'px'}"
        class="row items-center q-pb-none"
      >
        <div
          v-if="title.length > 0"
          class="text-center q-my-auto non-selectable"
        >
          <div
            class="text-grey-9 text-weight-bold"
            :style="{ fontSize: headerFontSize }"
          >
            {{ title }}
          </div>
        </div>
        
        <q-space />
        <slot name="header" />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
          @click="onClose()"
        />
      </q-card-section>

      <q-card-section
        :style="styleContent"
      >
        <div>
          <slot />
        </div>
        <q-resize-observer @resize="onResizeContent" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>