<template>
  <aside class="w-64 bg-mint-green text-gray-800 shadow-lg">
    <nav class="mt-4 flex flex-col space-y-2 p-4">
      <NuxtLink to="/admin" class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light">
        <span class="material-icons">settings</span>
        <span>Panel Główny</span>
      </NuxtLink>
      <NuxtLink to="/admin/users" class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light">
        <span class="material-icons">group</span>
        <span>Użytkownicy</span>
      </NuxtLink>
      <NuxtLink to="/admin/reports" class="flex items-center space-x-2 p-3 rounded hover:bg-mint-green-light">
        <span class="material-icons">bar_chart</span>
        <span>Raporty</span>
      </NuxtLink>
    </nav>

    <button @click="logout"
            class="mt-6 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600">
      Wyloguj
    </button>
  </aside>
</template>

<script>
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();
</script>