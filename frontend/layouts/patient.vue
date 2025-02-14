<template>
  <div v-if="!isChecking">
    <div class="flex h-screen bg-gray-100">
      <SidebarPatient />

      <main class="p-6 flex-1">
        <NuxtPage />
      </main>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-gray-600 text-xl">Sprawdzanie uprawnień...</p>
  </div>
</template>

<script setup>
import SidebarPatient from "@/components/SidebarPatient.vue";

const isChecking = useState('isChecking', () => true);
</script>
