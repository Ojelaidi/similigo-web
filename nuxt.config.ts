// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-primevue'
    ],
    primevue: {
        usePrimeVue: true
    },
    css: [
        'assets/main.css',
        'primeflex/primeflex.css',
        'primevue/resources/themes/lara-light-teal/theme.css',
        'vue-json-pretty/lib/styles.css',
        'primeicons/primeicons.css'
    ]
})
