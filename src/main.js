import { createApp, ref} from "vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import BootstrapVue3 from 'bootstrap-vue-3'

import "./style.css";

import app from "./App.vue";

createApp(app).use(BootstrapVue3).mount("#app");
