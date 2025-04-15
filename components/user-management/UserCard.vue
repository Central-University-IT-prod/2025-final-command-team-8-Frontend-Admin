<script setup lang="ts">
import {type Reservation} from '~/client/types.gen';
import UserEdit from "~/components/user-management/UserEdit.vue";
import {cancelReservation, getClientReservations} from "~/client/";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  verified: Boolean,
  timingFrom: String,
  timingTo: String,
  room: {
    type: String,
    required: true,
  },
  accountId: Number,
})

const accountEditorOpened = ref<boolean>(false);
const reservations = ref<Reservation[]>([]);
const activeReservation = ref<Reservation>();

const handleOpenAccountEditor = () =>{
  accountEditorOpened.value = !accountEditorOpened.value;
  console.log(accountEditorOpened.value)
}

const updateActiveReservation = () => {
  activeReservation.value = reservations.value.find(reservation =>
      isReservationActive(reservation)
  );
};

const isReservationActive = (reservation: Reservation): boolean => {
  const now = new Date();
  const startsAt = new Date(reservation.starts_at);
  const endsAt = new Date(reservation.ends_at);

  return now >= startsAt && now <= endsAt;
};



const handleCancelSession = async () =>{
  try {
    const response = await getClientReservations({
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
    console.log(response)
    if (response.status === 200 && response.data) {
      reservations.value = response.data;
      updateActiveReservation();
      await cancelSession();
  } else{
      const alert = useAlert();
      alert.error("something went wrong");

    }
  } catch (error) {
    console.error(error)
  }
}

const cancelSession = async () =>{
  if (activeReservation.value && activeReservation.value.id) {
    try{
      const response = await cancelReservation({
        path: {
          reservation_id: activeReservation.value.id,
        },
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      })
      console.log("cancel response", response);
    } catch(e){
      const alert = useAlert();
      alert.error("something went wrong");
      console.error(e)}
  }
}

const mouseFocused = ref<boolean>(false);
</script>

<template>
  <div
      class=" flex items-center justify-between p-4  rounded-3xl relative overflow-hidden cursor-pointer"
      @mouseenter="mouseFocused = true"
      @mouseleave="mouseFocused = false"
  >
    <!-- icon -->
    <div
        :class="props.verified ? 'bg-green-400' : 'bg-contrast'"
        class="rounded-[50%] font-medium text-2xl text-black flex justify-center items-center size-16">
      {{ props.name[0] + props.surname[0] }}
    </div>

    <!-- user data -->
    <div class="flex flex-col items-start">
      <span>{{ props.name }}</span>
      <span class="text-sm text-white/70">{{ props.timingFrom }} - {{ props.timingTo }}</span>
    </div>

    <!-- hover data -->
    <div
        class="absolute left-0 p-4 w-full bg-background flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out rounded-3xl"
        :class="mouseFocused ? 'mx-auto my-auto opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'"
    >
      <div
          @click="handleCancelSession"
          class="mb-4 w-full bg-background text-red-500 rounded-full py-4 p-2 text-sm font-medium flex flex-row justify-center items-center text-center">
        <p class="mt-1">
          Прекратить сеанс
        </p>
      </div>
    </div>
  </div>
  <UserEdit id="123" :opened="accountEditorOpened"/>
</template>

<style scoped>
</style>
