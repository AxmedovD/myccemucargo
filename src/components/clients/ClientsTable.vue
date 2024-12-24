<template>
  <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">URL</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Token</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-if="loading" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Loading...
            </td>
          </tr>
          <tr v-else-if="error" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td colspan="6" class="px-6 py-4 text-center text-sm text-red-500">
              {{ error }}
            </td>
          </tr>
          <tr v-else-if="clients.length === 0" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No clients found
            </td>
          </tr>
          <tr v-for="client in clients" :key="client.client_id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
              {{ client.client_id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ client.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ client.contact }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ client.url }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <CopyableField :value="client.token" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <ActionButtons
                :regenerating="regeneratingTokenId === client.client_id"
                @edit="handleEdit(client)"
                @regenerate="handleRegenerateToken(client.client_id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditClientModal
      :is-open="!!selectedClient"
      :client="selectedClient"
      @close="selectedClient = null"
      @updated="$emit('refresh')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { regenerateToken } from '@/services/clientService'
import { useNotification } from '@/composables/useNotification'
import ActionButtons from './ActionButtons.vue'
import CopyableField from '@/components/ui/CopyableField.vue'
import EditClientModal from './EditClientModal.vue'

const props = defineProps({
  clients: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['refresh'])
const { showNotification } = useNotification()

const selectedClient = ref(null)
const regeneratingTokenId = ref(null)

const handleEdit = (client) => {
  selectedClient.value = client
}

const handleRegenerateToken = async (clientId) => {
  try {
    regeneratingTokenId.value = clientId
    await regenerateToken(clientId)
    showNotification('Token regenerated successfully', 'success')
    emit('refresh')
  } catch (error) {
    showNotification(error.message, 'error')
  } finally {
    regeneratingTokenId.value = null
  }
}
</script>