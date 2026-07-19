import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import { router } from './router/router.ts'
import Casdoor from 'casdoor-vue-sdk'
import { createPinia } from 'pinia'
import { useTheme } from './composables/useTheme'

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

// 初始化主题（在 app 挂载前应用，避免闪烁）
const { initTheme } = useTheme()
initTheme()

app.mount('#app')
