<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Courier Statistics</h1>
    
    <!-- Error State -->
    <div v-if="error" class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg animate-pulse">
        <div class="p-5 space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div class="space-y-3">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.period" class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.period }}</h3>
          <div class="mt-3 space-y-2">
            <!-- Delivery Stats -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
              <div class="text-right">
                <div class="text-lg font-medium text-green-600 dark:text-green-400">
                  {{ formatNumber(stat.delivered_count) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  avg: {{ formatPrice(stat.avg_price_delivered) }}
                </div>
              </div>
            </div>

            <!-- Return Stats -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">Returns</span>
              <div class="text-right">
                <div class="text-lg font-medium text-red-600 dark:text-red-400">
                  {{ formatNumber(stat.return_count) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  avg: {{ formatPrice(stat.avg_price_returned) }}
                </div>
              </div>
            </div>

            <!-- Total Price -->
            <div class="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Total</span>
                <span class="text-lg font-medium text-gray-900 dark:text-white">
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
import { useCourierStats } from '@/composables/useCourierStats'
import { formatPrice } from '@/utils/formatters'
import { formatNumber } from '@/utils/numberFormatters'

const { stats, loading, error } = useCourierStats()
</script>