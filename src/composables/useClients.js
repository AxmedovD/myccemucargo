import { ref } from 'vue'
import { getClients, searchClients as searchClientsApi } from '@/services/clientService'

export function useClients() {
  const clients = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const perPage = ref(20)

  const fetchClients = async () => {
    try {
      loading.value = true
      error.value = null
      const { data, pagination } = await getClients({
        page: currentPage.value,
        per_page: perPage.value
      })
      clients.value = data
      totalPages.value = pagination.last_page
    } catch (err) {
      error.value = err.message
      clients.value = []
    } finally {
      loading.value = false
    }
  }

  const searchClients = async (query) => {
    if (!query.trim()) {
      return fetchClients()
    }

    try {
      loading.value = true
      error.value = null
      const { data, pagination } = await searchClientsApi({
        q: query.trim(),
        page: currentPage.value,
        per_page: perPage.value
      })
      clients.value = data
      totalPages.value = pagination.last_page
    } catch (err) {
      error.value = err.message
      clients.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    clients,
    loading,
    error,
    currentPage,
    totalPages,
    perPage,
    fetchClients,
    searchClients
  }
}