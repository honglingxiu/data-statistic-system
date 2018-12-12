import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const vueRouter = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'		// 重定向login
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['../components/pages/Login.vue'], resolve)       // 登录
    },
    {
      path: '/',
      component: resolve => require(['../components/pages/Home.vue'], resolve),      // 公共部分(顶部和左侧菜单)
      children: [
        {
          path: '/ChannelProfit',
          component: resolve => require(['../components/pages/ManageList/ChannelProfit/Index.vue'], resolve),
          children: [
             {
                 path: '/ChannelProfit',
                 name: 'ChannelProfit',
                 meta: {
                     address: '管理功能 / 渠道收益',
                     keepAlive: true,
                     level: 'ChannelProfit'
                 },
                 component: resolve => require(['../components/pages/ManageList/ChannelProfit/ChannelProfit.vue'], resolve)   // 上游管理 - 会员卡管理
             }
          ]
        },
        {
          path: '/UserManagement',
          component: resolve => require(['../components/pages/ManageList/UserManagement/Index.vue'], resolve),
          children: []
        }
      ]
    },
    {
      path: "*",
      component: resolve => require(['../components/pages/404.vue'], resolve)
    }
  ]
});

vueRouter.beforeEach((to, from, next) => {
 // next();
  //console.log(window.sessionStorage.getItem('LoginObj'));
  //window.sessionStorage.getItem('LoginObj')==null ? next() : next('/Login');

  if( window.sessionStorage.getItem('LoginObj')==null && to.name != 'Login' ){
    //vueRouter.push("/Login");
    next("/Login");
  }else {
    next();
  }
});

export default vueRouter;
