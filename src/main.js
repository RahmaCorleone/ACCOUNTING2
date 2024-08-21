import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS (optional, for components requiring JavaScript)
import 'bootstrap/dist/js/bootstrap.bundle.min';
createApp(App).use(router).use(store).mount('#app')
