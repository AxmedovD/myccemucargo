<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ period }}</h3>
      <div class="mt-3 space-y-2">
        <!-- Delivery Stats -->
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500 dark:text-gray-400">Delivered</span>
          <div class="text-right">
            <div v-if="loading" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-16 rounded"></div>
            <template v-else>
              <div class="text-lg font-medium text-green-600 dark:text-green-400">
                {{ formatNumber(deliveredCount) }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                avg: {{ formatPrice(avgPriceDelivered) }}
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
                {{ formatNumber(returnCount) }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                avg: {{ formatPrice(avgPriceReturned) }}
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
              {{ formatPrice(totalPrice) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/formatters'
import { formatNumber } from '@/utils/numberFormatters'

defineProps({
  period: {
    type: String,
    required: true
  },
  deliveredCount: {
    type: Number,
    required: true
  },
  returnCount: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  avgPriceDelivered: {
    type: Number,
    required: true
  },
  avgPriceReturned: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>