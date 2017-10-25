<template>
    <div class="bg-grey2">
        <div class="user">
            <div class="form">
                <div class="forminput-item">
                    <label class="label">昵称</label>
                    <input class="input" placeholder=""  v-model="user.wName">
                </div>
                 <div class="forminput-item">
                    <label class="label">手机号码</label>
                    <input class="input" placeholder="请输入手机号码" v-model="user.phone">
                </div>              
            </div>
            <div class="user-btn"> 
                <button class="submit">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'userdata',
        data() {
            return {
                user:{}
            }
        },
        methods:{
            loadData:function(self){
                self.$http.get(self.api+'user/getSession.do').then((response) => {
                    self.user=response.body.user

                }),(response)=>{
                    console.log('请求出错')
                }
            }
        },
        mounted(){
            let self=this
            self.loadData(self)
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
     @import "../assets/sass/forms.scss"
</style>