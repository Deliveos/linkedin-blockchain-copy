<script setup>
import DataService from './../DataService.js';
import {onMounted, ref} from 'vue';
import { getFriendsData } from './../FriendService';

const name = ref('');
const surname = ref('');
const country = ref('');
const city = ref('');
const image = ref('');
const latest_job_title = ref('');
const latest_company = ref('');

const fetchUserData = async () => {
  try {
    if (!window.ethereum) throw new Error("No Ethereum provider available");
    const addressArray = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const user = await DataService.getUser(addressArray[0]);
    name.value = user.name;
    surname.value = user.surname;
    country.value = user.country;
    city.value = user.city;
    image.value = user.image;
    latest_job_title.value = user.latest_job_title;
    latest_company.value = user.latest_company;

    console.log(user);

    const friends = await DataService.getFriends(addressArray[0]);

    const friendsContainer = document.querySelector('.friends');
    friends.data.forEach(friend => {
      const friendElement = document.createElement('div');
      const friendTitle = document.createElement('p');
      friendElement.textContent = friend.name + ' ' + friend.surname;
      friendTitle.textContent = friend.country + ' ' + friend.latest_job_title + ' ' + friend.latest_company;
      friendsContainer.appendChild(friendElement);
      friendsContainer.appendChild(friendTitle);
    });
  } catch (error) {
    console.error(error);
  }
}

onMounted(fetchUserData);

</script>

<template>
  <div class="" style="margin-top: 100px;">
    <div class="container-wrapper">
      <div class="inner_card">
        <img width="150px" src="./../assets/Profile-PNG-Free-Download.png" alt="">
        <h1>{{ name }}, {{ surname }}</h1>
        <br>
        <h3>
          {{ country }} <br>
          {{ city }} <br>
          {{ latest_job_title }} <br>
          {{ latest_company }} <br>
        </h3>
      </div>
      <div class="long_card">
          ПОСТЫ
      </div>
      <div class="inner_card">
        <div
            class="relative bg-slate-100 px-4 py-1 flex items-center  md:hover:w-[300px] w-[250px] rounded-md text-sm h-10 ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
               fill="#666667" class="mercado-match absolute left-3 group-hover:fill-black " width="24"
               height="24" focusable="false">
            <path
                d="M21.41 18.59l-5.27-5.28A6.83 6.83 0 0017 10a7 7 0 10-7 7 6.83 6.83 0 003.31-.86l5.28 5.27a2 2 0 002.82-2.82zM5 10a5 5 0 115 5 5 5 0 01-5-5z">
            </path>
          </svg>
          <input @keypress.enter="search($event)"
                 class=" bg-slate-100 h-full w-full ml-5 outline-0 placeholder:text-slate-600 "
                 placeholder="    Поиск Товарища" type="text">
        </div>
        <div class="friends" style="margin-top: 30px;">
          <h1 style="font-weight: bold;">Friends:</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped >

.friends{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.container-wrapper {
  display: flex;
  justify-content: space-between;
  width: 1240px;
  margin: 0 auto;
  height: 300px;
}

.inner_card{
  background: #FFF;
  width: 26%;
  height: 450px;
  border-radius: 30px;
}

.inner_card:first-child{
  text-align: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.inner_card:last-child{
  text-align: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}


.inner_card:first-child h1 {
  font-size: 30px;
}

.inner_card:first-child h3 {
  font-size: 20px;
}

.long_card {
  background: #fff;
  width: 45%;
  height: 300px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
