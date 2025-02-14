<template>
  <aside class="w-64 bg-white shadow-md h-screen flex flex-col p-6">
    <div>
      <h2 class="text-2xl font-bold mb-6">Panel Lekarza</h2>
      <nav>
        <ul class="space-y-4">
          <li>
            <NuxtLink
                to="/doctor/dashboard"
                class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <span class="material-icons">dashboard</span>
              <span>Pulpit</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                to="/doctor/patients"
                class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <span class="material-icons">groups</span>
              <span>Pacjenci</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                to="/doctor/analysis"
                class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <span class="material-icons">bar_chart</span>
              <span>Analiza</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                to="/doctor/create-patient"
                class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition"
            >
              <span class="material-icons">bar_chart</span>
              <span>Create patient</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Przycisk wylogowania na dole -->
    <button
        @click="logout"
        class="mt-auto flex items-center space-x-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
    >
      <span class="material-icons">logout</span>
      <span>Wyloguj się</span>
    </button>
  </aside>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();
</script>

<style scoped>
.material-icons {
  font-size: 20px;
  color: #4a4a4a;
}
</style>
