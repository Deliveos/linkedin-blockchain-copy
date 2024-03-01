<script setup>
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

    const friends = await DataService.getFriends(addressArray[0]);
    console.log(friends.data)
    originalFriendsList.value = friends.data;
    displayFriends(friends.data, addressArray[0]);

  } catch (error) {
    console.error(error);
  }
}
const deleteFriendRequest = async (main_address, friend) => {
  console.log(friend)
  const requestBody = {
    friend_address: friend
  };
  try {
    await fetchUserData();
    await DataService.deleteFriends(main_address, requestBody);
    alert('Deleted successfully');
  } catch (error) {
    console.error('Error accepting friend request:', error);
    alert('Failed to accept friend request');
  }
};

const filterFriends = () => {
  if (!searchQuery.value) {
    displayFriends(originalFriendsList.value);
    return;
  }
  const filteredFriends = originalFriendsList.value.filter(friend =>
      friend.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      friend.surname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  displayFriends(filteredFriends);
};
const displayFriends = (friends, main_address) => {
  const friendsList = document.querySelector('.friends');
  friendsList.innerHTML = '';
  friends.forEach(friend => {
    const listItem = document.createElement('li');
    listItem.className = 'font-semibold';

    const friendInfoContainer = document.createElement('div');
    friendInfoContainer.className = 'flex relative justify-between items-start border-b';

    const infoTextContainer = document.createElement('div');
    infoTextContainer.className = 'flex sm:justify-between items-start sm:space-x-4 space-x-4 p-4 pb-2';

    const img = document.createElement('img');
    img.src = 'https://w7.pngwing.com/pngs/262/672/png-transparent-user-profile-aurangabad-computer-icons-great-value-blue-service-logo.png';
    img.alt = `${friend.name} ${friend.surname}`;
    img.className = 'object-contain w-14 h-14 rounded-full';

    const textContainer = document.createElement('div');
    textContainer.className = 'flex flex-col text-sm';

    const firstP = document.createElement('p');
    firstP.className = 'first-p';
    firstP.textContent = friend.name + ' ' + friend.surname;

    const secondP = document.createElement('p');
    secondP.className = 'second-p text-muted font-light';
    secondP.textContent = friend.latest_company;

    const small = document.createElement('small');
    small.className = 'text-muted font-light text-xs mb-2 flex justify-start items-center';
    small.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-green-700 mr-1 mercado-match" width="24" height="24" focusable="false">
      <path d="M12 20a8 8 0 010-16 7.91 7.91 0 014.9 1.69l-1.43 1.42a6 6 0 101.42 1.42l3.82-3.82a1 1 0 000-1.41A1 1 0 0020 3a1 1 0 00-.7.29l-1 1A10 10 0 1022 12h-2a8 8 0 01-8 8zm5-8a5 5 0 11-5-5 4.93 4.93 0 012.76.82l-2.24 2.24A2.24 2.24 0 0012 10a2 2 0 102 2 2.24 2.24 0 00-.07-.51l2.24-2.24A5 5 0 0117 12z"></path>
    </svg>
    Actively recruiting`;

    const detailSmall = document.createElement('small');
    detailSmall.className = 'small text-muted font-light text-xs mb-2';
    detailSmall.textContent = friend.country + ', ' + friend.latest_job_title + ', ' + friend.latest_company + ' before';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded';

    deleteButton.onclick = () => deleteFriendRequest(main_address, friend.address);

    textContainer.appendChild(firstP);
    textContainer.appendChild(secondP);
    textContainer.appendChild(small);
    textContainer.appendChild(detailSmall);

    infoTextContainer.appendChild(img);
    infoTextContainer.appendChild(textContainer);

    friendInfoContainer.appendChild(infoTextContainer);
    listItem.appendChild(friendInfoContainer);
    friendsList.appendChild(listItem);
    friendsList.appendChild(deleteButton);
  });
};

watch(searchQuery, filterFriends);
onMounted(fetchUserData);

</script>
<template>
    <div class="container mt-16  sm:mt-20">
        <div class="flex flex-col md:flex-row  justify-between pb-52 items-center md:items-start md:space-x-5 ">
            <div class="flex flex-col md:sticky top-px w-full px-2 md:px-0 md:basis-1/4 space-y-2  ">
                <div class="border bg-white rounded-lg">
                    <div class="group font-semibold transition-all duration-150 hover:bg-gray-300 hover:cursor-pointer">
                      <div class="flex justify-start py-4 pl-4    items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                fill="currentColor" class="text-muted" width="24" height="24" focusable="false">
                                <path d="M19 5a3 3 0 00-3-3H5v20l7-6.29L19 22z"></path>
                            </svg>
                            <span class=" text-sm group-hover:text-black">Saves</span>
                      </div>
                    </div>
                    <div class="hidden sm:block">
                        <div
                            class=" group font-semibold transition-all duration-150 hover:bg-gray-300 hover:cursor-pointer">
                            <div class="flex justify-start p-4    items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                    fill="currentColor" class="text-muted" width="24" height="24" focusable="false">
                                    <path
                                        d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z">
                                    </path>
                                </svg>
                                <span class=" text-sm group-hover:text-black">Notifications</span>
                            </div>
                        </div>
                        <div class="group font-semibold transition-all duration-150 hover:bg-gray-300 hover:cursor-pointer">
                          <router-link to="/friend_requests" class="flex justify-start p-4    items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                    fill="currentColor" class="text-muted" width="24" height="24" focusable="false">
                                    <path
                                        d="M14.73 10H17l-5.5 8L8 14.5l1.34-1.34L11.21 15zM20 3v16a3 3 0 01-3 3H7a3 3 0 01-3-3V3h5.69l.52-1A2 2 0 0112 1a2 2 0 011.76 1l.52 1zm-2 2h-2.6l.6 1.1V7H8v-.9L8.6 5H6v14a1 1 0 001 1h10a1 1 0 001-1z">
                                    </path>
                                </svg>
                                <span class=" text-sm group-hover:text-black">Friend requests</span>
                          </router-link>
                        </div>
                        <div class=" group font-semibold transition-all duration-150 hover:bg-gray-300 hover:cursor-pointer">
                            <div class="flex justify-start py-4 pl-4 truncate items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                    fill="currentColor" class="text-muted" width="24" height="24" focusable="false">
                                    <path
                                        d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z">
                                    </path>
                                </svg>
                                <span class=" text-sm group-hover:text-black">Something</span>
                            </div>
                        </div>
                        <div
                            class=" group font-semibold transition-all duration-150 hover:bg-gray-300 hover:cursor-pointer">
                            <div class="flex justify-start py-4 pl-4 truncate items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                    fill="currentColor" class="text-muted" width="24" height="24" focusable="false">
                                    <path
                                        d="M9.18 2l-4.3 2.52L6.22 8l-.52.91-3.7.55v5l3.64.54.54.93-1.34 3.53L9.14 22l2.29-2.9h1.09l2.3 2.9 4.32-2.52L17.79 16l.53-.93 3.68-.53v-5L18.32 9l-.51-.9 1.36-3.51L14.86 2l-2.33 3h-1zM12 9a3 3 0 11-3 3 3 3 0 013-3z">
                                    </path>
                                </svg>
                                <span class=" text-sm group-hover:text-black">Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="rounded-full flex justify-center items-center border border-1 ring-1 hover:ring-2 transition-all duration-300 ring-primary text-primary bg-transparent py-2 w-full hover:bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                        fill="currentColor" class="mr-2 mercado-match" width="24" height="24" focusable="false">
                        <path
                            d="M19 12h2v6a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h6v2H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1zm4-8a2.91 2.91 0 01-.87 2l-8.94 9L7 17l2-6.14 9-9A3 3 0 0123 4zm-4 2.35L17.64 5l-7.22 7.22 1.35 1.34z">
                        </path>
                    </svg>
                  Post a job for free
                </button>
            </div>

          <div class="w-full mt-4 md:mt-0 md:basis-2/3  flex flex-col space-y-2">
                <div class="border bg-white p-4 rounded-lg">
                    <div class="flex justify-between items-center">
                        <p class="text-xl font-semibold">Friends search</p>
                        <span class="p-2 hover:bg-gray-200 cursor-pointer rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                                <path
                                    d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z">
                                </path>
                            </svg>
                        </span>
                    </div>
                  <div
                      class="relative bg-slate-100 px-4 py-1 flex items-center  md:hover:w-[300px] w-[250px] rounded-md text-sm h-10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                         fill="#666667" class="mercado-match absolute left-3 group-hover:fill-black " width="24"
                         height="24" focusable="false">
                      <path
                          d="M21.41 18.59l-5.27-5.28A6.83 6.83 0 0017 10a7 7 0 10-7 7 6.83 6.83 0 003.31-.86l5.28 5.27a2 2 0 002.82-2.82zM5 10a5 5 0 115 5 5 5 0 01-5-5z">
                      </path>
                    </svg>
                    <input v-model="searchQuery"
                           @keypress.enter="filterFriends"
                           class="bg-slate-100 h-full w-full ml-5 outline-0 placeholder:text-slate-600"
                           placeholder="Поиск Товарища" type="text">
                  </div>
                </div>
                <div class="border bg-white pt-4  rounded-lg">
                    <p class="text-xl font-semibold px-4">Your friends</p>
                    <p class="text-muted px-4">Find your mates easily and quickly</p>
                    <ul class="friends"></ul>
                </div>
            </div>

            <div class="sticky -top-[200px] basis-1/3 hidden lg:flex flex-col">
                <div class="border space-y-2 bg-white rounded-lg">
                    <p class="font-semibold px-4 py-5 ">Safety tips for your job search</p>
                    <div
                        class="flex bg-gray-100 hover:bg-slate-100 cursor-pointer text-sm font-semibold bg-opacity-50 justify-between items-center space-x-2">
                        <span class="px-4">
                            Protect yourself from job search scams
                        </span>
                    </div>
                    <p class="px-4 py-2 text-sm">
                      LinkedIn ensures your privacy while you find your next big opportunity.
                    </p>
                </div>

                <!-- Right Side links -->
                <div class="border bg-white py-[0.50px] mt-2 mb-4 rounded-full"></div>
                <div class="px-8">
                    <ul class="text-xs text-muted space-y-2">
                        <div class="flex justify-between items-center">
                            <li class="hover:text-primary hover:underline"><a href="#"> About</a></li>
                            <li class="hover:text-primary hover:underline"><a href="#"> accessibility</a></li>
                            <li class="hover:text-primary hover:underline"><a href="#"> Help center</a></li>
                        </div>

                        <div class="flex justify-center items-center space-x-2">
                            <li class="hover:text-primary hover:underline"><a href="#"> Ad Preferences</a></li>
                            <li class="hover:text-primary hover:underline flex justify-between items-center">
                                <a href="#"> Privacy and Terms</a> <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match"
                                    width="16" height="16" focusable="false">
                                    <path d="M8 11L3 6h10z" fill-rule="evenodd"></path>
                                </svg>
                            </li>
                        </div>
                        <div class="flex justify-between items-center">
                            <li class="hover:text-primary hover:underline"><a href="#"> Install LinkedIn app</a></li>
                            <li class="hover:text-primary hover:underline"><a href="#"> More</a></li>
                          <li class="flex justify-between items-center"><span class="text-primary font-bold">LinkedIn <i class="fa-brands fa-linkedin"></i></span></li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
