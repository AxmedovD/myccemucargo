<template>
  <button
    :class="[
      'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
      variant === 'primary' ? 'px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' : '',
      variant === 'secondary' ? 'px-4 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500' : '',
      variant === 'icon' ? 'p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-gray-500' : '',
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'icon'
  disabled?: boolean
}>()
</script>