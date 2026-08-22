import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import { router } from './router/router.ts'
import { createPinia } from 'pinia'
import { useTheme } from './composables/useTheme'

const app = createApp(App)

app.use(createPinia())

app.use(router)

// 初始化主题（在 app 挂载前应用，避免闪烁）
const { initTheme } = useTheme()
initTheme()

app.mount('#app')
