import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// eslint-disable-next-line import/no-unresolved
import Canales from '../views/Canales.vue';
// eslint-disable-next-line import/no-unresolved
import Canal from '../views/Canal.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/canales',
    name: 'Canales',
    component: Canales,
  },
  {
    path: '/canal/:id',
    name: 'Canal',
    component: Canal,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
