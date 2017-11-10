<template>
  <div>
      <div class="content form">
          <div class="forminput-item" >
              <label class="label">用户名</label>
              <input class="input" placeholder="请输入用户名" v-model="userInfo.userName" maxlength="11">
          </div>      
          <div class="forminput-item" >
              <label class="label">手机号</label>
              <input class="input" type="number" placeholder="请输入手机号" v-model="userInfo.phone" maxlength="11">
          </div>
          <div class="forminput-item">
              <label class="label">密码</label>
              <input class="input" type="password" placeholder="请输入至少6位数" v-model="userInfo.password" >
          </div>                                                                                  
      </div>
      <div class="user-btn" >
       <button class="submit"  v-on:click="submit">注册</button> 
      </div>   
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'sign',
  data () {
    return {
      userInfo: {
        userName: '',
        password: '',
        phone:''
      },
      isSubmit:true
    }
  },
  methods:{
    submit:function() {
      var self = this
      if(this.userInfo.password.length<6) {
        Toast({
          message: '密码最小长度为6',
          iconClass: 'icon icon-success'
        });     
        return false 
      }
      if(this.userInfo.phone.length!=11) {
        Toast({
          message: '号码格式不对',
          iconClass: 'icon icon-success'
        });     
        return false 
      }    
      if(this.userInfo.password === ''&& this.userInfo.userName === ''&& this.userInfo.phone ==='') {
        Toast({
          message: '格式错误',
          iconClass: 'icon icon-success'
        });        
        return false 
      }        
      this.$http.post(`${self.api}user/register.do`,this.userInfo).then((response) => {                     
          if(response.body.state === 'SUCCESS') {
            Toast({
              message: '注册成功',
              iconClass: 'icon icon-success'
            })            
            self.$router.go({name: 'login'})
          } else {
            Toast({
              message: response.body.message,
              iconClass: 'icon icon-success'
            })
          }
        }),(response)=>{
            console.log('请求出错')
        }     
    }
  }                  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../assets/sass/popup.scss"
</style>