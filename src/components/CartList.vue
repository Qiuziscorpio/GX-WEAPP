<template>
    <div>
        <!-- 支付弹窗  -->
        <Vtemplate :popuptype="popuptype" v-if="ispopup" v-on:ispopup="paySelect"></Vtemplate>
        <div class="flex-vertical">  
                <div class="flex-vertical-content bg-grey2">
                    <div class="cartlist">
                        <div class="cartlist-head" v-on:click="isdeletecart"> 
                            编辑删除
                        </div>
                        <div>
                            <div class="cartlist-item" v-for="data in carlistdata">
                                <div class="deletecartico" v-if="isdeleticon" v-on:click="deletecart(data.productId)">
                                    <i class="icon iconfont icon-guanbi"></i>
                                </div>
                                <div class="img">
                                    <img :src="data.productPic">
                                </div>
                                <div class="content">
                                    <div>
                                        <div class="title">{{data.productName}}</div>
                                        <div class="price">¥ {{data.price}}</div>
                                    </div>
                                    <div class="norms">
                                        <div>
                                            商品规格：{{data.versionName}}，{{data.colorName}}
                                        </div>
                                        <div class="numhandle">
                                            <span v-on:click="subtractNum(data.productId )"> － </span>
                                            <span class="num"> {{data.count}} </span>
                                            <span v-on:click="addNum(data.productId)"> ＋ </span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cartlist-cost"> 
                            <div class="cost-item">
                                <div>
                                    快递费用
                                </div>
                                <div>
                                    ¥ 0
                                </div>
                            </div>
                            <div class="cost-item">
                                <div>
                                    优惠信息
                                </div>
                                <div>
                                    会员优惠
                                </div>
                            </div> 
                            <div class="cost-item">
                                <div>
                                    优惠卷信息
                                </div>
                                <div>
                                    无
                                </div>
                            </div>                                                
                        </div>
                    </div>            
                </div>
                <div class="cartlist-foot">
                    <div class="label">
                        <span class="title">支付金额：</span>
                        <span class="price">
                            ¥ 2135
                        </span>
                    </div>
                    <div class="pay-btn" v-on:click="paySelect"> 
                        支付
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import Vtemplate from './module/Template.vue'
    export default {
        name:'cartlist',
        components:{
            Vtemplate
        },
        data() {
            return {
                id: '',
                isdeleticon:false,
                ispopup:false,
                popuptype:"支付方式",
                carlistdata:''
            }
        },
        components:{
            Vtemplate
        },
        methods:{
            //选择支付方式
            paySelect:function(){
                let self=this
                self.ispopup=!self.ispopup
                // self.$http.post(`${self.api}/car/payOrder/pay.do?orderId=1234564852&txnAmt=36`).then((response) => {
                //     console.log(response, 'response')
                // })
            },
            isdeletecart:function(){
                console.log('oo')
                self.isdeleticon=true
            },
            deletecart:function(id){
                let self = this
                self.$http.post(self.api+'car/delCar.do?carId='+id).then((response) => {
                    Toast({
                        message: '删除成功',
                        iconClass: 'icon icon-success'
                     });      
                     self.loadData(self)               
                }),(response)=>{
                    console.log('请求出错')
                }                
            },
            subtractNum:function(id){   
              let self=this             
                self.carlistdata.map(function(v,i){
                    console.log(v.count,'subtractNumcount')
                    if(v.count==1){
                        return false;
                    }
                     --v.count
                     return
                })
            },
            addNum:function(id){
                let self=this
                self.carlistdata.map(function(v,i){
                     ++v.count
                })
            },
            loadData:function(self){
                // self.$http.post(self.api+'car/list.do?userId='+self.userId).then((response) => {
                //     console.log('请求成功')
                //     console.log(response.data.data,'response')
                //     self.carlistdata=response.data.data
                // }),(response)=>{
                //     console.log('请求出错')
                // }

                self.$http.post(`${self.api}myOrder/OrderInfo.do?userId=${self.userId}&orderId=${this.id}`).then((response) => {
                    console.log('请求成功')
                    console.log(response.data.data,'response')
                   // self.carlistdata=response.data.data
                }),(response)=>{
                    console.log('请求出错')
                }    

            }
        },
        mounted(){
            let self=this
            this.id = this.$route.params.id
            self.loadData(self)
        }       
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../assets/sass/cartlist.scss"
</style>