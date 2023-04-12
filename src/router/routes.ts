import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/LayoutLogin.vue'),
    children: [{ path: '', component: () => import('pages/login/Index.vue'), name: 'login'}],
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { 
        path: '', component: () => import('pages/home/Index.vue')
      },

      { 
        path: 'clientes/', component: () => import('pages/clientes/Index.vue'),
      },
      { 
        path: 'clientes/cadastrar/', component: () => import('pages/clientes/Cadastrar.vue')
      },
      { 
        path: 'clientes/editar/:id', component: () => import('pages/clientes/Editar.vue')
      },

      { 
        path: 'produtos/', component: () => import('pages/produtos/Index.vue'),
      },
      { 
        path: 'produtos/cadastrar', component: () => import('pages/produtos/Cadastrar.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'produtos/editar/:id', component: () => import('pages/produtos/Editar.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'produtos/categorias', component: () => import('pages/produtos/categorias/Index.vue'), 
        meta: { requiresAdmin: true }
      },
      { 
        path: 'produtos/categorias/cadastrar', component: () => import('pages/produtos/categorias/Cadastrar.vue'),
        meta: { requiresAdmin: true }
      },

      { 
        path: 'comandas/', component: () => import('pages/comandas/Index.vue'),
      },
      { 
        path: 'comandas/cadastrar', component: () => import('pages/comandas/Cadastrar.vue'),
      },
      { 
        path: 'comandas/:id', component: () => import('pages/comandas/Detalhar.vue'),
      },
      { 
        path: 'comandas/:id/lancamento', component: () => import('pages/comandas/LancarProduto.vue'),
      },
      { 
        path: 'comandas/:id/pagamento', component: () => import('pages/comandas/CadastrarPagamento.vue'),
      },
      
      { 
        path: 'relatorios/', component: () => import('pages/relatorios/Index.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'relatorios/pagamentos/doMes/:mes', component: () => import('src/pages/relatorios/PagamentosDoMes.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'relatorios/pagamentos/doDia/:data', component: () => import('src/pages/relatorios/PagamentosDoDia.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'relatorios/produtos/doMes/:mes', component: () => import('src/pages/relatorios/ProdutosDoMes.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'relatorios/produtos/doDia/:data', component: () => import('src/pages/relatorios/ProdutosDoDia.vue'),
        meta: { requiresAdmin: true }
      },

      { 
        path: 'usuarios/', component: () => import('pages/usuarios/Index.vue'),
      },
      { 
        path: 'usuarios/cadastrar', component: () => import('pages/usuarios/Cadastrar.vue'),
        meta: { requiresAdmin: true }
      },
      { 
        path: 'usuarios/editar/:id', component: () => import('pages/usuarios/Editar.vue'),
        meta: { requiresOwnUser: true }
      },
    ],
  },

  {
    path: '/logout',
    component: () => import('layouts/LayoutLogin.vue'),
    children: [{ path: '', component: () => import('pages/login/Logout.vue'), name: 'logout' }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
