<template>
    <div>  
        <!-- 支付宝弹窗模块 -->
        <div class="popup"  :class="{'address':popuptype==='收货地址'}" >
            <div class="popup-pay" v-if="popuptype==='支付方式'">
                <div class="pay-title"> 
                选择支付方式
                </div>
                <div class="popup-content">
                    <div class="popup-paycontent">
                       <!-- <div class="pay-item active">
                            <i class="iconfont icon-dagou"></i>
                            银联支付
                        </div>-->
                        <div class="pay-item">
                            <i class="iconfont icon-dagou mint-field-state is-success"></i>
                            信用卡支付
                        </div>
                        <!--<div class="pay-item">
                            <i class="iconfont icon-dagou"></i>
                            其它支付
                        </div>    -->                                    
                    </div>
                </div>
                <div class="popup-foot">
                    <div class="cancel" v-on:click="cancelHandle">
                    取消
                    
                    </div>
                    <div class="ok" v-on:click="okHandle">
                        确定
                    </div>
                </div>
            </div>
            <div class="popup-pay" v-if="popuptype==='提醒'">
                <div class="pay-title"> 
                提醒
                </div>
                <div class="popup-content">
                    <div class="popup-paycontent">
                    <div class="text-center">
                        <span class=" text-blue">
                           恭喜亲爱小粉～签到成功
                        </span>                                    
                    </div>
                    </div>
                </div>
                <div class="popup-foot">
                    <div class="text-center" v-on:click="okHandle">
                        确定
                    </div>
                </div>
            </div>            
            <div class="popup-address" v-if="popuptype==='收货地址'">
                <div class="content form">
                    <div class="forminput-item">
                        <label class="label">收货人</label>
                        <input class="input" placeholder="请输入名字" v-model="addressArr.goodsName">
                    </div>
                    <div class="forminput-item">
                        <label class="label">手机号码</label>
                        <input class="input" placeholder="请输入手机号码" v-model="addressArr.phone" >
                    </div>
                     <div class="forminput-item">
                        <label class="label">省 市 区县</label>
                        <div class="input"  v-model="addressArr.address" v-on:click="selectArea"></div>
                    </div> 
                      <div class="forminput-item">
                        <label class="label">详细地址</label>
                        <input class="input" placeholder="请输入街道门牌信息" v-model="addressArr.street" >
                    </div> 
                       <div class="forminput-item">
                        <label class="label">邮政编码</label>
                        <input class="input" placeholder="请输入邮政编码" v-model="addressArr.postal" > 
                    </div>                                                                                   
                </div>
                <button class="submit" v-on:click="getAddress"> 确定</button>
            </div>            
        </div>
        <div class="popup-shade" v-on:click="cancelHandle"></div>        
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name:'template',
        props:{
            popuptype:'',
                // addressArr:{
                //     goodsName:'',
                //     phone:'',
                //     street:'',
                //     address:'',
                //     postal:''
                // }
        },
        components:{
        },
        data() {
            return {
                addressArr:{
                    goodsName:'',
                    phone:'',
                    street:'',
                    address:'',
                    postal:''
                }
            }
        },
        methods:{
            cancelHandle:function(){
                //取消
                console.log('取消遮罩层')
                this.$emit('ispopup',false)
            },
            okHandle:function(){
                //确定
                console.log('确定选择支付方式')
                this.$emit('ispopup',false)
            },
            getAddress:function(){
                let self =this
                // if(self.goodsName==''&&self.phone==''&&self.street==''&&self.address==''){

                // }else{

                // }
                console.log('oooo')
                if(self.addressArr.goodsName==''){
                    Toast({
                        message: '收货人必填',
                        iconClass: 'icon icon-success'
                    }); 
                }     
                if(self.addressArr.phone==''){
                    Toast({
                        message: '手机必填',
                        iconClass: 'icon icon-success'
                    }); 
                }
                if(self.addressArr.street==''){
                    Toast({
                        message: '市区必填',
                        iconClass: 'icon icon-success'
                    }); 
                }  

                if(self.addressArr.address==''){
                    Toast({
                        message: '街道必填',
                        iconClass: 'icon icon-success'
                    }); 
                }                

                this.$emit('getAddress',self.addressArr)
            },
            selectArea:function(){
                let self=this
                self.$http.get(self.api+'area/find.do').then((response) => {
                        console.log(response )
                }),(response)=>{
                    console.log('请求出错')
                }
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/popup.scss"
</style>