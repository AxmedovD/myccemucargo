import { ref, onMounted } from 'vue'
import { fetchCourierStats } from '@/services/api/statsApi'

export function useCourierStats() {
  const stats = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null
      const { data, error: apiError } = await fetchCourierStats()
      
      if (apiError) {
        error.value = apiError
        stats.value = []
        return
      }

      stats.value = data
    } catch (err) {
      error.value = err.message || 'Failed to fetch courier stats'
      stats.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchStats()
  })

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}