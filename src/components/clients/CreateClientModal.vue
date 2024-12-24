<template>
  <Modal :is-open="isOpen" title="Create New Client" @close="handleClose">
    <AddClientForm
      :loading="loading"
      :errors="errors"
      @created="handleCreated"
      @cancel="handleClose"
    />
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/ui/Modal.vue'
import AddClientForm from './forms/AddClientForm.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'created'])
const loading = ref(false)
const errors = ref({})

const handleCreated = () => {
  emit('created')
  emit('close')
}

const handleClose = () => {
  errors.value = {}
  emit('close')
}
</script>