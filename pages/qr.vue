<script setup lang="ts">
import {QrcodeStream, type DetectedBarcode} from 'vue-qrcode-reader'
import {useAlert} from "~/composables/useAlert";
import {House} from "lucide-vue-next";
import {validate} from "uuid";

const alert = useAlert();
let active = true;

function onDetect(detectedCodes: DetectedBarcode[]) {
  if (!active || detectedCodes.length === 0) return;
  const code = detectedCodes[0].rawValue.toLowerCase();

  if (validate(code)) {
    navigateTo(`/${code}-reservation`);
  } else {
    alert.error("Неправильный QR, повторите попытку ещё раз)");
    active = false;
    detectedCodes.length = 0;
    setTimeout(() => {
      active = true;
    }, 3500);
  }
}

</script>

<template>
  <div class="max-w-screen-sm md:min-w-screen bg-black mx-auto flex w-full h-full justify-center items-center align-middle">

    <div class="bg-block rounded-3xl p-6 flex flex-col justify-center items-center text-start max-w-[90vw] md:max-w-screen-sm max-h-md">
      <div class="w-full text-start mb-3">
        <h1 class="text-3xl font-bold tracking-tighter text-white">T-lounge</h1>
        <p class="text-sm text-zinc-400">Сканер QR кодов</p>
      </div>

      <qrcode-stream class=" max-w-[70vw] m-6" @detect="onDetect"/>

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