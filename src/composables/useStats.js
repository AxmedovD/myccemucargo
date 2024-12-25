import { ref } from 'vue'
import { fetchCourierStats } from '@/services/api/statsApi'

export function useStats() {
  const stats = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await fetchCourierStats()
      stats.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching stats:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}