<script setup lang="ts">
import { ref, computed } from 'vue';
import {adminLogin, type Admin} from "~/client";


const alert = useAlert();

// TODO: add email validation (уже хз))
const email = ref<string>('');
const password = ref<string>('');

const account = ref<Admin>()

const handleLogin = async () => {
  /*
  console.log(email.value);
  console.log(password.value);
  if (email.value === 'laynexx@laynexx.lxx' && password.value === '1234'){
    localStorage.setItem('token', JSON.stringify("tokentoken"));
    alert.success("Успешный вход!");
    navigateTo('/')
    return
  }
   */

  try{
    const response = await adminLogin({
      body: {
        email: email.value,
        password: password.value,
      }
    })
    account.value = response.data?.admin
    if (response.data != undefined) {
      localStorage.setItem('user', JSON.stringify(response.data?.admin))
      localStorage.setItem('token', response.data?.token);
      alert.success("Успешный вход!");
      navigateTo('/')
      return
    } else if (response.status == 400 || response.status == 404 || response.status == 401) {
      console.log(response.error)
      alert.error(response.error.description);
    } else {
      console.log(response.error);
      alert.error("Неизвестная ошибка");
    }
  } catch (error) {
    console.log(error);
    alert.error("Неизвестная ошибка");
  }
}

definePageMeta({
  layout: false,
})



const verified = computed(() => {
  return email.value !== '' && email.value.includes('@') && password.value !== '';
});
</script>

<template>
  <div class="flex flex-col w-full h-full items-center justify-center p-4">
    <img src="/logo.png" class="w-[100px]" alt="logo"/>
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-4xl">T-lounge</h1>
      <span class="text-lg">Лучший коворкинг в вашем городе</span>
    </div>


    <div class="mt-10 p-4 gap-4 rounded-2xl flex flex-col w-full md:w-[600px] bg-block">
      <h3 class="3xl font-medium">Войти</h3>

      <AuthInput label="Почта" type="email" v-model="email"/>
      <AuthInput label="Пароль" type="password" v-model="password"/>

      <button
          @click="handleLogin"
          :disabled="!verified"
          class="p-2 rounded-2xl text-black"
          :class="!verified ? 'bg-contrast/50' : 'bg-contrast'"
      >
        Войти
      </button>
    </div>
  </div>
</template>
