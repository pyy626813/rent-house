var routers = [{
  path:'/',
  redirect:'/search'
}, {
  name: 'menu',
  path: '/menu',
  component(resolve) {
    require(['../views/menu.vue'], resolve)
  },
  children: [
    {
      name: 'search',
      path: '/search',
      component(resolve) {
        require(['../views/search.vue'], resolve)
      }
    },
    {
      name: 'myhouse',
      path: '/myhouse',
      component(resolve) {
        require(['../views/myhouse.vue'], resolve)
      }
    },
    {
      name: 'setting',
      path: '/setting',
      component(resolve) {
        require(['../views/setting.vue'], resolve)
      }
    }
  ]
}, {
  name: 'detail',
  path: '/detail',
  component(resolve) {
    require(['../views/detail.vue'], resolve)
  }
}, {
  name: 'addHouse',
  path: '/addHouse',
  component(resolve) {
    require(['../views/addHouse.vue'], resolve)
  }
}];
export default routers;
