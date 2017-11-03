<template>
    <div>


        <mt-navbar v-model="selected">
            <mt-tab-item id="1">全部订单</mt-tab-item>
            <mt-tab-item id="2">待付款</mt-tab-item>
            <mt-tab-item id="3">待发货／发货</mt-tab-item>
        </mt-navbar>
        <div class="bg-grey2">
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="order-content" v-for="data in orderlistdata" key="d">
                    <div class="order-head">
                        <div class="text-success" v-if="data.stauts==0">
                            待支付
                        </div>                    
                        <div class="text-warning" v-if="data.stauts==1">
                            待发货
                        </div>
                        <div class="text-blue" v-if="data.stauts==2">
                            待收货
                        </div>
                        <div>
                            总额：{{data.price}}
                            订单编号：{{data.orderCode}}
                        </div>
                    </div>
                    <div>
                        <div class="cartlist">
                            <div class="cartlist-item" v-for="data2 in data.products" key="d">
                                <div class="img">
                                    <img :src="api2+data2.productPic">
                                </div>
                                <div class="content">
                                    <div>
                                        <div class="title">{{data2.productName}}</div>
                                        <div class="price">¥ {{data2.price}}</div>
                                    </div>
                                    <div class="norms">
                                        <div>
                                            商品规格：{{data2.versionName}}，{{data2.colorName}}
                                        </div>
                                        <div class="numhandle">
                                                x {{data2.count}}
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </div>  
                        <div class="cartlist-foot">
                            <div class="label" v-if="data.stauts==0" v-on:click="cancelOrder(data.orderId)">
                                <span class="title">取消订单</span> 
                            </div> 
                            <router-link :to="{name:'cartList',params:{id:data.orderId}}" class="pay-btn" v-if="data.stauts==0" > 支付</router-link>
                        </div>                                           
                    </div>
                </div>               
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="order-content" v-for="data in orderlistdata" key="d">
                    <div class="order-head">
                        <div class="text-success" v-if="data.stauts==0">
                            待支付
                        </div>                    
                        <div class="text-warning" v-if="data.stauts==1">
                            待发货
                        </div>
                        <div class="text-blue" v-if="data.stauts==2">
                            待收货
                        </div>
                        <div>
                            总额：{{data.price}}
                            订单编号：{{data.orderCode}}
                        </div>
                    </div>
                    <div>
                        <div class="cartlist">
                            <div class="cartlist-item" v-for="data2 in data.products" key="d">
                                <div class="img">
                                    <img :src="api2+data2.productPic">
                                </div>
                                <div class="content">
                                    <div>
                                        <div class="title">{{data2.productName}}</div>
                                        <div class="price">¥ {{data2.price}}</div>
                                    </div>
                                    <div class="norms">
                                        <div>
                                            商品规格：{{data2.versionName}}，{{data2.colorName}}
                                        </div>
                                        <div class="numhandle">
                                                x {{data2.count}}
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </div>   
                        <div class="cartlist-foot">
                            <div class="label" v-if="data.stauts==0" v-on:click="cancelOrder(data.orderId)">
                                <span class="title">取消订单</span> 
                            </div> 
                            <router-link :to="{name:'cartList',params:{id:data.orderId}}" class="pay-btn" v-if="data.stauts==0" > 支付</router-link>
                        </div>                                                                 
                    </div>
                </div>   
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="order-content" v-for="data in orderlistdata" key="d">
                    <div class="order-head">
                        <div class="text-success" v-if="data.stauts==0">
                            待支付
                        </div>                    
                        <div class="text-warning" v-if="data.stauts==1">
                            待发货
                        </div>
                        <div class="text-blue" v-if="data.stauts==2">
                            待收货
                        </div>
                        <div>
                            总额：{{data.price}}
                            订单编号：{{data.orderCode}}
                        </div>
                    </div>
                    <div>
                        <div class="cartlist">
                            <div class="cartlist-item" v-for="data2 in data.products" key="d">
                                <div class="img">
                                    <img :src="api2+data2.productPic">
                                </div>
                                <div class="content">
                                    <div>
                                        <div class="title">{{data2.productName}}</div>
                                        <div class="price">¥ {{data2.price}}</div>
                                    </div>
                                    <div class="norms">
                                        <div>
                                            商品规格：{{data2.versionName}}，{{data2.colorName}}
                                        </div>
                                        <div class="numhandle">
                                                x {{data2.count}}
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                        </div>                                           
                    </div>
                </div>  
            </mt-tab-container-item>
        </mt-tab-container>
        </div>
    </div>
</template>

<script>
   // import Vtemplate from './module/Template.vue'
   import common from '../common'
    export default {
        name:'order',
        data() {
            return {
                orderlistdata:{},
                selected:'1',
                content:'标题',
                a1:[],
                a2:[],
            }
        },
        watch:{
            selected:function(val){
                let self=this

                if(val==1){
                    self.loaData(self,'')
                }
                if(val==2){
                    self.loaData(self,0)
                } 
                if(val==3){
                    self.$http.get(self.api + 'order/list.do?userId='+self.userId+'&stauts='+1).then((response) => {
                        self.a1= response.data.data
                        self.$http.get(self.api + 'order/list.do?userId='+self.userId+'&stauts='+2).then((response2) => {
                            self.a2=response2.data.data
                            sself.a2.map(res2 => {
                                res2.products.map(res => {
                                    res.price =  common.shiftMoney( res.price)
                                })
                            })
                            self.orderlistdata=self.a1.concat(self.a2);
                        }),(response)=>{
                            console.log('请求出错')
                        } 
                    }),(response)=>{
                        console.log('请求出错')
                    } 

                }                                
            }
        },
        components:{
        },        
        methods:{
            //选择支付方式
            // paySelect:function(){
            //     let self=this
                
            // },     
            //取消订单
            cancelOrder:function(id){
                let self=this
                var data={
                    'userId':self.userId,
                    'orderId':id
                }
                self.$http.post(self.api+'order/cancle.do',data).then((response) => {
                       Toast({
                        message: '删除成功',
                        iconClass: 'icon icon-success'
                     });                     
                     self.loaData(self,'')
                }),(response)=>{
                    console.log('请求出错')
                }
            },       
            loaData:function(self,stauts){
                self.$http.get(self.api + 'order/list.do?userId='+self.userId+'&stauts='+stauts).then((response) => {
                    self.orderlistdata=response.data.data
                    self.orderlistdata.map(res=> {
                        res.products.map(res2 => {
                            res2.price =  common.shiftMoney( res2.price)
                        })
                    })
                }),(response)=>{
                    console.log('请求出错')
                }                
            }
        },
        mounted(){
            let self=this
            self.loaData(self,'')
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
     @import "../assets/sass/navbar.scss"
 
</style>