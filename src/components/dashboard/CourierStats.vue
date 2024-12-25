<template>
  <div class="mt-8">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white">Courier Statistics</h2>
    <div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatsPeriodCard
        v-for="stat in stats"
        :key="stat.period"
        :period="stat.period"
        :delivered-count="stat.delivered_count"
        :return-count="stat.return_count"
        :total-price="stat.total_price"
        :avg-price-delivered="stat.avg_price_delivered"
        :avg-price-returned="stat.avg_price_returned"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import StatsPeriodCard from './StatsPeriodCard.vue'
import { useCourierStats } from '@/composables/useCourierStats'

const { stats, loading, error } = useCourierStats()
</script>