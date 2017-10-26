<template>
    <div class="bg-grey2"> 
        <!-- 新增地址  -->
        <Vtemplate :popuptype="popuptype" v-if="ispopup" v-on:ispopup="addAddress" v-on:getAddress="getAddress"></Vtemplate>
        <div class="address" >
            <div class="address-head" v-on:click="addAddress">
                新增收货地址
            </div>
            <div class="address-item" v-for="data in myaddresslistdata">
                <div class="head">
                    <span>{{data.goodsName}}</span>
                    <span>{{data.phone}}</span>
                </div>
                <div class="content">
                {{data.fullName}}
                </div>
                <div class="foont">
                    <div>
                        <span v-on:click="deleteAddress(data.addressId)">  删除地址</span>
                        <span v-on:click="setDefaultAddress(data.addressId,data.default_)" class="label" > <i class="icon iconfont icon-dagou" :class="{'active':data.default_==1}"></i>   默认地址</span>
                        <span v-on:click="editAddress(data.addressId)">  编辑</span>
                    </div>
                </div>
            </div>                     
        </div>
    </div>
</template>

<script>
    import Vtemplate from './module/Template.vue'
    import { Toast } from 'mint-ui';

    export default {
        name:'address',
        components:{
            Vtemplate
        },
        data() {
            return {
                popuptype:'收货地址',
                ispopup:false,
                pages:1,
                addressArr:'',
                myaddresslistdata:''
            }
        },
        methods:{
            addAddress:function(){
                this.ispopup=!this.ispopup
            },
            setDefaultAddress:function(val,type){
                let  self =this
                if(type==1){
                    type=0
                }else if(type==0){
                    type=1
                }
                let data={
                   addressId:val,
                   default_:type
                }
                self.$http.post(self.api+'address/update.do',data).then((response) => {
                     self.loadData(self,self.pages)
                      Toast({
                        message: '设置成功',
                        iconClass: 'icon icon-success'
                     });                    
                }),(response)=>{
                    console.log('请求出错')
                }
            },
            editAddress:function(id){
                let self=this
                self.$http.get(self.api+'address/find.do?addressId='+id).then((response) => {
                   // console.log( response.address)
                   // self.addressdata=  response.address
                   self.ispopup=!self.ispopup
                }),(response)=>{
                    console.log('请求出错')
                }
            },
            getAddress:function(val){
                let self = this
                var data={
                    userId:self.userId,
                    phone:val.phone,
                    street:val.street,
                    goodsName:val.goodsName
                }

                console.log(JSON.stringify(data ))
                self.$http.post(self.api + 'address/add.do',data).then((response) => {
                    //  Toast({
                    //     message: '新增成功',
                    //     iconClass: 'icon icon-success'
                    // });    
                    self.ispopup=!self.ispopup                
                }),(response)=>{
                    console.log('请求出错')
                }                
            },
            deleteAddress:function(id){
                let self=this
                var data={
                    'userID':self.userId,
                   'addressId':id
                }
                
                console.log(JSON.stringify(data ))
                self.$http.post(self.api+'address/delect.do',data).then((response) => {
                     self.loadData(self,self.pages)
                      Toast({
                        message: '删除成功',
                        iconClass: 'icon icon-success'
                        });                    
                }),(response)=>{
                    console.log('请求出错')
                }
            },
            loadData:function(self,pages){
                self.$http.get(self.api + 'address/myAddress.do?userId='+self.userId).then((response) => {
                   self.myaddresslistdata = response.data.address                  
                }),(response)=>{
                    console.log('请求出错')
                }
            }
        },
        mounted(){
            let self=this
            self.loadData(self,self.pages)
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../assets/sass/address.scss"
</style>