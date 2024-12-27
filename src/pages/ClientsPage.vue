<template>
  <div class="space-y-6">
    <!-- Responsive Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Clients</h1>
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <ClientsSearch 
          v-model="searchQuery" 
          :disabled="loading"
          class="w-full sm:w-[300px]"
          @search="handleSearch"
        />
        <Button 
          variant="primary" 
          @click="showCreateModal = true"
          class="w-full sm:w-auto whitespace-nowrap"
        >
          + Add Client
        </Button>
      </div>
    </div>
    
    <ClientsTable 
      :clients="clients"
      :loading="loading"
      :error="error"
      @refresh="handleRefresh"
    />

    <Pagination
      v-if="!loading && !error && clients.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      @update:page="handlePageChange"
      @update:per-page="handlePerPageChange"
    />

    <CreateClientModal
      :is-open="showCreateModal"
      @close="showCreateModal = false"
      @created="handleClientCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
import ClientsSearch from '@/components/clients/ClientsSearch.vue'
import ClientsTable from '@/components/clients/ClientsTable.vue'
import Pagination from '@/components/ui/Pagination.vue'
import CreateClientModal from '@/components/clients/CreateClientModal.vue'
import { useClients } from '@/composables/useClients'

const searchQuery = ref('')
const showCreateModal = ref(false)

const {
  clients,
  loading,
  error,
  currentPage,
  totalPages,
  perPage,
  fetchClients,
  searchClients
} = useClients()

const handleSearch = async (query) => {
  searchQuery.value = query
  await searchClients(query)
}

const handlePageChange = async (page) => {
  currentPage.value = page
  if (searchQuery.value) {
    await searchClients(searchQuery.value)
  } else {
    await fetchClients()
  }
}

const handlePerPageChange = async (size) => {
  perPage.value = size
  currentPage.value = 1
  if (searchQuery.value) {
    await searchClients(searchQuery.value)
  } else {
    await fetchClients()
  }
}

const handleClientCreated = () => {
  fetchClients()
}

const handleRefresh = () => {
  if (searchQuery.value) {
    searchClients(searchQuery.value)
  } else {
    fetchClients()
  }
}

onMounted(() => {
  fetchClients()
})
</script>