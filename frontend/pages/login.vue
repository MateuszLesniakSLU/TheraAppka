<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded">
      <h1 class="text-2xl font-bold text-center">Logowanie</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Hasło</label>
          <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Zaloguj się
        </button>
      </form>
      <p v-if="error" class="text-center text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  sub: string;
  role: 'doctor' | 'patient' | 'admin';
  patientId?: string;
}

const decodeFn = ((jwtDecode as any).default || jwtDecode) as (token: string) => JwtPayload;

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin() {
  error.value = ''
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value,
    })
    console.log('Odpowiedź logowania:', response.data);
    const token = response.data.access_token
    localStorage.setItem('token', token)

    const decoded = decodeFn(token)
    const patientId = decoded.patientId || '';
    localStorage.setItem('patientId', patientId);
    console.log('Odczytany patientId:', patientId);

    let targetRoute = '/'
    if (decoded.role === 'doctor') {
      targetRoute = '/doctor/dashboard'
    } else if (decoded.role === 'patient') {
      targetRoute = '/patient/dashboard'
    } else if (decoded.role === 'admin') {
      targetRoute = '/admin/dashboard'
    }

    await router.push(targetRoute)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Błąd logowania'
    console.error('Błąd w handleLogin:', err)
  }
}
</script>

<style scoped>
</style>
