<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRouter()
const router = useRouter()
const store = useStore()
const userData = reactive({})

const signup = async () => {
    if (!window.ethereum) return ("U DUMB")
      try {
        const addressArray = await window.ethereum.request({
        //   const addressArray = window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        
        console.log(addressArray);

        await route?.push("/name_info")
      } catch (error) {
        console.error(error)
      }
}

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
                <!-- <router-link to="/forgot-password"
                    class=" hover:underline mt-6  py-2 text-primary hover:bg-[#d0e8ff] cursor-pointer rounded-full px-2 font-semibold border border-1 border-transparent active:border-primary">your password,
                    Did you forget?</router-link> -->

                <button @click="signup()"
                    class="bg-primary my-4 w-full rounded-full py-4  text-white active:bg-[#09223b] hover:bg-[#004182] font-bold">
                    Sign in / sign up
                </button>
            </div>
        </div>
    </div>
</template>
