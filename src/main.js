import { createApp } from 'vue';
import { createPinia } from 'pinia';
import "./assets/tailwind.css";
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/tailwind-light/theme.css';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Tooltip from 'primevue/tooltip';
import Chip from 'primevue/chip';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ToastService from 'primevue/toastservice';
import TitleComponent from '@/components/TitleComponent.vue';
const app = createApp(App);
const pinia = createPinia();

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Avatar', Avatar);
app.component('Chip', Chip);
app.component('Menu', Menu);
app.component('TitleComponent', TitleComponent);
app.directive('tooltip', Tooltip);

app.use(router);
app.use(PrimeVue);
app.use(pinia);
app.use(ToastService);
app.mount('#app');
