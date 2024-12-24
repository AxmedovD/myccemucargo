<template>
  <div class="flex-1 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col">
    <div class="overflow-x-auto flex-1">
      <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader 
          :is-all-selected="isAllSelected"
          @toggle-all="toggleAllOrders"
        />
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="order in orders" :key="order.parcel_id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  :checked="selectedOrders.includes(order.parcel_id)"
                  @change="toggleOrder(order.parcel_id)"
                />
                <span class="ml-2 text-sm font-medium text-gray-900 dark:text-white">{{ order.parcel_id }}</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex flex-col">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ order.client?.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">ID: {{ order.client_id }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex flex-col">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ order.receiver?.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ formatPhoneNumbers(order.receiver?.phone_nums) }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <OrderStatus :status="order.status" />
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-col space-y-1">
                <div v-for="item in order.items" :key="item.id" class="text-sm text-gray-500 dark:text-gray-300">
                  Item #{{ item.id }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {{ formatPrice(calculateTotalPrice(order.items)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <TableFooter 
      :selected-orders="selectedOrders"
      :orders="orders"
      :total-price="totalPrice"
      :selected-orders-total="selectedOrdersTotal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatPrice } from '@/utils/formatters'
import OrderStatus from './OrderStatus.vue'
import TableHeader from './TableHeader.vue'
import TableFooter from './TableFooter.vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['selection-change'])

const selectedOrders = ref([])

const formatPhoneNumbers = (phones) => {
  if (!phones || !Array.isArray(phones)) return ''
  return phones.join(', ')
}

const calculateTotalPrice = (items) => {
  if (!items || !Array.isArray(items)) return 0
  return items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
}

const totalPrice = computed(() => {
  return props.orders.reduce((sum, order) => 
    sum + calculateTotalPrice(order.items), 0)
})

const selectedOrdersTotal = computed(() => {
  return props.orders
    .filter(order => selectedOrders.value.includes(order.parcel_id))
    .reduce((sum, order) => sum + calculateTotalPrice(order.items), 0)
})

const isAllSelected = computed(() => {
  return props.orders.length > 0 && 
    props.orders.every(order => selectedOrders.value.includes(order.parcel_id))
})

const toggleAllOrders = (event) => {
  const checkbox = event.target
  if (checkbox.checked) {
    selectedOrders.value = props.orders.map(order => order.parcel_id)
  } else {
    selectedOrders.value = []
  }
  emit('selection-change', selectedOrders.value)
}

const toggleOrder = (parcelId) => {
  const index = selectedOrders.value.indexOf(parcelId)
  if (index === -1) {
    selectedOrders.value.push(parcelId)
  } else {
    selectedOrders.value.splice(index, 1)
  }
  emit('selection-change', [...selectedOrders.value])
}
</script>