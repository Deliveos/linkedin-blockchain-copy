<template>
   <div class="flex-1 md:w-2/5 mx-auto rounded-md bg-white py-6 px-6 space-y-4" style="margin-top: 200px;">
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
         <input v-model="country" type="text" id="name"
               class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black rounded-sm" />
      </div>

      <div class="flex flex-col">
         <label for="name" class="text-muted text-sm">City/District <span class="items-start text-primary">*</span></label>
         <input v-model="city" type="text" id="name"
               class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black rounded-sm" />
      </div>

      <div class="flex flex-col">
         <label for="name" class="text-muted text-sm">Latest job title <span
               class="items-start text-primary">*</span></label>
         <input v-model="latest_job_title" type="text" id="name"
               class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black rounded-sm" />
      </div>

      <div class="flex flex-col">
         <label for="companies" class="text-muted text-sm">Latest company <span
               class="items-start text-primary">*</span></label>
         <input v-model="latest_company" type="text" id="name"
               class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black rounded-sm" />
      </div>

      <button @click="setUser()"
         class="bg-primary w-full rounded-full py-3  text-white active:bg-[#09223b] hover:bg-[#004182] font-bold">
         Continue
      </button>
   </div>
</template>


<script>
import { useRouter } from 'vue-router';
import router from './../../../router/index.js'
import DataService from './../../../DataService';
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      surname: '',
      country: '',
      city: '',
      image: '',
      latest_job_title: '',
      latest_company: '',
    };
  },
  methods: {
  /*async setUser() {
    try {
      if (!window.ethereum) throw new Error("No Ethereum provider available");

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const user = {
        address: addressArray[0],
        name: this.name,
        surname: this.surname,
        country: this.country,
        city: this.city,
        image: this.image,
        latest_job_title: this.latest_job_title,
        latest_company: this.latest_company,
      };

      await DataService.createUser(user);

      console.log('User data sent successfully');
      // Redirect the user to the next page after successful registration
      await router?.push("/");
    } catch (error) {
      console.error('Error during user registration:', error.message);
    }
  },*/

    async setUser() {
      try {
        if (!window.ethereum) throw new Error("No Ethereum provider available");

        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const user = {
          address: addressArray[0],
          name: this.name,
          surname: this.surname,
          country: this.country,
          city: this.city,
          image: this.image,
          latest_job_title: this.latest_job_title,
          latest_company: this.latest_company,
        };

        const existingUser = await DataService.getUser(addressArray[0]);

        if (!existingUser) {
          await DataService.createUser(user);
          console.log('User data sent successfully');
          await router.push("/");
        } else {
          console.log('User already exists, redirecting to home page');
          await router.push("/");
        }
      } catch (error) {
        if (error.response) {
          console.log('redirecting to home page');
          await router.push("/");
        } else {
          console.error('Error during user registration:', error.message);

        }
      }
    },
  }
};
</script>