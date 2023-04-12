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
            this.user.data = response.data;
            this.user.token = response.data.token;
            sessionStorage.setItem('TOKEN', response.data.token);
            sessionStorage.setItem('IDUSER', response.data.id);
            sessionStorage.setItem('PERFILUSER', response.data.perfil);
            user.id = response.data.id;
            user.perfil = response.data.perfil;
            await this.router.push({path: '/'});
        },

        async logout() {
            this.user.data = {} as User
            this.user.token = null
            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('IDUSER');
            sessionStorage.removeItem('PERFILUSER');
            sessionStorage.clear();
            await this.router.push({ path: '/login' });
        },
    }
})