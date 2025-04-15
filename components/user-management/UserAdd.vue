<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(['update:isOpen']);

const close = () => {
  emit('update:isOpen', false);
};


const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>



<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50" @click.self="close">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-block p-6 rounded-lg shadow-lg relative">
          <button class="absolute top-2 right-2 text-2xl" @click="close" aria-label="Закрыть окно">
            ×
          </button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

