import { defineNuxtPlugin } from '#app'
import { useAlert } from '~/composables/useAlert'

export default defineNuxtPlugin((nuxtApp) => {
    const alert = useAlert()
    nuxtApp.provide('alert', alert)
})