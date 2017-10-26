<template>
    <div class="bg-grey2">  
   
        <div v-if="commoditydata.Hotlist!=''"> 
            <div class="label-title">
                    －<span class="label">热门</span> －
            </div>          
            <div class="commodity flex-row ">
                <div class="commodity-item flex-grid flex-grid2" v-for="data in commoditydata.Hotlist" key="d">
                    <router-link :to="{name:'cartdetails',params:{id:data.productId}}" class="commodity-img">
                        <img :src="api2 + data.productPic">
                    </router-link>
                    <div class="commodity-content">
                        <div class="commodity-title"> 
                            {{data.productName}}
                        </div>
                        <div class="commodity-specs">
                            <div class="price">
                            <span class="rmb"> ¥ </span>  {{data.price/100}}
                            </div>
                            <router-link :to="{name:'cartList',params:{id:'0'}}" class="cart-btn">
                                加入购物车
                            </router-link>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="commoditydata.Spreelist!=''"> 
            <div class="label-title">
                    －<span class="label">抢购</span> －
            </div>        
            <div class="commodity flex-row " >
                <div class="commodity-item flex-grid flex-grid2" v-for="data in commoditydata.Spreelist" key="d">
                    <router-link :to="{name:'cartdetails',params:{id:data.productId}}" class="commodity-img">
                        <img :src="api2 + data.productPic">
                    </router-link>
                    <div class="commodity-content">
                        <div class="commodity-title"> 
                            {{data.productName}}
                        </div>
                        <div class="commodity-specs">
                            <div class="price">
                            <span class="rmb"> ¥ </span>  {{data.price/100}}
                            </div>
                            <div :to="{name:'cartList',params:{id:'0'}}" class="cart-btn" v-on:click="addCart(data.productId)">
                                加入购物车
                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="commoditydata.Peijianlist!=''"> 
            <div class="label-title">
                    －<span class="label">配件 </span> －
            </div>
            <div class="commodity flex-row ">
                <div class="commodity-item flex-grid flex-grid2" v-for="data in  commoditydata.Peijianlist" key="d">
                    <router-link :to="{name:'cartdetails',params:{id:data.productId}}" class="commodity-img">
                        <img :src="api2 + data.productPic">
                    </router-link>
                    <div class="commodity-content">
                        <div class="commodity-title"> 
                            {{data.productName}}
                        </div>
                        <div class="commodity-specs">
                            <div class="price">
                            <span class="rmb"> ¥ </span>  {{data.price/100}}
                            </div>
                            <router-link :to="{name:'cartList',params:{id:'0'}}" class="cart-btn">
                                加入购物车
                            </router-link>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'commodity',
        props:{
            commoditydata:'',
        },
        components:{
        },
        data() {
            return {

            }
        },
        methods:{
            addCart:function(id){
                let self=this
                self.$emit('addCart',id)
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/commodity.scss"
</style>