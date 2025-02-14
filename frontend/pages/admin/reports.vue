<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-[#4A4A4A]">Analiza i Raporty</h1>
    <section>
      <h2 class="text-xl font-semibold mb-4 text-[#4A4A4A]">Generowanie Raportów</h2>
      <div class="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label class="block text-sm font-semibold text-[#4A4A4A]">Wybierz zakres dat</label>
          <input type="date" class="w-full p-2 border rounded mt-1" />
          <input type="date" class="w-full p-2 border rounded mt-1" />
        </div>
        <button class="bg-[#88C8A8] text-white py-2 px-4 rounded hover:bg-[#A8D5BA]">
          Generuj Raport
        </button>
      </div>
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
