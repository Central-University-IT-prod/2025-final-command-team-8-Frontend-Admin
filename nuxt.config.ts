// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  css: [
      'assets/css/main.css'
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  ssr: false,
  app: {
    head: {
      title: "T-Lounge Admin",
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
      ]
    }
  }
})