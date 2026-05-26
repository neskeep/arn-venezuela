<script setup lang="ts">
import type { MiembroRegistro } from "~~/shared/types";

const currentStep = ref(1);
const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");

const form = reactive<MiembroRegistro>({
  nombre: "",
  email: "",
  telefono: "",
  ciudad: "",
  profesion: "",
  area_interes: "",
  mensaje: "",
});

const fieldErrors = reactive<Record<string, string>>({
  nombre: "",
  email: "",
  ciudad: "",
  telefono: "",
  area_interes: "",
});

const areasInteres = [
  { value: "liderazgo", label: "Liderazgo" },
  { value: "educacion", label: "Educación" },
  { value: "salud", label: "Salud" },
  { value: "negocios", label: "Negocios" },
  { value: "arte", label: "Arte y Cultura" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "otro", label: "Otro" },
] as const;

function clearFieldErrors() {
  Object.keys(fieldErrors).forEach((key) => {
    fieldErrors[key] = "";
  });
}

function validateStep(step: number): boolean {
  clearFieldErrors();

  if (step === 1) {
    let valid = true;
    if (!form.nombre.trim()) {
      fieldErrors.nombre = "El nombre es obligatorio";
      valid = false;
    }
    if (!form.email.trim()) {
      fieldErrors.email = "El email es obligatorio";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      fieldErrors.email = "Ingresa un email válido";
      valid = false;
    }
    if (form.telefono && !/^\+?\d[\d\s\-]{6,}$/.test(form.telefono.trim())) {
      fieldErrors.telefono = "Formato inválido. Ej: +58 412 123 4567";
      valid = false;
    }
    if (!form.ciudad.trim()) {
      fieldErrors.ciudad = "La ciudad es obligatoria";
      valid = false;
    }
    return valid;
  }

  if (step === 2) {
    if (!form.area_interes) {
      fieldErrors.area_interes = "Selecciona un área de interés";
      return false;
    }
    return true;
  }

  return true;
}

const stepValid = computed(() => {
  if (currentStep.value === 1) {
    return (
      form.nombre.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.ciudad.trim().length > 0
    );
  }
  if (currentStep.value === 2) {
    return !!form.area_interes;
  }
  return true;
});

function nextStep() {
  if (!validateStep(currentStep.value)) return;
  errorMessage.value = "";
  currentStep.value++;
}

function prevStep() {
  errorMessage.value = "";
  clearFieldErrors();
  currentStep.value--;
}

function resetForm() {
  form.nombre = "";
  form.email = "";
  form.telefono = "";
  form.ciudad = "";
  form.profesion = "";
  form.area_interes = "";
  form.mensaje = "";
  currentStep.value = 1;
  errorMessage.value = "";
  clearFieldErrors();
}

async function submitForm() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    await $fetch("/api/miembros/registro", {
      method: "POST",
      body: form,
    });
    isSuccess.value = true;
  } catch (err: unknown) {
    const fetchErr = err as { statusCode?: number; data?: { message?: string } };
    if (fetchErr.statusCode === 409) {
      errorMessage.value = "Este email ya está registrado. ¿Ya eres miembro?";
    } else if (fetchErr.statusCode === 400) {
      errorMessage.value = fetchErr.data?.message || "Revisa los campos e intenta de nuevo.";
    } else {
      errorMessage.value = "No pudimos procesar tu registro. Intenta de nuevo en unos minutos.";
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg">
    <!-- Success state -->
    <div v-if="isSuccess" class="text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center bg-arn-blue">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="mt-6 font-agency text-2xl uppercase text-white">Registro exitoso</h3>
      <p class="mt-3 text-sm leading-relaxed text-white/50">
        Bienvenido al movimiento ARN. Pronto recibirás información sobre tu célula y los próximos pasos.
      </p>
    </div>

    <!-- Form steps -->
    <template v-else>
      <!-- Step indicator — compact inline -->
      <div class="mb-6 flex items-center gap-2">
        <span class="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">Paso {{ currentStep }} de 3</span>
        <div class="flex gap-1">
          <div
            v-for="step in 3"
            :key="step"
            class="h-1 w-6 transition-colors duration-300"
            :class="step <= currentStep ? 'bg-arn-blue' : 'bg-white/10'"
          />
        </div>
      </div>

      <!-- Step 1: Personal info -->
      <div v-show="currentStep === 1" class="space-y-4">
        <h3 class="font-agency text-xl uppercase text-white">Tu perfil</h3>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="nombre" class="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/50">Nombre completo *</label>
            <input
              id="nombre"
              v-model="form.nombre"
              type="text"
              class="w-full border px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-arn-blue"
              :class="fieldErrors.nombre ? 'border-red-400 bg-red-400/5' : 'border-white/10 bg-white/5'"
              placeholder="Tu nombre y apellido"
            />
            <p v-if="fieldErrors.nombre" class="text-red-400 text-xs mt-1">{{ fieldErrors.nombre }}</p>
          </div>

          <div>
            <label for="email" class="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/50">Email *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full border px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-arn-blue"
              :class="fieldErrors.email ? 'border-red-400 bg-red-400/5' : 'border-white/10 bg-white/5'"
              placeholder="tu@email.com"
            />
            <p v-if="fieldErrors.email" class="text-red-400 text-xs mt-1">{{ fieldErrors.email }}</p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="telefono" class="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/50">Teléfono</label>
            <input
              id="telefono"
              v-model="form.telefono"
              type="tel"
              pattern="\+?\d[\d\s\-]{6,}"
              class="w-full border px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-arn-blue"
              :class="fieldErrors.telefono ? 'border-red-400 bg-red-400/5' : 'border-white/10 bg-white/5'"
              placeholder="+58 412 123 4567"
            />
            <p v-if="fieldErrors.telefono" class="text-red-400 text-xs mt-1">{{ fieldErrors.telefono }}</p>
          </div>

          <div>
            <label for="ciudad" class="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/50">Ciudad *</label>
            <input
              id="ciudad"
              v-model="form.ciudad"
              type="text"
              class="w-full border px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-arn-blue"
              :class="fieldErrors.ciudad ? 'border-red-400 bg-red-400/5' : 'border-white/10 bg-white/5'"
              placeholder="Caracas, Maracaibo..."
            />
            <p v-if="fieldErrors.ciudad" class="text-red-400 text-xs mt-1">{{ fieldErrors.ciudad }}</p>
          </div>
        </div>
      </div>

      <!-- Step 2: Area of interest -->
      <div v-show="currentStep === 2" class="space-y-4">
        <h3 class="font-agency text-xl uppercase text-white">Tu área</h3>

        <div>
          <label for="profesion" class="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/50">Profesión u ocupación</label>
          <input
            id="profesion"
            v-model="form.profesion"
            type="text"
            class="w-full border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-arn-blue"
            placeholder="Ingeniero, Médico, Emprendedor..."
          />
        </div>

        <div>
          <label class="mb-2 block text-[11px] uppercase tracking-[0.15em] text-white/50">Área de interés *</label>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button
              v-for="area in areasInteres"
              :key="area.value"
              type="button"
              class="border px-3 py-2 text-left text-[13px] transition-colors duration-200"
              :class="
                form.area_interes === area.value
                  ? 'border-arn-blue bg-arn-blue/10 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
              "
              @click="form.area_interes = area.value; fieldErrors.area_interes = ''"
            >
              {{ area.label }}
            </button>
          </div>
          <p v-if="fieldErrors.area_interes" class="text-red-400 text-xs mt-1">{{ fieldErrors.area_interes }}</p>
        </div>

        <div>
          <label for="mensaje" class="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-white/50">Mensaje (opcional)</label>
          <textarea
            id="mensaje"
            v-model="form.mensaje"
            rows="2"
            class="w-full resize-none border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-arn-blue"
            placeholder="¿Qué te motiva a unirte?"
          />
        </div>
      </div>

      <!-- Step 3: Confirmation -->
      <div v-show="currentStep === 3" class="space-y-4">
        <h3 class="font-agency text-xl uppercase text-white">Confirma tu registro</h3>

        <div class="space-y-3 border border-white/10 p-5">
          <div>
            <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Nombre</span>
            <p class="mt-1 text-sm text-white">{{ form.nombre }}</p>
          </div>
          <div class="h-[1px] bg-white/5" />
          <div>
            <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Email</span>
            <p class="mt-1 text-sm text-white">{{ form.email }}</p>
          </div>
          <div class="h-[1px] bg-white/5" />
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Ciudad</span>
              <p class="mt-1 text-sm text-white">{{ form.ciudad }}</p>
            </div>
            <div v-if="form.telefono">
              <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Teléfono</span>
              <p class="mt-1 text-sm text-white">{{ form.telefono }}</p>
            </div>
          </div>
          <div class="h-[1px] bg-white/5" />
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Área</span>
              <p class="mt-1 text-sm text-white">{{ areasInteres.find(a => a.value === form.area_interes)?.label }}</p>
            </div>
            <div v-if="form.profesion">
              <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Profesión</span>
              <p class="mt-1 text-sm text-white">{{ form.profesion }}</p>
            </div>
          </div>
          <template v-if="form.mensaje">
            <div class="h-[1px] bg-white/5" />
            <div>
              <span class="text-[10px] uppercase tracking-[0.2em] text-white/30">Mensaje</span>
              <p class="mt-1 text-sm text-white/70">{{ form.mensaje }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Error message -->
      <p v-if="errorMessage" class="mt-4 text-sm text-red-400">
        {{ errorMessage }}
      </p>

      <!-- Navigation buttons -->
      <div class="mt-6 flex items-center justify-between">
        <button
          v-if="currentStep > 1"
          type="button"
          class="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
          @click="prevStep"
        >
          &larr; Anterior
        </button>
        <button
          v-else
          type="button"
          class="text-[11px] text-white/25 transition-colors hover:text-white/40"
          @click="resetForm"
        >
          Cancelar
        </button>

        <button
          v-if="currentStep < 3"
          type="button"
          class="bg-arn-blue px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-arn-blue/90 disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!stepValid"
          @click="nextStep"
        >
          Siguiente &rarr;
        </button>
        <button
          v-else
          type="button"
          class="bg-arn-blue px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-arn-blue/90 disabled:opacity-40"
          :disabled="isSubmitting"
          @click="submitForm"
        >
          {{ isSubmitting ? "Enviando..." : "Confirmar registro" }}
        </button>
      </div>
    </template>
  </div>
</template>
