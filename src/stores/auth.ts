import { defineStore } from 'pinia'
import { User } from 'src/interfaces/interfaces'
import { user } from 'src/services/utils/utils';

export const auth = defineStore('user', {
    
    state: () => ({
        user: {
            data: {} as User,
            token: sessionStorage.getItem('TOKEN')
        }
    }),

    actions: {
        async login(response: any) {
            console.log(response.data)
            this.user.data = response.data.login;
            this.user.token = response.data.token;
            sessionStorage.setItem('TOKEN', response.data.token);
            sessionStorage.setItem('IDUSER', response.data.login.id);
            sessionStorage.setItem('PERFILUSER', response.data.login.perfil);
            user.id = response.data.login.id;
            user.perfil = response.data.login.perfil;
            await this.router.push({path: '/'});
        },

        async logout() {
            this.user.data = {} as User
            this.user.token = null
            sessionStorage.clear();
            await this.router.push({ path: '/login' });
        },
    }
})