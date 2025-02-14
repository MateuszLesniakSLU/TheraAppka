<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Ustawienia</h2>
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-xl font-bold">Dane Użytkownika</h3>
      <p>Edytuj swoje dane kontaktowe.</p>
    </div>
    <div class="p-4 bg-white rounded shadow mt-4">
      <h3 class="text-xl font-bold">Preferencje Powiadomień</h3>
      <p>Ustaw przypomnienia o lekach i ankietach.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: 'auth',
});
</script>
