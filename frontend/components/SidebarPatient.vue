<template>
  <aside class="w-64 bg-mint-green text-gray-800 shadow-lg">
    <div class="p-6 text-2xl font-bold text-center border-b">Panel Pacjenta</div>
    <nav class="mt-4 flex flex-col space-y-2 p-4">
      <NuxtLink
          to="/patient/dashboard"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">dashboard</span>
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink
          to="/patient/survey"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">assignment</span>
        <span>Survey</span>
      </NuxtLink>
      <NuxtLink
          to="/patient/diary"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">book</span>
        <span>Diary</span>
      </NuxtLink>
      <NuxtLink
          to="/patient/medications"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">local_pharmacy</span>
        <span>Medications</span>
      </NuxtLink>
      <NuxtLink
          to="/patient/mood-history"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">history</span>
        <span>Mood History</span>
      </NuxtLink>
      <NuxtLink
          to="/patient/contact-therapist"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">contact_support</span>
        <span>Contact Therapist</span>
      </NuxtLink>
      <NuxtLink
          to="/patient/settings"
          class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light"
      >
        <span class="material-icons">settings</span>
        <span>Settings</span>
      </NuxtLink>
    </nav>

    <button @click="logout"
            class="mt-6 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600">
      Wyloguj
    </button>
  </aside>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();
</script>

<style>
.bg-mint-green {
  background-color: #a8d5ba;
}
</style>
