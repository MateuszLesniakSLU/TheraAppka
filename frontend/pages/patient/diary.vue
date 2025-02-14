<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Mój Dziennik</h1>

    <div class="mb-4">
      <div v-if="todayEntry">
        <h2 class="text-xl font-bold">Twój dzisiejszy wpis</h2>
        <p><strong>Pozytywne wydarzenia:</strong> {{ todayEntry.positiveEvents }}</p>
        <p><strong>Negatywne wydarzenia:</strong> {{ todayEntry.negativeEvents }}</p>
        <div>
          <h3 class="font-semibold">Wpływ wydarzeń:</h3>
          <ul class="list-disc pl-6">
            <li v-for="(event, index) in todayEntry.eventsImpact" :key="index">
              {{ event.description }} - Ocena: {{ event.rating }}
            </li>
          </ul>
        </div>
        <button @click="toggleForm" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edytuj wpis
        </button>
      </div>
      <div v-else>
        <p>Nie utworzyłeś jeszcze dzisiejszego wpisu.</p>
        <button @click="toggleForm" class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Utwórz wpis
        </button>
      </div>
    </div>

    <div v-if="showForm" class="bg-white p-4 rounded shadow mb-4">
      <h2 class="text-xl font-bold mb-2">{{ todayEntry ? 'Edytuj wpis' : 'Utwórz wpis' }}</h2>
      <form @submit.prevent="submitDiary">
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Pozytywne wydarzenia</label>
          <textarea v-model="diaryForm.positiveEvents" required class="w-full border rounded p-2"></textarea>
        </div>
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Negatywne wydarzenia</label>
          <textarea v-model="diaryForm.negativeEvents" required class="w-full border rounded p-2"></textarea>
        </div>
        <div class="mb-2">
          <label class="block text-sm font-medium text-gray-700">Wpływ wydarzeń na nastrój</label>
          <div v-for="(item, index) in diaryForm.eventsImpact" :key="index" class="flex flex-col mb-2">
            <input v-model="item.description" placeholder="Opis wydarzenia" class="border rounded p-1 mb-1" />
            <input v-model.number="item.rating" type="number" min="1" max="10" placeholder="Ocena (1-10)" class="border rounded p-1" />
          </div>
          <button type="button" @click="addEvent" class="mt-1 text-sm text-blue-500">Dodaj wydarzenie</button>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Zapisz wpis
        </button>
        <button type="button" @click="cancelForm" class="ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
          Anuluj
        </button>
      </form>
      <p v-if="formError" class="mt-2 text-red-500">{{ formError }}</p>
    </div>

    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-bold mb-2">Historia wpisów</h2>
      <div v-if="diaryHistory.length === 0">
        <p>Brak zapisów.</p>
      </div>
      <ul v-else class="space-y-4">
        <li v-for="entry in diaryHistory" :key="entry.id" class="border p-2 rounded">
          <p><strong>Data:</strong> {{ entry.date }}</p>
          <p><strong>Pozytywne wydarzenia:</strong> {{ entry.positiveEvents }}</p>
          <p><strong>Negatywne wydarzenia:</strong> {{ entry.negativeEvents }}</p>
          <div>
            <strong>Wpływ wydarzeń:</strong>
            <ul class="list-disc pl-6">
              <li v-for="(ev, idx) in entry.eventsImpact" :key="idx">
                {{ ev.description }} (Ocena: {{ ev.rating }})
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useLocalStorage } from '@vueuse/core'

definePageMeta({
  layout: 'patient',
  middleware: 'auth',
});

const diaryHistory = ref<any[]>([])
const showForm = ref(false)
const formError = ref('')

const patientId = useLocalStorage('patientId', '');

const diaryForm = ref({
  patientId,
  positiveEvents: '',
  negativeEvents: '',
  eventsImpact: [] as { description: string; rating: number }[],
})

async function loadDiary() {
  try {
    const response = await axios.get('http://localhost:3000/diary', {
      params: { patientId }
    })
    diaryHistory.value = response.data
  } catch (error) {
    console.error('Błąd podczas pobierania wpisów dziennika:', error)
  }
}

const todayEntry = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return diaryHistory.value.find(entry => entry.date === today)
})

function addEvent() {
  diaryForm.value.eventsImpact.push({ description: '', rating: 5 })
}

function toggleForm() {
  showForm.value = !showForm.value
  if (showForm.value && todayEntry.value) {
    // Jeśli istnieje wpis dzisiejszy, wczytujemy dane do formularza
    diaryForm.value = { ...todayEntry.value }
  }
}

function cancelForm() {
  showForm.value = false
  formError.value = ''
}

async function submitDiary() {
  try {
    let response
    if (todayEntry.value) {
      response = await axios.patch(`http://localhost:3000/diary/${todayEntry.value.id}`, diaryForm.value)
    } else {
      response = await axios.post('http://localhost:3000/diary', diaryForm.value)
    }
    console.log('Wpis zapisany:', response.data)
    await loadDiary()
    showForm.value = false
  } catch (error: any) {
    formError.value = error.response?.data?.message || 'Błąd podczas zapisywania wpisu'
    console.error('Błąd podczas zapisywania wpisu:', error)
  }
}

onMounted(async () => {
  await loadDiary()
})
</script>

<style scoped>
</style>
