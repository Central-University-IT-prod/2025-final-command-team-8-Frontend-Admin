<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { ChartData } from '~/classes/chart_data'



ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  data: {
    type: Array<ChartData>,
    required: true
  },
})

const chartData = {
  datasets: [
    {
      backgroundColor: props.data.map(item => item.color),
      data: props.data.map(item => item.value)
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: '70%',
  borderWidth: 0,
}
</script>