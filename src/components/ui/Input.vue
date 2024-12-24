<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative rounded-md shadow-sm">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix"></slot>
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :class="[
          error ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600',
          'dark:bg-gray-700 dark:text-white',
          $slots.prefix ? 'pl-10 pr-4' : 'px-4',
          'py-2.5', // Increased vertical padding
          className
        ]"
        :placeholder="placeholder"
        :required="required"
        :maxlength="maxlength"
        :disabled="disabled"
      >
    </div>
    <div class="mt-1">
      <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      <p v-else-if="helper" class="text-sm text-gray-500 dark:text-gray-400">{{ helper }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  modelValue: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helper?: string
  maxlength?: number
  className?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>