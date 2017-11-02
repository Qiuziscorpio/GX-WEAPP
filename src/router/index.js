import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Index from '@/components/Index'
import Order from '@/components/Order'
import Vip from '@/components/Vip'
import CartList from '@/components/CartList'
import CartDetails from '@/components/CartDetails'
import UserData from '@/components/UserData'
import GoodsList from '@/components/GoodsList'
import VipBooklet from '@/components/VipBooklet'
import Address from '@/components/Address'
import Integral from '@/components/Integral'
import Privilege from '@/components/Privilege'
import Login from '@/components/Login'
import Sign from '@/components/Sign'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    //设置入口 重定向index
		{ path: '/', redirect: '/Main' },
    //主页
    {
      path: '/Main',
      component: Main,
      children : [
        {
          path:'',
          component: Index
        },
        //广信商城
        {
          path:'/index',
          name:'index',
          component: Index
        },
        //我的订单
        {
          path:'/order',
          name:'order',
          component: Order
        },
        //会员中心
        {
          path:'/vip',
          name:'vip',
          component: Vip
        }
        //列表详情
        // {
        //   path:'/vip',
        //   name:'vip',
        //   component: Vip
        // },              
      ]
    },
    //购物车列表
    {
      path:'/cartList/:id',
      name:'cartList',
      component: CartList
    }, 
    //商品详情
    {
      path:'/cartdetails/:id',
      name:'cartdetails',
      component: CartDetails
    }, 
    //个人资料
    {
      path:'/userdata',
      name:'userdata',
      component: UserData
    },
    //商品列表
    {
      path:'/goodslist',
      name:'goodslist',
      component:GoodsList
    }, 
    //会员说明书
    {
      path:'/vipbooklet',
      name:'vipbooklet',
      component:VipBooklet
    },   
    //收货地址
    {
      path:'/address',
      name:'address',
      component:Address
    },   
    //我的积分
    {
      path:'/integral',
      name:'integral',
      component:Integral
    } ,   
    //我的特权
    {
      path:'/privilege',
      name:'privilege',
      component:Privilege
    },
    // 登录
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/sign',
      name:'sign',
      component:Sign
    }         
  ]
})

//全局监听路由 登录授权 
router.beforeEach(({meta,path}, from, next) => {
  var isLogin = Boolean(localStorage.getItem('userInfo'))
	if (meta && !isLogin && path !== '/login' && path !== '/sign') {
		next({ path: '/login' })
	} else {
		if (isLogin) {
			if (path == '/login' || path == '/sign') {	
				next({ path: '/' })
			} else {
        next()
      }    
    } else {
      next()
    }
  }
})

export default router