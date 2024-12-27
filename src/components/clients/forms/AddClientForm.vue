<template>
  <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
    <!-- Company Details Section -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Details</h4>
      <Input
        id="name"
        label="Company Name"
        v-model="form.name"
        placeholder="Enter company name"
        :error="errors.name?.[0]"
        required
      />

      <Input
        id="contact"
        label="Contact Person"
        v-model="form.contact"
        placeholder="Enter contact person name"
        :error="errors.contact?.[0]"
        required
      />
    </div>

    <!-- Location Section -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h4>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1">
          <Input
            id="country_code"
            label="Country"
            v-model="form.country_code"
            placeholder="US"
            :error="errors.country_code?.[0]"
            maxlength="2"
            class="uppercase"
            required
          />
        </div>
        <div class="col-span-3">
          <Input
            id="address"
            label="Address"
            v-model="form.address"
            placeholder="Enter full address"
            :error="errors.address?.[0]"
            required
          />
        </div>
      </div>
    </div>

    <!-- URLs Section -->
    <div class="space-y-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">URLs</h4>
      <Input
        id="url"
        label="Website URL"
        v-model="form.url"
        placeholder="https://example.com"
        :error="errors.url?.[0]"
        helper="Enter the full URL including https://"
        required
      />

      <Input
        id="webhook"
        label="Webhook URL (Optional)"
        v-model="form.webhook"
        placeholder="https://example.com/webhook"
        :error="errors.webhook?.[0]"
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
          {{ loading ? 'Creating...' : 'Create Client' }}
        </Button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { createClient } from '@/services/clientService'
import { useNotification } from '@/composables/useNotification'

const emptyForm = {
  name: '',
  contact: '',
  country_code: '',
  address: '',
  url: '',
  webhook: ''
}

const emit = defineEmits(['created', 'cancel'])
const { showNotification } = useNotification()

const form = ref({ ...emptyForm })
const loading = ref(false)
const errors = ref({})

const handleSubmit = async () => {
  try {
    loading.value = true
    errors.value = {}
    form.value.country_code = form.value.country_code.toUpperCase()
    
    const response = await createClient(form.value)
    showNotification('Client created successfully', 'success')
    emit('created')
  } catch (error) {
    if (error.validation) {
      errors.value = error.validation
    } else {
      showNotification(error.message || 'Failed to create client', 'error')
    }
  } finally {
    loading.value = false
  }
}
</script>