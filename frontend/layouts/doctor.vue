<template>
  <div v-if="!isChecking">
    <div class="flex h-screen bg-[#F5F5F5]">
      <SidebarDoctor />

      <main class="flex-1 p-6 overflow-y-auto">
        <NuxtPage />
      </main>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-gray-600 text-xl">Sprawdzanie uprawnień...</p>
  </div>
</template>

<script setup>
import SidebarDoctor from "@/components/SidebarDoctor.vue";

const isChecking = useState('isChecking', () => true);
</script>
