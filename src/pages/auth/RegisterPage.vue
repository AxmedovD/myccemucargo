<template>
  <AuthLayout>
    <template #title>Contact Support</template>
    
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        To create a new account, please contact our support team.
      </p>
      
      <div class="mt-6">
        <router-link 
          to="/auth/login" 
          class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          Back to login
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>