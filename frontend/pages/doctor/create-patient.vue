<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Dodaj nowego pacjenta</h1>

    <form @submit.prevent="submitPatient" class="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label class="block font-medium">Imię i nazwisko</label>
        <input v-model="patient.name" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block font-medium">Email</label>
        <input v-model="patient.email" type="email" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block font-medium">Hasło</label>
        <input v-model="patient.password" type="password" class="w-full p-2 border rounded" required />
      </div>

      <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Dodaj Pacjenta
      </button>
    </form>

    <p v-if="successMessage" class="text-green-600 mt-2">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

definePageMeta({
  layout: 'doctor',
  middleware: 'auth',
})

const patient = ref({
  name: '',
  email: '',
  password: '',
});

const successMessage = ref('');
const errorMessage = ref('');

async function submitPatient() {
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/patients', patient.value, {
      headers: { Authorization: `Bearer ${token}` },
    });

    successMessage.value = 'Pacjent został dodany!';
    patient.value = { name: '', email: '', password: '' };
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Błąd podczas dodawania pacjenta';
  }
}
</script>
