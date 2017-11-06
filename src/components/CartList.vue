<template>
    <div>
        <!-- 支付弹窗  -->
        <Vtemplate :popuptype="popuptype" v-if="ispopup" v-on:ispopup="paySelect"></Vtemplate>
        <div class="flex-vertical">  
                <div class="flex-vertical-content bg-grey2">
                    <div class="cartlist">
                        <router-link :to="{name:'address'}" class="cartlist-head mint-field-state is-error"  v-if="isAddress"> 
                            请先填写收货地址哦~
                        </router-link>                    
                        <div class="cartlist-head" v-on:click="isdeletecart"> 
                            <span v-if="isdeleticon"> 删除 </span>
                            <span v-else>编辑</span>                           
                        </div>
                        <div>
                            <div class="cartlist-item" v-for="data in carlistdata.products">
                                <div class="deletecartico" v-if="isdeleticon" v-on:click="deletecart(data.carId)">
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
                                            <span v-on:click="subtractNum(data.carId )"> － </span>
                                            <span class="num"> {{data.count}} </span>
                                            <span v-on:click="addNum(data.carId)"> ＋ </span> 
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
                            ¥ {{carlistdata.totalPrice}}
                        </span>
                    </div>
                    <div class="pay-btn" v-if="isAddress" style="background: #ccc;"> 
                        支付
                    </div>
                    <div class="pay-btn" v-on:click="showPopup" v-else> 
                        支付
                    </div>                    
                </div>
            </div>
        </div>         
    </div>

</template>

<script>

    import Vtemplate from './module/Template.vue'
    import common from '../common'
    import { Toast } from 'mint-ui';

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
                carlistdata:'',
                isAddress: false,
                addressId: ''
            }
        },
        components:{
            Vtemplate
        },
        methods:{
            showPopup:function() {
                this.ispopup=!this.ispopup  
            },
            //选择支付方式
            paySelect:function(){
                let self=this
                let products = this.carlistdata.products
                for(let i=0; i < products.length; i++){
					products[i].price = products[i].price*100;
					products[i].pager = {};
				}
                self.ispopup=!self.ispopup                
				let data_ = {
					'products': this.carlistdata.products,
					'userId': this.userId,
					'addressId':this.addressId,
					'orderId':this.orderId
				},
				transFn = function(data) {
					return $.param(data);
				},
				postCfg = {
					headers: { 'Content-Type': 'application/json;charset=UTF-8'},
					transformRequest: transFn
				};
                self.$http.post(`${self.api}payOrder/pay.do`,data_,postCfg).then((response) => {
					console.log(response, 'response')
				});
            },
            isdeletecart:function(){
                this.isdeleticon= !this.isdeleticon
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
                self.carlistdata.products.map(function(v,i){
                    if(v.carId == id) {
                        if(v.count==1){
                            return false;
                        }
                        --v.count
                        self.$http.post(`${self.api}car/addCount.do?userId=${self.userId}&carId=${id}&count=${v.count}`).then((response) => {
                        })                                            
                    }
                })
            },
            addNum:function(id){
                let self=this
                self.carlistdata.products.map(function(v,i){
                    if(v.carId == id) {
                      ++v.count
                      self.$http.post(`${self.api}car/addCount.do?userId=${self.userId}&carId=${id}&count=${v.count}`).then((response) => {
                      })
                    }
                })
            },
            loadData:function(self){
                if(this.id === '0'){
                    self.$http.post(self.api+'car/list.do?userId='+self.userId).then((response) => {
                        self.carlistdata=response.data
                        self.carlistdata.products.map(res => {
                            res.price =  common.shiftMoney( res.price)
                        })
                        let money = common.shiftMoney(self.carlistdata.totalPrice)
                        self.carlistdata.totalPrice = money
                    }),(response)=>{
                        console.log('请求出错')
                    }
                }else {
                    self.$http.post(`${self.api}order/orderInfo.do?userId=${self.userId}&orderId=${this.id}`).then((response) => {
                        self.carlistdata=response.data
                        self.carlistdata.products.map(res => {
                            res.price =  common.shiftMoney( res.price)
                        })             
                        let money = common.shiftMoney(self.carlistdata.totalPrice)
                        self.carlistdata.totalPrice = money
                    }),(response)=>{
                        console.log('请求出错')
                    }
                }
            }
        },
        mounted(){
            let self = this
            this.id = this.$route.params.id
            self.loadData(self)
            self.$http.get(self.api + 'address/myAddress.do?userId='+self.userId).then((response) => {
                if(response.data.address.length === 0) {
                    self.isAddress = true
                } else {
                    response.data.address.map(res => {
                        // 0 普通地址 1默认地址
                        if(res.default_ === 1) {
                            self.addressId = res.addressId
                        }
                    })
                }
            }),(response)=>{
                console.log('请求出错')
            }            
        }       
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../assets/sass/cartlist.scss"
</style>