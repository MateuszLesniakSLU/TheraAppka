<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Panel Lekarza</h1>
    <div v-if="loading" class="text-center">Ładowanie...</div>
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Lista Pacjentów</h2>
      <ul>
        <li
            v-for="patient in patients"
            :key="patient.id"
            class="border rounded p-2 mb-2 flex justify-between items-center"
        >
          <div>
            <p class="font-bold">{{ patient.name }}</p>
            <p class="text-sm text-gray-600">{{ patient.email }}</p>
          </div>
          <nuxt-link :to="`/doctor/patients/${patient.id}`" class="text-blue-500 hover:underline">
            Szczegóły
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

definePageMeta({
  layout: 'doctor',
  middleware: 'auth',
})

const patients = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/patients', {
      headers: { Authorization: `Bearer ${token}` }
    })
    patients.value = response.data
  } catch (error) {
    console.error('Błąd podczas pobierania pacjentów:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
