<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Historia Nastroju</h2>
    <canvas ref="chartCanvas" class="w-full max-w-3xl mx-auto"></canvas>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'patient',
  middleware: 'auth',
})

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const chartCanvas = ref<HTMLCanvasElement | null>(null)
const surveyData = ref<any[]>([])

async function loadSurveyHistory() {
  try {
    const patientId = localStorage.getItem('patientId') || ''
    const response = await axios.get('http://localhost:3000/surveys', {
      params: { patientId }
    })
    surveyData.value = response.data
  } catch (error) {
    console.error('Błąd podczas pobierania ankiet:', error)
  }
}

function renderChart() {
  if (!chartCanvas.value) return

  const labels = surveyData.value.map((survey: any) => survey.date)
  const moodScores = surveyData.value.map((survey: any) => survey.moodScore)

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Ocena Nastroju',
          data: moodScores,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Trend Nastroju',
        },
      },
      scales: {
        y: {
          min: 1,
          max: 10,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  })
}

onMounted(async () => {
  await loadSurveyHistory()
  renderChart()
})
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
