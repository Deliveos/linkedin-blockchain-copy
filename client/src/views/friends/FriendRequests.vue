<script setup>
import RightSide from '../../components/home/RightSide.vue';


import DataService from './../../DataService.js';
import {onMounted, ref, watch} from 'vue';
import { getFriendsData } from './../../FriendService';

const name = ref('');
const searchQuery = ref('');
const originalFriendsList = ref([]);
const fetchUserData = async () => {
  try {
    if (!window.ethereum) throw new Error("No Ethereum provider available");
    const addressArray = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const response = await DataService.getFriendRequest(addressArray[0]);

    console.log(response.data)
    originalFriendsList.value = response.data;
    await displayFriends(response.data);
  } catch (error) {
    console.error(error);
  }
}

const acceptFriendRequest = async (address, sender_address) => {
  const requestBody = {
    sender_address: sender_address,
    status: "accepted"
  };
  try {
    await fetchUserData();
    await DataService.putFriendRequest(address, requestBody);
    alert('Request accepted successfully');
  } catch (error) {
    console.error('Error accepting friend request:', error);
    alert('Failed to accept friend request');
  }
};

const displayFriends = async (friends) => {
  const friendsList = document.querySelector('.friends');
  friendsList.innerHTML = '';
  for (const friend of friends) {
    const listItem = document.createElement('li');
    listItem.className = 'font-semibold';

    const user = await DataService.getUser(friend.sender_address);
    console.log(friend.receiver_address)

    const friendInfoContainer = document.createElement('div');
    friendInfoContainer.className = 'flex relative justify-between items-start border-b';

    const infoTextContainer = document.createElement('div');
    infoTextContainer.className = 'flex sm:justify-between items-start sm:space-x-4 space-x-4 p-4 pb-2';

    const img = document.createElement('img');
    img.src = 'https://w7.pngwing.com/pngs/262/672/png-transparent-user-profile-aurangabad-computer-icons-great-value-blue-service-logo.png';
    img.alt = `${user.name} ${user.surname}`;
    img.className = 'object-contain w-14 h-14 rounded-full';

    const textContainer = document.createElement('div');
    textContainer.className = 'flex flex-col text-sm';

    const firstP = document.createElement('p');
    firstP.className = 'first-p';
    firstP.textContent = user.name + ' ' + user.surname;

    const secondP = document.createElement('p');
    secondP.className = 'second-p text-muted font-light';
    secondP.textContent = user.latest_company;

    const small = document.createElement('small');
    small.className = 'text-muted font-light text-xs mb-2 flex justify-start items-center';
    small.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-green-700 mr-1 mercado-match" width="24" height="24" focusable="false">
      <path d="M12 20a8 8 0 010-16 7.91 7.91 0 014.9 1.69l-1.43 1.42a6 6 0 101.42 1.42l3.82-3.82a1 1 0 000-1.41A1 1 0 0020 3a1 1 0 00-.7.29l-1 1A10 10 0 1022 12h-2a8 8 0 01-8 8zm5-8a5 5 0 11-5-5 4.93 4.93 0 012.76.82l-2.24 2.24A2.24 2.24 0 0012 10a2 2 0 102 2 2.24 2.24 0 00-.07-.51l2.24-2.24A5 5 0 0117 12z"></path>
    </svg>
    Actively recruiting`;

    const detailSmall = document.createElement('small');
    detailSmall.className = 'small text-muted font-light text-xs mb-2';
    detailSmall.textContent = user.country + ', ' + user.latest_job_title + ', ' + user.latest_company + ' before';

    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded';

    acceptButton.onclick = () => acceptFriendRequest(friend.receiver_address, friend.sender_address);

    textContainer.appendChild(firstP);
    textContainer.appendChild(secondP);
    textContainer.appendChild(small);
    textContainer.appendChild(detailSmall);

    infoTextContainer.appendChild(img);
    infoTextContainer.appendChild(textContainer);

    friendInfoContainer.appendChild(infoTextContainer);
    listItem.appendChild(friendInfoContainer);
    friendsList.appendChild(listItem);
    friendsList.appendChild(acceptButton);

  }
};

watch(searchQuery);
onMounted(fetchUserData);


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
                            <span class="">Requests</span>
                        </div>
                    </div>
                    <div class="hidden sm:block">
                        <div
                            class=" group font-semibold transition-all duration-150 border-l-4 border border-r-0 border-l-primary text-primary   hover:cursor-pointer flex justify-between items-center">
                            <span class=" text-sm group-hover:text-black py-4 px-4">Active</span>
                            <span class=" text-sm group-hover:text-black py-4 px-4">{{ }}</span>
                        </div>
                        <div
                            class=" group font-semibold transition-all duration-150 border-b hover:cursor-pointer flex justify-between items-center">
                            <span class=" text-sm group-hover:text-black py-4 px-4">Accepted</span>
                            <span class=" text-sm group-hover:text-black py-4 px-4">7</span>
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
                        <p class="text-2xl ">Friend Requests</p>
                        <button class="bg-green-700 my-4  rounded-full py-1 px-3  text-white active:bg-green-800 font-bold">Active</button>
                    </div>
                    <ul class="md:mt-3 mt-2 friends">
                        <li class="font-semibold border-b px-4">
                            <div class="flex relative justify-between items-start  ">
                                <div class="flex  sm:justify-between  items-start  sm:space-x-4 space-x-2 ">
                                    <img src="" alt=""
                                        class="object-contain  w-14 h-14 rounded-full ">
                                    <div class="flex flex-col text-sm">
                                        <router-link :to='`/job/`'
                                            class="font-semibold cursor-pointer hover:underline text-base"></router-link>
                                        <p class="first-p"></p>
                                        <p class="second-p text-muted font-light">sss</p>
                                      <button class="bg-green-700 my-4 rounded-full py-1 px-3  text-white active:bg-green-800 font-bold" @click="">Accept</button>
                                    </div>
                                </div>
                                <span
                                    class="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                        fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                        <path
                                            d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="sticky -top-[200px] basis-1/3 hidden lg:flex flex-col">
                <RightSide />
            </div>
        </div>
    </div>
</template>
