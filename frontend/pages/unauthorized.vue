<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-3xl font-bold text-red-500">Brak dostępu</h1>
    <p class="text-gray-700 mt-2">Nie masz uprawnień do tej strony lub nie jesteś zalogowany.</p>
    <NuxtLink to="/login" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Przejdź do logowania
    </NuxtLink>
  </div>
</template>


<script setup>
const goBack = () => {
  window.history.back();
};


</script>
