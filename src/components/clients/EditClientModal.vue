<template>
  <Modal :is-open="isOpen" title="Edit Client" @close="handleClose">
    <EditClientForm
      :client="client"
      @updated="handleUpdated"
      @cancel="handleClose"
    />
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import EditClientForm from './forms/EditClientForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  client: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'updated'])

const handleUpdated = () => {
  emit('updated')
  emit('close')
}

const handleClose = () => {
  emit('close')
}
</script>