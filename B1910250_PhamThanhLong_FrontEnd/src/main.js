import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";

import './assets/js/jquery-2.2.4.min.js';
import './assets/js/elevatezoom-master/jquery.elevatezoom.js';
import './assets/js/bootstrap/bootstrap.min.js';
import './assets/js/carousel/owl.carousel.js';
import './assets/js/main-home';

import './assets/admin/css/bootstrap/bootstrap.min.css';
import './assets/admin/css/bootstrap/bootstrap-theme.min.css';
import './assets/admin/reset.css';
import './assets/admin/css/font-awesome/css/font-awesome.min.css';
import './assets/admin/style-admin.css';
import './assets/admin/responsive.css';

import './assets/css/bootstrap/bootstrap-theme.min.css';
import './assets/css/bootstrap/bootstrap.min.css';
import './assets/css/carousel/owl.carousel.css';
import './assets/css/carousel/owl.theme.css';
import './assets/css/font-awesome/css/font-awesome.min.css';
import './assets/reset.css';
import './assets/responsive.css';
import './assets/style.css';
createApp(App).use(router).mount("#app");
