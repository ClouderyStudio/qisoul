import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import { router } from './router/router.ts'
import Casdoor from 'casdoor-vue-sdk'
import { createPinia } from 'pinia'

const casdoorConfig = {
    serverUrl: 'https://auth.cldery.com',
    clientId: '092662583ec82c3f3a96',
    appName: 'app-built-in',
    organizationName: 'built-in',
}

const app = createApp(App)

app.use(createPinia())

app.use(Casdoor, casdoorConfig)

app.use(router)

app.mount('#app')
