<script setup lang="ts">
import {validate} from "uuid"
import {
  getClientById,
  type GetClientByIdResponse,
  getReservation,
  getSeatById,
  type Reservation,
  type Seat
} from "~/client";
import {House} from "lucide-vue-next";
import {QrcodeStream} from "vue-qrcode-reader";

const id = useRoute().params.id;
const alert = useAlert();
const reservation = ref<Reservation>();
const client = ref<GetClientByIdResponse>();
const seat = ref<Seat>();

if (id === null || id == "" || Array.isArray(id)) {
  alert.error("Ошибка, запись не существует");
  navigateTo('/');
}

if (!validate(id)) {
  alert.error("Ошибка, запись не существует");
  navigateTo('/');
}

onMounted(async () => {
  try {
    const res = await getReservation({
      path: {
        reservation_id: id as string,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    if (res.status == 200) {
      const clientRes = await getClientById({
        path: {
          client_id: id as string,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })

      if (res.status == 200) {
        const seatRes = await getSeatById({
          path: {
            seat_id: res.data?.seat_id as string,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })

        if (seatRes.status == 200) {
          reservation.value = res.data;
          client.value = clientRes.data;
          seat.value = seatRes.data;
        } else {
          alert.error("Ошибка, запись не существует");
          navigateTo('/');
        }
      } else {
        alert.error("Ошибка, запись не существует");
        navigateTo('/');
      }
    } else {
      alert.error("Ошибка, запись не существует");
      navigateTo('/');
    }
  } catch (error) {
    console.error(error);
    alert.error("Ошибка, запись не существует");
    navigateTo('/');
  }
})
</script>

<template>
  <div class="max-w-screen-sm md:min-w-screen bg-black mx-auto flex w-full h-full justify-center items-center align-middle">

    <div class="bg-block rounded-3xl p-6 flex flex-col justify-center items-center text-start max-w-[90vw] md:max-w-screen-sm max-h-md">
      <div class="text-sm text-zinc-400">
        <label :content="reservation?.cancelled"/>
        <label :content="reservation?.ends_at"/>
        <label :content="reservation?.starts_at"/>
        <label :content="seat?.number"/>
        <label :content="client?.name + ' ' + client?.surname + ' ' + client?.patronymic"/>
        <label :content="client?.email"/>
      </div>

      <NuxtLink class="w-full" to="/">
        <div class="w-full bg-contrast py-4 rounded-full text-sm text-black font-medium flex flex-row justify-center items-center text-center">
          <House class="mr-2"/>
          <p class="mt-1">
            Назад в меню
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>