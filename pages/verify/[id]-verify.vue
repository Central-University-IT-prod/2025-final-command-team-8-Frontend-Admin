<script setup lang="ts">
import {getClientById, type GetClientByIdResponse} from "~/client";

const item = useRoute().params.id;
const account = ref<GetClientByIdResponse>();

onMounted(()=>{
  const response = getClientById({
    path: {
      client_id : item[0],
    },
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }

  })
})
</script>

<template>
  <div class="flex p-6 justify-center items-center bg-background w-screen h-screen">
    <div class=" w-full h-full bg-block p-4 rounded-3xl">
      <div class="flex gap-4" v-if="account">
        <div class="flex flex-col gap-2">
          <span class="text-md font-white/60">Имя</span>
          <span class="text-xl">{{account.name}}</span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-md font-white/60">Имя</span>
          <span class="text-xl">{{account.name}}</span>
        </div>

        <div class="flex flex-col gap-2" v-if="account.patronum">
          <span class="text-md font-white/60">Имя</span>
          <span class="text-xl">{{account.patronum}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>