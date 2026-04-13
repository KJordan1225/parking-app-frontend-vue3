import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

import App from './App.vue'
import router from './routes'

const app = createApp(App)

app.use(createPinia())
app.use(Toast)
app.use(router)
app.mount('#app')


