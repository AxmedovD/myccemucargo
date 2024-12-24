<template>
  <div class="relative group">
    <div class="flex items-center space-x-2">
      <code class="font-mono text-sm text-gray-600 dark:text-gray-300">{{ value || '-' }}</code>
      <button
        v-if="value"
        @click="copyToClipboard"
        class="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        :class="{ 'text-green-500': copied, 'text-gray-500 dark:text-gray-400': !copied }"
      >
        <CheckIcon v-if="copied" class="h-4 w-4" />
        <ClipboardIcon v-else class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ClipboardIcon, CheckIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const copied = ref(false)

const copyToClipboard = async () => {
  if (!props.value) return
  
  try {
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>