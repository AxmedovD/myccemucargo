<script setup>
import { ref, watch } from 'vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { updateClient } from '@/services/clientService'
import { useNotification } from '@/composables/useNotification'

const props = defineProps({
  client: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updated', 'cancel'])
const { showNotification } = useNotification()

const form = ref({
  name: '',
  contact: '',
  country_code: '',
  address: '',
  url: '',
  webhook: ''
})

const loading = ref(false)
const errors = ref({})

// Initialize form with client data
watch(() => props.client, (newClient) => {
  if (newClient) {
    form.value = {
      name: newClient.name || '',
      contact: newClient.contact || '',
      country_code: newClient.country_code || '',
      address: newClient.address || '',
      url: newClient.url || '',
      webhook: newClient.webhook || ''
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  try {
    loading.value = true
    errors.value = {}
    form.value.country_code = form.value.country_code.toUpperCase()
    await updateClient(props.client.client_id, form.value)
    showNotification('Client updated successfully', 'success')
    emit('updated')
  } catch (error) {
    if (error.validation) {
      errors.value = error.validation
    } else {
      showNotification(error.message, 'error')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
    <!-- Company Details Section -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Details</h4>
      <Input
        id="edit-name"
        label="Company Name"
        v-model="form.name"
        placeholder="Enter company name"
        :error="errors.name"
        required
      />

      <Input
        id="edit-contact"
        label="Contact Person"
        v-model="form.contact"
        placeholder="Enter contact person name"
        :error="errors.contact"
        required
      />
    </div>

    <!-- Location Section -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h4>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1">
          <Input
            id="edit-country_code"
            label="Country"
            v-model="form.country_code"
            placeholder="US"
            :error="errors.country_code"
            maxlength="2"
            class="uppercase"
            required
          />
        </div>
        <div class="col-span-3">
          <Input
            id="edit-address"
            label="Address"
            v-model="form.address"
            placeholder="Enter full address"
            :error="errors.address"
            required
          />
        </div>
      </div>
    </div>

    <!-- URLs Section -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">URLs</h4>
      <Input
        id="edit-url"
        label="Website URL"
        v-model="form.url"
        placeholder="https://example.com"
        :error="errors.url"
        helper="Enter the full URL including https://"
        required
      />

      <Input
        id="edit-webhook"
        label="Webhook URL (Optional)"
        v-model="form.webhook"
        placeholder="https://example.com/webhook"
        :error="errors.webhook"
        helper="URL for receiving webhook notifications"
      />
    </div>

    <!-- Form Actions -->
    <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex justify-end space-x-3">
        <Button 
          variant="secondary" 
          type="button"
          @click="$emit('cancel')"
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </Button>
      </div>
    </div>
  </form>
</template>