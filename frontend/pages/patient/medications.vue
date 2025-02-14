<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Farmakoterapia</h2>
    <div class="p-4 bg-white rounded shadow mb-4">
      <h3 class="text-xl font-bold">Informacje o Lekach</h3>
      <p>Lista przyjmowanych leków.</p>
      <ul class="list-disc list-inside mt-2">
        <li>Lek 1: 1x dziennie rano</li>
        <li>Lek 2: 2x dziennie</li>
      </ul>
    </div>
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-xl font-bold">Przypomnienia</h3>
      <p>Nie zapomnij przyjąć dzisiejszych dawek!</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: 'auth',
});
</script>
