<template>
  <div class="flex items-center justify-end space-x-2">
    <!-- Regenerate Token Button -->
    <Button
      variant="icon"
      :title="regenerating ? 'Regenerating token...' : 'Regenerate token'"
      :disabled="regenerating"
      @click="$emit('regenerate')"
    >
      <ArrowPathIcon 
        class="h-4 w-4" 
        :class="{ 'animate-spin': regenerating }"
      />
    </Button>

    <!-- Edit Button -->
    <Button 
      variant="icon"
      title="Edit client"
      @click="$emit('edit')"
    >
      <PencilIcon class="h-4 w-4" />
    </Button>
  </div>
</template>

<script setup>
import { PencilIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import Button from '@/components/ui/Button.vue'

defineProps({
  regenerating: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'regenerate'])
</script>