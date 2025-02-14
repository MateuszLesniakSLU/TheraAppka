<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Szczegóły Pacjenta</h1>
    <div v-if="loading" class="text-center">Ładowanie...</div>
    <div v-else-if="patient">
      <p><strong>Imię i nazwisko:</strong> {{ patient.name }}</p>
      <p><strong>Email:</strong> {{ patient.email }}</p>
      <p><strong>Telefon:</strong> {{ patient.phone }}</p>
      <h2 class="text-2xl font-semibold mt-4">Historia Ankiet</h2>
      <ul>
        <li v-for="survey in surveys" :key="survey.id" class="border p-2 my-2">
          <p><strong>Data:</strong> {{ survey.date }}</p>
          <p><strong>Ocena nastroju:</strong> {{ survey.moodScore }}</p>
          <nuxt-link :to="`/doctor/patients/${patient.id}/surveys/${survey.id}`" class="text-blue-500 hover:underline">
            Szczegóły ankiety
          </nuxt-link>
        </li>
      </ul>
      <nuxt-link to="/doctor/dashboard" class="text-blue-500 hover:underline">
        Powrót do listy pacjentów
      </nuxt-link>
    </div>
    <div v-else>
      <p>Pacjent nie znaleziony</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

definePageMeta({
  layout: 'doctor',
  middleware: 'auth',
})

const route = useRoute()
const patient = ref<any>(null)
const surveys = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const patientId = route.params.id as string
  try {
    const token = localStorage.getItem('token')
    const patientResponse = await axios.get(`http://localhost:3000/patients/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    patient.value = patientResponse.data

    const surveysResponse = await axios.get(`http://localhost:3000/patients/${patientId}/surveys`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    surveys.value = surveysResponse.data
  } catch (error) {
    console.error('Błąd podczas pobierania szczegółów pacjenta:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
