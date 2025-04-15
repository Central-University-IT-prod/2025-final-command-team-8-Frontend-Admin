<script setup lang="ts">
import {getClientById} from "~/client";

const props = defineProps({
  opened: Boolean,
  id : {
    type: String,
    required: true
  }
})

const handeSubmit = async () =>{
  try{
    const response = await getClientById({
      path: {
        client_id: props.id
      }
    })
    console.log(response.data)
  } catch (e) {
    console.error(e)
  }


}

</script>

<template>
  <teleport class="absolute" to="body">
  <div v-if="props.opened" class=" w-screen h-screen flex justify-center items-center">
    <div class="absolute top-0  left-0bg-black/20 backdrop-blur-xl"/>

        <teleport to="html">
          <div class="absolute bg-block rounded-3xl p-4">
            <h3>Изменить пароль</h3>
            <h1>qwepqlre[</h1>
          </div>
        </teleport>
  </div>
  </teleport>
</template>

<style scoped>

</style>