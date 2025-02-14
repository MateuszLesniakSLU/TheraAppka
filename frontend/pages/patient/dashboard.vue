<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Panel Pacjenta</h1>

    <div v-if="loading" class="text-center">Ładowanie...</div>

    <div v-else>
      <h2 class="text-2xl font-semibold mt-4 mb-2">Twoje ankiety</h2>

      <div v-if="surveys.length === 0" class="text-gray-500">Brak wypełnionych ankiet.</div>

      <ul v-else class="space-y-2">
        <li v-for="survey in surveys" :key="survey._id" class="p-4 bg-white rounded shadow">
          <p><strong>Data:</strong> {{ survey.date }}</p>
          <p><strong>Samopoczucie:</strong> {{ survey.moodScore }}/10</p>
          <p><strong>Wydarzenia:</strong> {{ survey.moodInfluencingFactors.join(", ") }}</p>
          <p><strong>Pozytywne:</strong> {{ survey.positiveEvents || "Brak" }}</p>
          <p><strong>Negatywne:</strong> {{ survey.negativeEvents || "Brak" }}</p>
          <p><strong>Leki:</strong> {{ survey.tookMedication ? "Tak" : "Nie" }}</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

definePageMeta({
  layout: 'patient',
  middleware: 'auth',
})

const surveys = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/surveys', {
      headers: { Authorization: `Bearer ${token}` }
    })
    surveys.value = response.data
  } catch (error) {
    console.error('Błąd podczas pobierania ankiet:', error)
  } finally {
    loading.value = false
  }
})
</script>
