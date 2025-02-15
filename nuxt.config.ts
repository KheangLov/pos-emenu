// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
          async: true,
        },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_APP_URL,
      botToken: process.env.NUXT_BOT_TOKEN,
      chatId: process.env.NUXT_CHAT_ID,
    },
  },
})
