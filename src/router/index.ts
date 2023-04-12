import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  routerKey,
} from 'vue-router';
import { auth } from 'src/stores/auth';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const getUser = auth()
    
    if(to.meta.requiresAuth && !getUser.user.token) next({ path: '/login' });

    else if(to.meta.requiresAdmin && getUser.user.data.perfil != "ADMINISTRADOR") next({ path: '/' });

    else if(to.meta.requiresOwnUser && getUser.user.data.perfil != "ADMINISTRADOR" &&
     getUser.user.data.id != parseInt((to.params.id as string))) next({ path: '/' });

    else next();
  })

  return Router;
});
