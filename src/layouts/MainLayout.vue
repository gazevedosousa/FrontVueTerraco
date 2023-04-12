<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-9">
        <q-toolbar-title>
          Terraço da Cida
        </q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      bordered
      show-if-above

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :width="300"
      :breakpoint="500"
      class="bg-grey-3"
    >
      <q-list>
        <Links
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Links, { LinkInterface } from 'src/components/shared/Links.vue'
import { user } from 'src/services/utils/utils';
let essentialLinks : LinkInterface[] = [];

if(user.perfil == 'ADMINISTRADOR'){
  essentialLinks = [
    {
      title: 'Home',
      caption: 'Página Inicial',
      icon: 'home',
      link: '/'
    },
    {
      title: 'Clientes',
      caption: 'Adicionar/Editar/Visualizar',
      icon: 'person',
      link: '/clientes'
    },
    {
      title: 'Produtos',
      caption: 'Adicionar/Editar/Visualizar',
      icon: 'shopping_cart',
      link: '/produtos'
    },
    {
      title: 'Comandas',
      caption: 'Abrir/Registrar Pedido/Pagar',
      icon: 'note_alt',
      link: '/comandas'
    },
    {
      title: 'Relatórios',
      caption: 'Visualizar/Imprimir/Exportar',
      icon: 'manage_search',
      link: '/relatorios'
    },
    {
      title: 'Usuários',
      caption: 'Adicionar/Excluir/Alterar Senha',
      icon: 'people',
      link: '/usuarios'
    },
    {
      title: 'Logout',
      caption: 'Sair do sistema',
      icon: 'logout',
      link: '/logout'
    },
  ];
} else {
  essentialLinks = [
    {
      title: 'Home',
      caption: 'Página Inicial',
      icon: 'home',
      link: '/'
    },
    {
      title: 'Clientes',
      caption: 'Adicionar/Editar/Visualizar',
      icon: 'person',
      link: '/clientes'
    },
    {
      title: 'Produtos',
      caption: 'Adicionar/Editar/Visualizar',
      icon: 'shopping_cart',
      link: '/produtos'
    },
    {
      title: 'Comandas',
      caption: 'Abrir/Registrar Pedido/Pagar',
      icon: 'note_alt',
      link: '/comandas'
    },
    {
      title: 'Usuários',
      caption: 'Adicionar/Excluir/Alterar Senha',
      icon: 'people',
      link: '/usuarios'
    },
    {
      title: 'Logout',
      caption: 'Sair do sistema',
      icon: 'logout',
      link: '/logout'
    },
  ];
}




const drawer = ref(false)
const miniState = ref(true)

</script>
