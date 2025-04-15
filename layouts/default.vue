<script setup lang="ts">

const routes = [
//  {name : "Главная", icon : Home, route: "/home"},
//  {name : "Брони", icon : AlignRight, route: "/books"},
//  {name : "История", icon : Clock, route: "/history"},
//  {name : "Профиль", icon : AtSign, route: "/profile"},
]

const route = useRoute()
</script>

<template>
  <div class="h-screen w-screen ">
    <slot/>
    <div class="w-full flex justify-center">
      <div class="absolute  flex bottom-4 w-full max-w-[300px] justify-between gap-4 text-center">
        <div
            v-for="(item, index) in routes"
            :key="index"
            class="flex flex-col text-center justify-normal items-center text-sm gap-2"
            :class="route.path === item.route ? 'text-link' : 'text-white/50' "
            >
          <component :is="item.icon"/>
          <span>{{ item.name }}</span>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>