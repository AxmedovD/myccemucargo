<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Courier Statistics</h1>
    
    <!-- Courier Statistics -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.period" class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.period }}</h3>
          <div class="mt-3 space-y-2">
            <!-- Delivery Stats -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
              <div class="text-right">
                <div v-if="loading" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded"></div>
                <template v-else>
                  <div class="text-lg font-medium text-green-600 dark:text-green-400">
                    {{ formatNumber(stat.delivered_count) }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    avg: {{ formatPrice(stat.avg_price_delivered) }}
                  </div>
                </template>
              </div>
            </div>

            <!-- Return Stats -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">Returns</span>
              <div class="text-right">
                <div v-if="loading" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded"></div>
                <template v-else>
                  <div class="text-lg font-medium text-red-600 dark:text-red-400">
                    {{ formatNumber(stat.return_count) }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    avg: {{ formatPrice(stat.avg_price_returned) }}
                  </div>
                </template>
              </div>
            </div>

            <!-- Total Price -->
            <div class="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Total</span>
                <div v-if="loading" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded"></div>
                <span v-else class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ formatPrice(stat.total_price) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchCourierStats } from '@/services/api/statsApi'
import { formatPrice } from '@/utils/formatters'
import { formatNumber } from '@/utils/numberFormatters'

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

onMounted(() => {
  fetchStats()
})
</script>