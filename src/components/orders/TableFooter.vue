<template>
  <div class="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
    <div class="px-6 py-4">
      <div class="flex justify-between items-center text-sm">
        <div class="flex items-center space-x-4">
          <div v-if="selectedOrders.length > 0" class="flex items-center space-x-4">
            <span class="font-medium text-gray-700 dark:text-gray-300">
              Selected: {{ selectedOrders.length }}
            </span>
            <span class="font-medium text-gray-700 dark:text-gray-300">
              Selected Total: {{ formatPrice(selectedOrdersTotal) }}
            </span>
          </div>
          <div class="w-px h-4 bg-gray-300 dark:bg-gray-600" v-if="selectedOrders.length > 0"></div>
          <span class="font-medium text-gray-700 dark:text-gray-300">
            Total Orders: {{ orders.length }}
          </span>
          <span class="font-medium text-gray-700 dark:text-gray-300">
            Total: {{ formatPrice(totalPrice) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/formatters'

defineProps({
  selectedOrders: {
    type: Array,
    required: true
  },
  orders: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  selectedOrdersTotal: {
    type: Number,
    required: true
  }
})
</script>