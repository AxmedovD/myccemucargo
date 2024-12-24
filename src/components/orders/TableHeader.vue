<template>
  <thead class="bg-gray-50 dark:bg-gray-700">
    <tr>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">
        <div class="flex items-center">
          <input
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            :checked="isAllSelected"
            @change="$emit('toggle-all', $event)"
          />
          <span class="ml-2">Parcel ID</span>
        </div>
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Client</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Receiver</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Status</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Items</th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap">Total</th>
    </tr>
  </thead>
</template>

<script setup>
defineProps({
  isAllSelected: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-all'])
</script>