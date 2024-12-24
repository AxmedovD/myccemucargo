<template>
  <span 
    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
    :class="getStatusConfig(status || '').bgColor"
  >
    {{ status || 'Unknown' }}
  </span>
</template>

<script setup>
import { getStatusConfig } from '@/utils/orderStatuses'

defineProps({
  status: {
    type: String,
    default: ''
  }
})
</script>