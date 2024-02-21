<script setup>
import {computed, reactive, ref} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const router = useRouter()
const store = useStore()

const name = ref(null)
const surname = ref(null)
const full_name = computed(() => {
   return name.value + ' ' + surname.value
})
// const userData = { ...store.state.users.registerData }
const userData = reactive({})

const setUserName = () => {
    userData.full_name = full_name
    store.commit('users/setUserInfo', userData)
   // router?.push("/signin/location_info")
}
</script>

<template>
   <div class="flex-1 md:w-2/5 mx-auto rounded-md bg-white py-6 px-6 space-y-4">
      <div class="flex flex-col">
         <label for="name" class="text-muted text-sm">Name</label>
         <input v-model="name" type="text" id="name"
            class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black rounded-sm" />
      </div>

      <div class="flex flex-col">
         <label for="surname" class="text-muted text-sm">Surname</label>
         <div class="flex justify-between items-center">
            <input v-model="surname" type="text" id="surname"
               class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black w-full rounded-sm" />
         </div>
      </div>

      <div class="flex flex-col">
         <label for="name" class="text-muted text-sm">Country/Region <span class="items-start text-primary">*</span></label>
         <input v-model="country" type="text" id="name" :class="{ 'ring-red-600 ring-2': (error.location && !country) }"
            class="mt-1 px-2 py-1 ring-1 ring-muted focus:outline-black rounded-sm" />
         <small v-if="error.location && !country" class="text-red-600 ">{{ error.location }}</small>
      </div>

      <div class="flex flex-col">
         <label for="name" class="text-muted text-sm">City/District <span class="items-start text-primary">*</span></label>
         <input v-model="city" type="text" id="name" :class="{ 'ring-red-600 ring-2': (error.location && !city) }"
            class="mt-1 px-2 py-1 ring-1 ring-muted focus:outline-black rounded-sm" />
         <small v-if="error.location && !city" class="text-red-600 ">{{ error.location }}</small>
      </div>

      <div class="flex flex-col">
         <label for="name" class="text-muted text-sm">Latest job title <span
               class="items-start text-primary">*</span></label>
         <input v-model="title" type="text" id="name" :class="{ 'ring-red-600 ring-2': error.title }"
            class="mt-1 px-2 py-1 ring-1 ring-muted focus:outline-black rounded-sm" />
         <small v-if="error.title" class="text-red-600 ">{{ error.title }}</small>
      </div>

      <div class="flex flex-col">
         <label for="companies" class="text-muted text-sm">Latest company <span
               class="items-start text-primary">*</span></label>
         <select v-model="company" name="companies" id="companies" :class="{ 'ring-red-600 ring-2': error.title }"
            class="mt-1 px-2 py-1 ring-1 ring-muted focus:outline-black rounded-sm">
            <option v-for="company in companies" :key="company._id" :value="company._id">{{ company.name }}</option>
         </select>
         <small v-if="error.company" class="text-red-600 ">{{ error.company }}</small>
      </div>

      <button @click="setUserName"
         class="bg-primary w-full rounded-full py-3  text-white active:bg-[#09223b] hover:bg-[#004182] font-bold">
         Continue
      </button>
   </div>
</template>