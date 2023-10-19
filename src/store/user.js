import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";



export const useUserStore = defineStore('User', () => {

    const email = useLocalStorage("email", () => '');
    const name = useLocalStorage("name", () => '');


    async function login(mail, pass) {
         await fetch('/api/auth/login', {
            body: {email: mail, password: pass},
            method: 'post'
        }).then(res=>{
            email.value = res.user.email;
            name.value = res.user.name;
        })
    }
    function $reset(){

        email.value = '';

        name.value = '';
    }

    return {email,login, name,$reset}
})

