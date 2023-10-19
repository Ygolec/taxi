import {createRouter, createWebHistory} from 'vue-router'
import newPage from "./pages/newPage.vue"

export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/newPage',component:newPage}
    ]

})