<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-[#4A4A4A]">Zarządzanie Użytkownikami</h1>
    <section>
      <h2 class="text-xl font-semibold mb-4 text-[#4A4A4A]">Lista Użytkowników</h2>
      <table class="min-w-full bg-white rounded shadow">
        <thead class="bg-[#F5F5F5]">
        <tr>
          <th class="py-2 px-4 text-left text-[#4A4A4A]">Imię i nazwisko</th>
          <th class="py-2 px-4 text-left text-[#4A4A4A]">Rola</th>
          <th class="py-2 px-4 text-left text-[#4A4A4A]">Status</th>
          <th class="py-2 px-4 text-left text-[#4A4A4A]">Data ostatniego logowania</th>
        </tr>
        </thead>
        <tbody>
        <tr class="hover:bg-[#FCE38A]">
          <td class="py-2 px-4">Jan Kowalski</td>
          <td class="py-2 px-4">Pacjent</td>
          <td class="py-2 px-4">Aktywny</td>
          <td class="py-2 px-4">2025-01-15</td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

export default {
  setup() {},
};
</script>