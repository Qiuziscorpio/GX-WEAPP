<template>
  <div>
      <div class="content form">
          <div class="forminput-item" >
              <label class="label">手机号</label>
              <input class="input" placeholder="请输入手机号" v-model="userInfo.userName">
          </div>
          <div class="forminput-item">
              <label class="label">密码</label>
              <input class="input" type="password" placeholder="请输入密码" v-model="userInfo.password" >
          </div>                                                                                  
      </div>
      <div class="user-btn" >
       <button class="submit" v-on:click="submit">登录</button> 
      </div> 
      <div class="user-btn" style="text-align: right;">
        <router-link  :to="{name: 'sign'}"> 前去注册 ></router-link> 
      </div>       
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        userName: '',
        password: ''
      }
    }
  },
  methods:{
    submit:function() {
      var self = this
      if(this.userInfo.userName === '' && this.userInfo.password === '') {
        Toast({
          message: '用户名和密码必填',
          iconClass: 'icon icon-success'
        })
        return false
      }     
      this.$http.post(`${self.api}user/login.do`,this.userInfo).then((response) => {               
          if(response.body.state === 'SUCCESS') {
            localStorage.setItem('userInfo', JSON.stringify(response.body.user))
            self.$router.go({name: 'vip'})
          } else {
            Toast({
              message: '登录失败',
              iconClass: 'icon icon-success'
            })
          }
        }),(response)=>{
            console.log('请求出错')
        }     
    }
  },
  mounted() {
    if(Boolean(localStorage.getItem('userInfo'))){
      this.$router.go({name: 'vip'})
    }
  }               
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../assets/sass/popup.scss"
</style>