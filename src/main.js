import { createApp } from 'vue';
import { createPinia } from 'pinia';
import "./assets/tailwind.css";
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/tailwind-light/theme.css';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Tooltip from 'primevue/tooltip';
import Chip from 'primevue/chip';

const app = createApp(App)
const pinia = createPinia()
app.component('Avatar', Avatar)
app.component('Chip', Chip)
app.component('Menu', Menu)
app.directive('tooltip', Tooltip)
app.use(router)
app.use(PrimeVue)
app.use(pinia)

app.mount('#app')