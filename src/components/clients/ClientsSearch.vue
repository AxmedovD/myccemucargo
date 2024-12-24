<template>
  <div>
    <Input
      id="client-search"
      type="search"
      v-model="searchValue"
      placeholder="Search by client ID or name..."
      :disabled="disabled"
      @input="handleInput"
    >
      <template #prefix>
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
      </template>
    </Input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import Input from '@/components/ui/Input.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const searchValue = ref(props.modelValue)

// Debounce search
let timeout
const handleInput = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('search', searchValue.value)
  }, 300)
}

watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue
})
</script>