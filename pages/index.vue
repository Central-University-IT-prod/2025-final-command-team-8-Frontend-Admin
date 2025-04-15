<script setup lang="ts">
import { ref } from 'vue';
import DonutChart from "~/components/DonutChart.vue";
import {LogOut, QrCode} from "lucide-vue-next";
import {getCoworking} from "~/client";
import {useAlert} from "~/composables/useAlert";
import UserCard from "~/components/user-management/UserCard.vue";

const currentTab = ref('stats');

const user = useUser();
const alert = useAlert();

const available = ref(30);
const taken = ref(35);

onMounted(async ()=>{
  try {
    const response = await getCoworking({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.value?.token}`
      }
    })
    if (response.data != undefined) {
      alert.success("Успешный вход!");
    } else if (response.status == 400 || response.status == 404 || response.status == 401) {
      console.log(response.error.description)
      alert.error(response.error.description);
    } else {
      console.log(response.error.description);
      alert.error("Неизвестная ошибка");
    }
  } catch (error) {
    console.log(error);
    alert.error("Неизвестная ошибка");
  }
})


// запрос для получения текущих клиентов

// onMounted(async () =>{
//   try{
//     const response = await getActiveClients({
//       headers:{
//         "Authorization": `Bearer ${user.value?.token}`,
//       }
//     })
//     if (response.data != undefined) {
//       alert.success("невероятно, они написали этот эндпоинт")
//     }
//   } catch(e){
//     console.error(e);
//   }
// })


/*
const takenChartData = [
  { value: 35, color: '#9333ea' },
  { value: 30, color: '#60a5fa' },
  { value: 35, color: '#f472b6' }
];
*/

const spotsChartData = [
  { value: taken.value, color: '#dc2626' },
  { value: available.value, color: '#16a34a' },
]

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
</script>



<template>
  <div class="min-h-screen bg-black flex flex-col">
    <div class="flex flex-col md:flex-row p-6 gap-6 flex-1">

      <div class="bg-block rounded-3xl p-6 w-full md:w-64 flex flex-col">
        <NuxtLink to="/auth/login" @click="handleLogout">
          <div class="mb-4 w-full bg-background text-red-500 rounded-full py-4 p-2 text-sm font-medium flex flex-row justify-center items-center text-center">
            <LogOut class="mr-2"/>
            <p class="mt-1">
              Выйти из аккаунта
            </p>
          </div>
        </NuxtLink>

        <div class="mb-8">
          <h1 class="text-3xl font-bold tracking-tighter text-white">T-lounge</h1>
          <p class="text-sm text-zinc-400">Панель администратора</p>
        </div>

        <div class="grid bg-zinc-900 grid-cols-2 -mx-4 gap-2 mb-10 px-py-3 rounded-full relative">
          <div @click="currentTab = 'stats'"
               class="rounded-full p-3 text-center text-sm text-white cursor-pointer z-10">
            Статистика
          </div>
          <div @click="currentTab = 'clients'"
               class="rounded-full p-3 text-center text-sm text-white cursor-pointer z-10">
            Клиенты
          </div>
          <div class="absolute top-[6px] left-[6px] bg-zinc-950 rounded-full h-[calc(100%-12px)] w-[calc(50%-6px)] transition-all duration-300 ease-in-out"
               :class="currentTab === 'clients' ? 'translate-x-full' : ''">
          </div>
        </div>


        <div v-if="currentTab == 'stats'">
          <!--
          <div class="flex justify-center mb-4">
            <div class="relative w-24 h-24">
              <DonutChart :data="takenChartData" />
            </div>
          </div>

          <div class="mb-5 text-xs text-zinc-300">
            <div class="flex items-center mb-1">
              <div class="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <span>Open space</span>
            </div>
            <div class="flex items-center mb-1">
              <div class="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
              <span>Basic</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-pink-400 mr-2"></div>
              <span>Premium</span>
            </div>
          </div>
          -->

          <div class="flex justify-center mb-4">
            <div class="relative w-24 h-24">
              <DonutChart :data="spotsChartData"/>
            </div>
          </div>

          <div class="mb-5 text-xs text-zinc-300">
            <div class="flex items-center mb-1">
              <div class="w-2 h-2 rounded-full bg-red-600 mr-2"></div>
              <span>Занято</span>
            </div>
            <div class="flex items-center mb-1">
              <div class="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
              <span>Свободно</span>
            </div>
          </div>

          <!--
          <div class="text-xs text-zinc-400 mb-1">Заработок за сегодня</div>
          <div class="text-2xl font-bold mb-2 text-white">36,000</div>

          <div class="text-xs text-zinc-400 mb-1">Заработок за весь период</div>
          <div class="text-2xl font-bold mb-2 text-white">360,000</div>
          -->
        </div>

        <div v-else class="overflow-y-auto h-full pb-4">
          <UserCard
            name="Laynexx"
            surname="laynexx"
            timing-from="14:00"
            timing-to="16:00"
            :id="1234"
            :verified="true"
           room="qwe"/>
          <UserCard
              name="Laynexx"
              surname="laynexx"
              timing-from="14:00"
              timing-to="16:00"
              room="qwe"
              :verified="false"
          />
        </div>

        <div class="mt-auto">
          <NuxtLink to="/qr">
            <div class="w-full bg-contrast py-4 rounded-full text-sm text-black font-medium flex flex-row justify-center items-center text-center">
              <QrCode class="mr-2"/>
              <p class="mt-1">
                Сканировать QR-код
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="bg-block rounded-3xl p-6 flex-1 flex flex-col">
        <CoworkingMap/>
      </div>
    </div>
  </div>
</template>



<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background-color: #000000;
  color: #ffffff;
}
</style>