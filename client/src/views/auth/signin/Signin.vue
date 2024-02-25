<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import DataService from './../../../DataService';

const route = useRouter()

const signup = async () => {
  try {
    if (!window.ethereum) throw new Error("No Ethereum provider available");

    const addressArray = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const newUser = await DataService.getUser(addressArray[0]);

    if (!newUser) {
      await route?.push("/name_info");
      console.log('User not registered, redirecting to registration page');
    } else {
      await route?.push("/");
      console.log('User already registered, redirecting to home page');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('User not found, redirecting to registration page');
      await route?.push("/name_info");
    } else {
      console.error('Error during signup:', error.message);
    }
  }
};

</script>
<template>
    <div class="bg-white rounded-md w-screen h-screen">
        <div class="container px-3 pt-12 md:py-5">
            <div class=" mb-5 hidden md:flex  items-center text-primary text-4xl space-x-1">
                <h3 class="font-bold ">Linked</h3><i class="fa-brands fa-linkedin"></i>
            </div>

            <div class="flex-1  md:w-1/2 lg:w-1/3 mx-auto rounded-md drop-shadow-xl bg-white py-6 px-6 ">
                <div>
                    <small>Stay up to date with news about your professional world</small>
                </div>
                <button @click="signup()"
                    class="bg-primary my-4 w-full rounded-full py-4  text-white active:bg-[#09223b] hover:bg-[#004182] font-bold">
                    Sign in / sign up
                </button>
            </div>
        </div>
    </div>
</template>
