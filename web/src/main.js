import { createApp } from 'vue'
import App from './App.vue'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // <fa :icon="coffe" />
import { fab } from '@fortawesome/free-brands-svg-icons' // <fa :icon="['fab', 'youtube']" />

library.add(fas, fab)

// Notification
import Toaster from "@meforma/vue-toaster";

createApp(App).use(Toaster, {
  position: "top",
  maxToasts: 3,
}).component('fa', FontAwesomeIcon).mount('#app')