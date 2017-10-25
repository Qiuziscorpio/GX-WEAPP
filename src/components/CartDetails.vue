<template>
    <div class="flex-vertical">
        <!-- 购物车 -->
        <Vcart></Vcart>      
        <!-- 支付弹窗  -->
        <Vtemplate :popuptype="popuptype" v-if="ispopup"></Vtemplate>
        <!-- 选择规格  -->
        <Vspecspopup v-if="showpecspopup" :specspopupdata="cartdetails" v-on:isspecspopup="isspecspopup"></Vspecspopup>
        <div class="cartdetails flex-vertical-content">    
            <div class="cartdetails-head">
                <div class="banner">
                    <img :src="api + cartdetails.productPic">
                </div>
                <div class="cartdetails-title">
                    <span class="price"><small>¥ </small>{{cartdetails.price/100}} </span>  <span class=""> {{cartdetails.productName}}</span>
                </div>
                <div class="cartdetails-attri" v-on:click="isspecspopup">
                    <span>选择规格 </span> <span>></span>
                </div>
            </div>
            <div class="cartdetails-content">
                <div class="title">
                --- 商品详情 ---
                </div>
				<div v-html="cartdetails.content"></div>
				
            </div>
        </div>
        <div class="cartdetails-foot">
            <div class="buy-btn" v-on:click="isspecspopup"> 
                我要购买
            </div>
            <div class="link-btn">
                联系客服
            </div>            
        </div>
    </div>

</template>

<script>

    import Vtemplate from './module/Template.vue'
    import Vcart from './module/Cart.vue'
    import Vspecspopup from './module/Specspopup.vue'

    
    export default {
        name:'cartdetails',
        data() {
            return {
                cartdetails:{},
                ispopup:false,
                popuptype:"支付方式",
                showpecspopup:false
            }
        },
        components:{
            Vtemplate,
            Vcart,
            Vspecspopup
        },
        methods:{
            //选择支付方式
            paySelect:function(){
                let self=this
                self.ispopup=true
            },
            isspecspopup:function(){
                this.showpecspopup=!this.showpecspopup
            },
            loadData:function(self){
                 self.$http.get(self.api + 'product/find.do?productid='+self.$route.params.id,).then((response) => {
                     self.cartdetails=response.data.data
                    
                     self.cartdetails.versions.map(function(v,i){
                        self.$set(v,'checkbox',false)
                     })
                     self.cartdetails.colors.map(function(v,i){
                        self.$set(v,'checkbox',false)
                     })
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
<style lang="sass" >
   @import "../assets/sass/cartdetails.scss"
   
</style>