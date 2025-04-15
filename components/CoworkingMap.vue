<script setup lang="ts">
import type { Seat } from "~/client/types.gen"
import UserAdd from "~/components/user-management/UserAdd.vue";


const openAddUser = ref<boolean>(false);
const currentId = ref<number>(0);
const seat = ref<Seat | null>(null);

const handleAddUser = (seatItem: Seat) => {
  seat.value = seatItem;
  openAddUser.value = true;
}

const handleClose = () =>{
  openAddUser.value = false;
}

const handleCloseUserAdd = () => {
  openAddUser.value = false;

  setTimeout(() => {
    seat.value = null;
  }, 300);
}



</script>

<template>
  <div class="w-full h-full parent">
    <!-- Open space -->
    <div class="div1 relative bg-background rounded-3xl hover:bg-black/80 transition-colors flex flex-col justify-center items-center">
      <span class="text-3xl font-bold z-20">Open space</span>
      <div class="flex absolute flex-col gap-2 opacity-0 hover:opacity-100 w-full h-full justify-center items-center transition-opacity">
        <button
            @click="handleAddUser({ type: 'openspace', cost: 100, features: ['monitor'], id: 'laynexx', number: 3 })"
            class="translate-y-16 p-3 font-regular bg-block rounded-full hover:bg-block/80 transition-colors">
          Открыть список клиентов
        </button>
      </div>
    </div>

    <!-- Rooms -->
    <div v-for="(room, index) in ['R1', 'R2', 'R3', 'R4']" :key="index"
         :class="`div${index + 2} relative bg-background rounded-3xl hover:bg-black/80 transition-colors flex flex-col justify-center items-center`">
      <span class="text-3xl -translate-y-4 font-bold z-20">{{ room }}</span>
      <div class="flex absolute flex-col gap-2 opacity-0 hover:opacity-100 w-full h-full justify-center items-center transition-opacity">
        <button
            @click="handleAddUser({ type: 'openspace', cost: 150, features: ['laptop'], id: `room-${index}`, number: index + 1 })"
            class="translate-y-8 p-3 font-regular bg-block rounded-full hover:bg-block/80 transition-colors">
          Открыть список клиентов
        </button>
      </div>
    </div>

    <!-- Cabins -->
    <div v-for="(cabin, index) in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']" :key="index"
         :class="`div${index + 6} relative bg-background rounded-3xl hover:bg-black/80 transition-colors flex flex-col justify-center items-center`">
      <span class="text-3xl -translate-y-4 font-bold z-20">{{ cabin }}</span>
      <div class="flex absolute flex-col gap-2 opacity-0 hover:opacity-100 w-full h-full justify-center items-center transition-opacity">
        <button
            @click="handleAddUser({ type: 'openspace', cost: 200, features: ['monitor'], id: `cabin-${index}`, number: index + 1 })"
            class="translate-y-8 p-3 font-regular bg-block rounded-full hover:bg-block/80 transition-colors">
          Открыть список клиентов
        </button>
      </div>
    </div>
  </div>


  <UserAdd
      v-if="seat && openAddUser"
      :seat="seat"
      :is-open="openAddUser"
      :id="currentId"
      @update:is-open="handleClose"
  />
</template>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}

.div1 {
  grid-column: span 6 / span 6;
  grid-row: span 4 / span 4;
}

.div2 {
  grid-column: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 5;
}

.div3 {
  grid-column: span 2 / span 2;
  grid-column-start: 3;
  grid-row-start: 5;
}

.div4 {
  grid-column: span 2 / span 2;
  grid-column-start: 5;
  grid-row-start: 5;
}

.div5 {
  grid-column: span 2 / span 2;
  grid-row: span 2 / span 2;
  grid-column-start: 7;
  grid-row-start: 4;
}

.div6 {
  grid-column-start: 7;
  grid-row-start: 1;
}

.div7 {
  grid-column-start: 8;
  grid-row-start: 1;
}

.div8 {
  grid-column-start: 8;
  grid-row-start: 2;
}

.div9 {
  grid-column-start: 7;
  grid-row-start: 3;
}

.div10 {
  grid-column-start: 8;
  grid-row-start: 3;
}

.div11 {
  grid-column-start: 7;
  grid-row-start: 2;
}
</style>