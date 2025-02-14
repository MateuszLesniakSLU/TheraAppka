<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Analiza Samopoczucia Pacjentów</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Średni Nastrój</h2>
        <p class="text-3xl font-bold text-blue-600">6.8</p>
      </div>

      <div class="bg-white shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Najczęstsze Problemy</h2>
        <p class="text-lg text-gray-600">Bezsenność, Stres</p>
      </div>

      <div class="bg-white shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Liczba Wypełnionych Ankiet</h2>
        <p class="text-3xl font-bold text-green-600">124</p>
      </div>
    </div>

    <div class="bg-white shadow-md p-6 mt-6 rounded-lg">
      <h2 class="text-lg font-semibold mb-4">Trend Nastroju Pacjentów</h2>
      <div class="relative w-full">
        <canvas ref="analysisChart" class="w-full h-96"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

definePageMeta({
  layout: "doctor",
  middleware: 'auth',
})

const analysisChart = ref(null);

onMounted(() => {
  if (analysisChart.value) {
    new Chart(analysisChart.value, {
      type: "line",
      data: {
        labels: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"],
        datasets: [
          {
            label: "Średni Nastrój",
            data: [7, 6.5, 6, 6.8, 7.2, 7, 6.5],
            borderColor: "#4A90E2",
            backgroundColor: "rgba(74, 144, 226, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
});

definePageMeta({
  layout: "doctor",
});
</script>

<style scoped>
.bg-white {
  background-color: #ffffff;
}
</style>
