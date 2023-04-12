<template>
    <div class="q-pa-md">
        <q-table
            title="Seja Bem Vindo(a) ao Sistema do Terraço da Cida"
            :rows="home"
            :columns="colunaHome"
            row-key="id"
            :pagination.sync="pagination"
            hide-bottom>
            <template v-slot:body="props">
                <q-tr :props="props" >
                    <q-td key="sistema" :props="props">
                        {{ props.row.sistema }}
                    </q-td>
                    <q-td key="acoes" :props="props">
                        <BtnLink :icon-name="props.row.icon" 
                            :tooltip="props.row.sistema" 
                            @route-push="() => router.push(props.row.link)"/>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { Home } from 'src/interfaces/interfaces';
    import { colunaHome } from 'src/layouts/colunas/colunas';
    import { user } from 'src/services/utils/utils';
    import BtnLink from '../shared/BtnLink.vue';

    const router = useRouter();
    const home = ref<Home[]>();

    const pagination = {
        rowsPerPage: 6
    }

    if(user.perfil == 'ADMINISTRADOR') {
        home.value = [
            {
                sistema: 'Clientes',
                icon: 'person',
                link: '/clientes'
            },
            {
                sistema: 'Produtos',
                icon: 'shopping_cart',
                link: '/produtos'

            },
            {
                sistema: 'Comandas',
                icon: 'note_alt',
                link: '/comandas'
            },
            {
                sistema: 'Relatórios',
                icon: 'manage_search',
                link: '/relatorios'
            },
            {
                sistema: 'Usuários',
                icon: 'people',
                link: '/usuarios'
            },
            {
                sistema: 'Logout',
                icon: 'logout',
                link: '/logout'
            },
        ];
    } else {
        home.value = [
            {
                sistema: 'Clientes',
                icon: 'person',
                link: '/clientes'
            },
            {
                sistema: 'Produtos',
                icon: 'shopping_cart',
                link: '/produtos'

            },
            {
                sistema: 'Comandas',
                icon: 'note_alt',
                link: '/comandas'
            },
            {
                sistema: 'Usuários',
                icon: 'people',
                link: '/usuarios'
            },
            {
                sistema: 'Logout',
                icon: 'logout',
                link: '/logout'
            },
        ];
    }
    
</script>
