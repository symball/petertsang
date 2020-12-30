import { createApp } from 'vue'
import App from './App.vue'
import './assets/sass/main.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faWindowClose)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
