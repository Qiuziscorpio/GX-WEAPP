<template>
    <div class="vip bg-grey2">
        <!-- 签到提醒  -->
        <Vtemplate :popuptype="popuptype" v-if="ispopup" v-on:ispopup="handlSignIn"></Vtemplate>    
        <div class="vip-head">
            <div class="vip-card">
                <img src="../assets/vipimg.png">
                <span class="vipnum">{{user.memberNumber}}</span>
            </div>
            <div class="vip-nav">
                <div class="nav-item">
                   <router-link :to="{name:'privilege'}" >
                            <div class="iconimg iconimg1">
                                <span class="num"> 99</span>
                            </div>
                            <span>优惠卷</span>                
                    </router-link>
                </div>
                 <div class="nav-item">
                    <router-link :to="{name:'integral'}" >
                            <div class="iconimg iconimg2" v-if="user.score!=''">
                                <span class="num"> {{user.score}}</span>
                            </div>
                            <span>积分</span>                
                    </router-link>
                </div>
                <div class="nav-item">
                    <div v-on:click="handlSignIn">
                            <div class="iconimg iconimg3">
                                
                            </div>
                            <span>签到</span>           
                    </div>
                   
                </div>                               
            </div>
        </div>
        <div class="vip-content">
                 <router-link :to="{name:'privilege'}" class="vip-item">
                    <div>
                    我的特权
                    </div>
                    <div>
                        >
                    </div>
                </router-link>
                 <router-link :to="{name:'privilege'}" class="vip-item">
                    <div>
                    我的奖品
                    </div>
                    <div>
                        >
                    </div>
                </router-link>
                <router-link :to="{name:'userdata'}" class="vip-item">
                    <div>
                    个人资料
                    </div>
                    <div>
                        >
                    </div>
                </router-link>
                 <router-link :to="{name:'address'}" class="vip-item">
                    <div>
                    收货地址
                    </div>
                    <div>
                        >
                    </div>
                </router-link>
                <router-link :to="{name:'vipbooklet'}" class="vip-item">
                    <div>
                    会员卡说明
                    </div>
                    <div>
                        >
                    </div>
                </router-link>                

        </div>
    </div>
</template>

<script>
    import Vtemplate from './module/Template.vue'
    export default {
        name:'vip',
        data() {
            return {
                ispopup:false,
                popuptype:"提醒",
                user:{}
            }
        },
        components:{
            Vtemplate
        },        
        methods:{
            handlSignIn:function(){
                let self=this
                self.ispopup=!self.ispopup
            },
            loadData:function(self){
                self.$http.get(self.api+'user/getSession.do').then((response) => {
                    self.user=response.body.user
                    localStorage.setItem('memberNumber',response.body.user.memberNumber)
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
     @import "../assets/sass/vip.scss"
</style>