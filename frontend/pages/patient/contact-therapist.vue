<template>
  <div>
    <h1 class="text-2xl font-bold">Contact Therapist</h1>
    <p>Skontaktuj się ze swoim terapeutą tutaj.</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: 'auth',
});
</script>