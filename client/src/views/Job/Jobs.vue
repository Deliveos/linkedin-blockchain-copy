<script setup>
import { ref } from 'vue';
import DataService from './../../DataService.js';

const titleName = ref('');
const content = ref('');

const createPost = async () => {
  if (!window.ethereum) {
    alert("No Ethereum provider available");
    throw new Error("No Ethereum provider available");
  }

  try {
    const addressArray = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    console.log(addressArray);

    const requestBody = {
      userAddress: addressArray[0],
      title: titleName.value,
      content: content.value,
    };

    await DataService.createPost(requestBody);
    alert('Post created successfully');

    titleName.value = '';
    content.value = '';
  } catch (error) {
    console.error('Error creating post:', error);
    alert('Failed to create post');
  }
};

</script>
<template>
  <div class="container mt-16  sm:mt-20">
    <div class="flex flex-col md:flex-row  justify-between pb-52 items-center md:items-start md:space-x-5 ">
      <div class="flex flex-col md:sticky top-px w-full px-2 md:px-0 md:basis-1/4 space-y-2  ">
        <div class="text-muted font-semibold border bg-white rounded-lg">
          <div class="  transition-all duration-150">
            <div class="flex justify-start p-4   items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                   fill="currentColor" class="text-muted" width="24" height="24" focusable="false">
                <path d="M19 5a3 3 0 00-3-3H5v20l7-6.29L19 22z"></path>
              </svg>
              <span class="">Post creation</span>
            </div>
          </div>
          <div class="hidden sm:block">
            <div
                class=" group font-semibold transition-all duration-150 border-l-4 border border-r-0 border-l-primary text-primary   hover:cursor-pointer flex justify-between items-center">
              <span class=" text-sm group-hover:text-black py-4 px-4">Create</span>
              <span class=" text-sm group-hover:text-black py-4 px-4">{{ }}</span>
            </div>
            <div
                class=" group font-semibold transition-all duration-150 border-b hover:cursor-pointer flex justify-between items-center">
              <span class=" text-sm group-hover:text-black py-4 px-4">Deleted</span>
              <span class=" text-sm group-hover:text-black py-4 px-4">4</span>
            </div>
            <div
                class=" group font-semibold whitespace-nowrap transition-all duration-150 border-b hover:cursor-pointer flex justify-between items-center">
              <span class=" text-sm group-hover:text-black py-4 pl-4">All</span>
              <span class=" text-sm group-hover:text-black py-4 px-4">10+</span>
            </div>
          </div>

        </div>
      </div>
      <div class="w-full mt-4 md:mt-0 md:basis-2/3  flex flex-col space-y-2">
        <div class="border bg-white pt-4 rounded-lg">
          <div class="border-b px-4">
            <p class="text-2xl ">Create a post</p>
            <button class="bg-green-700 my-4  rounded-full py-1 px-3  text-white active:bg-green-800 font-bold">TRY</button>
          </div>
          <div class="flex-1 md:w-2/5 mx-auto rounded-md bg-white py-6 px-6 space-y-4">
            <div class="flex flex-col">
              <label for="name" class="text-muted text-sm">Tile</label>
              <input v-model="titleName" type="text" id="name"
                     class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black rounded-sm" />
            </div>

            <div class="flex flex-col">
              <label for="surname" class="text-muted text-sm">Content</label>
              <div class="flex justify-between items-center">
                <input v-model="content" type="text" id="surname"
                       class="mt-1 px-2 py-1 border border-1 border-muted focus:outline-black w-full rounded-sm" />
              </div>
            </div>

            <button @click="createPost" class="bg-primary w-full rounded-full py-3  text-white active:bg-[#09223b] hover:bg-[#004182] font-bold">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
