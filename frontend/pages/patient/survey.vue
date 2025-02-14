<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Ankiety</h2>

    <!-- Codzienna Ankieta -->
    <div class="p-4 bg-white rounded shadow mb-4">
      <h3 class="text-xl font-bold">Codzienna Ankieta</h3>
      <p v-if="todaySurvey">
        Masz już wypełnioną ankietę na dzisiaj. Możesz ją edytować do końca dnia.
      </p>
      <p v-else>
        Wypełnij ankietę, aby monitorować swoje samopoczucie.
      </p>
      <button @click="toggleForm" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
        {{ todaySurvey ? 'Edytuj Ankietę' : 'Wypełnij Ankietę' }}
      </button>

      <div v-if="showForm" class="mt-4">
        <form @submit.prevent="submitSurvey" class="space-y-4">
          <!-- 1. Ocena Samopoczucia -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Jak się dzisiaj czujesz? (1-10)</label>
            <input type="number" v-model.number="surveyForm.moodScore" min="1" max="10"
                   class="w-full border rounded px-2 py-1" required />
          </div>
          <!-- 2. Czynniki Wpływające na Nastrój -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Co miało wpływ na Twój nastrój?</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="factor in availableFactors" :key="factor" class="inline-flex items-center">
                <input type="checkbox" :value="factor" v-model="surveyForm.moodInfluencingFactors" class="mr-1" />
                <span>{{ factor }}</span>
              </label>
            </div>
            <input type="text" v-model="surveyForm.customFactor" placeholder="Inny czynnik"
                   class="w-full border rounded px-2 py-1 mt-2" />
          </div>
          <!-- 3. Pozytywne i Negatywne Wydarzenia -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Co pozytywnego wydarzyło się dzisiaj?</label>
            <textarea v-model="surveyForm.positiveEvents" class="w-full border rounded px-2 py-1" rows="2" required></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Co negatywnego wydarzyło się dzisiaj?</label>
            <textarea v-model="surveyForm.negativeEvents" class="w-full border rounded px-2 py-1" rows="2" required></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Jaki wpływ miały te wydarzenia na Twój nastrój? (1-10)</label>
            <input type="number" v-model.number="surveyForm.eventsImpact" min="1" max="10"
                   class="w-full border rounded px-2 py-1" required />
          </div>
          <!-- 4. Sekcja Farmakoterapii -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Czy zażyłeś dzisiaj leki?</label>
            <select v-model="surveyForm.tookMedication" class="w-full border rounded px-2 py-1">
              <option :value="true">Tak</option>
              <option :value="false">Nie</option>
            </select>
          </div>
          <div v-if="!surveyForm.tookMedication">
            <label class="block text-sm font-medium text-gray-700">Podaj powód niezażycia leków:</label>
            <input type="text" v-model="surveyForm.medicationNotTakenReason" class="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Czy wystąpiły efekty uboczne?</label>
            <select v-model="surveyForm.sideEffectsOccurred" class="w-full border rounded px-2 py-1">
              <option :value="true">Tak</option>
              <option :value="false">Nie</option>
            </select>
          </div>
          <div v-if="surveyForm.sideEffectsOccurred">
            <label class="block text-sm font-medium text-gray-700">Opisz efekty uboczne:</label>
            <textarea v-model="surveyForm.sideEffectsDescription" class="w-full border rounded px-2 py-1" rows="2"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Jak się czułeś po lekach? (1-10)</label>
            <input type="number" v-model.number="surveyForm.postMedicationFeeling" min="1" max="10"
                   class="w-full border rounded px-2 py-1" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Czy farmakoterapia jest skuteczna?</label>
            <select v-model="surveyForm.medicationEffectiveness" class="w-full border rounded px-2 py-1">
              <option value="yes">Tak</option>
              <option value="no">Nie</option>
              <option value="unknown">Nie wiem</option>
            </select>
          </div>
          <div v-if="surveyForm.medicationEffectiveness === 'no'">
            <label class="block text-sm font-medium text-gray-700">Podaj powód:</label>
            <input type="text" v-model="surveyForm.medicationEffectivenessReason" class="w-full border rounded px-2 py-1" />
          </div>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Zapisz Ankietę
          </button>
        </form>
      </div>
    </div>

    <!-- Historia Ankiet -->
    <div class="p-4 bg-white rounded shadow">
      <h3 class="text-xl font-bold">Historia Ankiet</h3>
      <div v-if="surveyHistory.length === 0">
        <p>Brak zapisanych ankiet.</p>
      </div>
      <ul v-else class="space-y-2">
        <li v-for="survey in surveyHistory" :key="survey.id" class="p-2 border rounded">
          <div><strong>Data:</strong> {{ survey.date }}</div>
          <div><strong>Samopoczucie:</strong> {{ survey.moodScore }}</div>
          <div><strong>Czynniki:</strong> {{ survey.moodInfluencingFactors.join(', ') }}</div>
          <div><strong>Pozytywne wydarzenia:</strong> {{ survey.positiveEvents }}</div>
          <div><strong>Negatywne wydarzenia:</strong> {{ survey.negativeEvents }}</div>
          <div><strong>Wpływ wydarzeń:</strong> {{ survey.eventsImpact }}</div>
          <div><strong>Leki:</strong> {{ survey.tookMedication ? 'Tak' : 'Nie' }}</div>
          <div v-if="!survey.tookMedication"><strong>Powód:</strong> {{ survey.medicationNotTakenReason }}</div>
          <div><strong>Efekty uboczne:</strong> {{ survey.sideEffectsOccurred ? 'Tak' : 'Nie' }}</div>
          <div v-if="survey.sideEffectsOccurred"><strong>Opis:</strong> {{ survey.sideEffectsDescription }}</div>
          <div><strong>Po lekach:</strong> {{ survey.postMedicationFeeling }}</div>
          <div><strong>Skuteczność:</strong> {{ survey.medicationEffectiveness }}</div>
          <div v-if="survey.medicationEffectiveness === 'no'"><strong>Powód:</strong> {{ survey.medicationEffectivenessReason }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

definePageMeta({
  layout: 'patient',
  middleware: 'auth',
});


const showForm = ref(false)

const surveyForm = ref({
  patientId: '',
  moodScore: 5,
  moodInfluencingFactors: [] as string[],
  customFactor: '',
  positiveEvents: '',
  negativeEvents: '',
  eventsImpact: 5,
  tookMedication: true,
  medicationNotTakenReason: '',
  sideEffectsOccurred: false,
  sideEffectsDescription: '',
  postMedicationFeeling: 5,
  medicationEffectiveness: 'unknown' as 'yes' | 'no' | 'unknown',
  medicationEffectivenessReason: '',
})

interface Survey {
  patientId: string;
  id: string;
  date: string;
  moodScore: number;
  moodInfluencingFactors: string[];
  positiveEvents: string;
  negativeEvents: string;
  eventsImpact: number;
  tookMedication: boolean;
  medicationNotTakenReason?: string;
  sideEffectsOccurred: boolean;
  sideEffectsDescription?: string;
  postMedicationFeeling: number;
  medicationEffectiveness: 'yes' | 'no' | 'unknown';
  medicationEffectivenessReason?: string;
}


const availableFactors = [
  'Stres',
  'Zmęczenie',
  'Spotkanie z bliskimi',
  'Aktywność fizyczna',
  'Terapia',
  'Problemy w pracy/szkole',
  'Sen (za mało/za dużo)',
]

const surveyHistory = ref<Survey[]>([]);


async function loadSurveys() {
  const patientId = localStorage.getItem('patientId') ?? '';
  try {
    const response = await axios.get('http://localhost:3000/surveys', {
      params: { patientId }
    })
    surveyHistory.value = response.data
  } catch (error) {
    console.error('Błąd podczas pobierania ankiet:', error)
  }
}

const todaySurvey = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return surveyHistory.value.find(survey => survey.date === today)
})

function toggleForm() {
  showForm.value = !showForm.value
  if (showForm.value && todaySurvey.value) {
    Object.assign(surveyForm.value, todaySurvey.value)
  }
}
async function submitSurvey() {
  const patientId = localStorage.getItem('patientId') ?? ''
  surveyForm.value.patientId = patientId

  try {
    if (todaySurvey.value) {
      const response = await axios.patch(`http://localhost:3000/surveys/${todaySurvey.value.id}`, surveyForm.value)
      console.log('Ankieta zaktualizowana:', response.data)
    } else {
      const response = await axios.post('http://localhost:3000/surveys', surveyForm.value)
      console.log('Ankieta utworzona:', response.data)
    }
    await loadSurveys()
    showForm.value = false
  } catch (error) {
    console.error('Błąd podczas zapisywania ankiety:', error)
  }
}

onMounted(async () => {
  await loadSurveys()
})
</script>

<style scoped>
</style>
