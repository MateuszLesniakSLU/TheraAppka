<template>
  <div class="landing-page font-sans text-gray-800">
    <header class="flex justify-between items-center bg-green-300 text-white py-4 px-8 shadow-md">
      <div class="text-2xl font-bold">
        <NuxtLink to="/">TheraApp</NuxtLink>
      </div>
      <div>
        <NuxtLink
            to="/login"
            class="px-4 py-2 bg-yellow-300 text-gray-800 font-semibold rounded hover:bg-yellow-400"
        >
          Logowanie
        </NuxtLink>
      </div>
    </header>

    <section class="text-center py-16 bg-blue-200">
      <h1 class="text-4xl font-extrabold mb-4">Twoje narzędzie do wspierania terapii</h1>
      <p class="text-lg mb-8">Śledź swoje samopoczucie, analizuj trendy i współpracuj z terapeutą.</p>
      <NuxtLink
          to="/login"
          class="px-6 py-3 bg-yellow-300 text-gray-800 font-semibold rounded hover:bg-yellow-400"
      >
        Zaloguj się teraz
      </NuxtLink>
    </section>

    <section class="py-16 bg-white">
      <h2 class="text-3xl font-bold text-center mb-12">Dlaczego warto wybrać TheraApp?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
        <div class="p-6 bg-gray-100 rounded shadow">
          <h3 class="text-xl font-bold mb-4">Codzienne ankiety</h3>
          <p>Monitoruj swoje samopoczucie każdego dnia za pomocą prostych formularzy.</p>
        </div>
        <div class="p-6 bg-gray-100 rounded shadow">
          <h3 class="text-xl font-bold mb-4">Historia nastroju</h3>
          <p>Analizuj dane i trendy, aby lepiej zrozumieć swoje emocje.</p>
        </div>
        <div class="p-6 bg-gray-100 rounded shadow">
          <h3 class="text-xl font-bold mb-4">Powiadomienia</h3>
          <p>Przypomnienia o wypełnianiu ankiet i kluczowych wydarzeniach.</p>
        </div>
        <div class="p-6 bg-gray-100 rounded shadow">
          <h3 class="text-xl font-bold mb-4">Bezpieczeństwo danych</h3>
          <p>Twoje dane są przechowywane zgodnie z najwyższymi standardami bezpieczeństwa.</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-pink-300 text-white text-center">
      <h2 class="text-3xl font-bold mb-12">Co mówią nasi użytkownicy?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
        <blockquote class="p-6 bg-white text-gray-800 rounded shadow">
          <p class="mb-4">„TheraApp pomogło mi zrozumieć moje emocje i poprawić jakość terapii.”</p>
          <footer class="italic">– Anna, użytkowniczka</footer>
        </blockquote>
        <blockquote class="p-6 bg-white text-gray-800 rounded shadow">
          <p class="mb-4">„Dzięki tej aplikacji mogę lepiej monitorować samopoczucie swoich pacjentów.”</p>
          <footer class="italic">– Dr Kowalski, terapeuta</footer>
        </blockquote>
      </div>
    </section>

    <footer class="py-4 bg-gray-800 text-white text-center">
      <p class="mb-2">&copy; 2025 TheraApp. Wszystkie prawa zastrzeżone.</p>
      <div>
        <NuxtLink to="/privacy" class="text-yellow-300 hover:underline">Polityka prywatności</NuxtLink>
        <span class="mx-2">|</span>
        <NuxtLink to="/terms" class="text-yellow-300 hover:underline">Regulamin</NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
</style>
