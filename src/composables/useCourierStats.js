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
      const response = await fetchCourierStats()
      stats.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching courier stats:', err)
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