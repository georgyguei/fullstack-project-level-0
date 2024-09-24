import { createApp } from 'vue';
import App from './App.vue';
import './styles/globals.css';

// main.js

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as MdIcons from 'oh-vue-icons/icons/md';
import { router } from './router';

const Md = Object.values({ ...MdIcons });
addIcons(...Md);

const app = createApp(App);
app.use(router);
app.component('v-icon', OhVueIcon);
app.mount('#app');
