<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Pacjenci</h1>
    <table class="min-w-full bg-white shadow-md rounded">
      <thead>
      <tr class="bg-mint-green text-gray-800">
        <th class="text-left p-4">Imię i Nazwisko</th>
        <th class="text-left p-4">Ostatnia Ankieta</th>
        <th class="text-left p-4">Średni Nastrój</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="patient in patients" :key="patient._id" class="hover:bg-gray-100">
        <td class="p-4">{{ patient.name }}</td>
        <td class="p-4">{{ patient.lastSurvey || "Brak" }}</td>
        <td class="p-4">{{ patient.moodAverage ?? "Brak danych" }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

definePageMeta({
  layout: 'doctor',
  middleware: 'auth',
});

const patients = ref([]);

async function fetchPatients() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/patients', {
      headers: { Authorization: `Bearer ${token}` },
    });

    patients.value = response.data.map((patient) => ({
      _id: patient._id,
      name: patient.name,
      lastSurvey: patient.lastSurveyDate || "Brak",
      moodAverage: patient.moodAverage ?? "Brak danych",
    }));
  } catch (error) {
    console.error('Błąd podczas pobierania pacjentów:', error);
  }
}

onMounted(fetchPatients);
</script>
