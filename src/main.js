import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
// Leaflet

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

import '@mdi/font/css/materialdesignicons.css'


const vuetify = createVuetify({
    components,
    directives,
    labsComponents,
    icons: {
        defaultSet: 'mdi',
    },
})

createApp(App).use(vuetify,router).mount('#app')

// createApp(App).mount('#app')
