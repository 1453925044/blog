import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index/index'], resolve),
    meta: {
      title: '魏先生博客首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: resolve => require(['@/views/about/index'], resolve),
    meta: {
      title: '关于我'
    }
  },
  {
    path: '/diary',
    name: 'learn',
    component: resolve => require(['@/views/diary/index'], resolve),
    meta: {
      title: '个人日记'
    }
  },
  {
    path: '/learn',
    name: 'learn',
    component: resolve => require(['@/views/learn/index'], resolve),
    meta: {
      title: '学无止境'
    }
  },
  {
    path: "/blog",
    name: '我的博客',
    component: resolve => require(['@/views/blog/index'], resolve),
    children: [
      {
        path: '/',
        redirect: 'list'
      },
      {
        path: "list",
        name: '博客列表',
        component: resolve => require(['@/views/blog/list/index'], resolve),
        meta: {
          title: "博客列表"
        }
      },
      {
        path: "detail",
        name: '文章详情',
        component: resolve => require(['@/views/blog/detail/index'], resolve),
        meta: {
          title: "文章详情"
        }
      },
      {
        path: "create",
        name: '文章发布',
        component: resolve => require(['@/views/blog/create/index'], resolve),
        meta: {
          title: "文章发布"
        }
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  routes,
  // 路由切换时，更新显示坐标
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局路由守
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: 回调函数: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const title = to.meta && to.meta.title;
  /* 路由发生变化修改页面title */
  if (title) {
    document.title = title;
  }
  next();
})

// 跳转路由回到窗口起始位置
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
// 解决路由老版本的错误
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
