<template>
    <div>   
        <div class="commodity goods-commodity">
            <router-link :to="{name:'cartdetails',params:{id:data.productId}}" class="commodity-item" v-for="data in goodsdata.Hotlist" :key="data" tag="div">
                <div class="commodity-img">
                    <img :src="api2 + data.productPic">
                </div>
                <div class="commodity-content">
                    <div class="commodity-title"> 
                        {{data.productName}}
                    </div>
                    <div class="commodity-specs">
                        <div class="price">
                           <span class="rmb"> ¥ </span>  {{data.price}}
                        </div>
                        <div class="cart-btn">
                            查看详情
                        </div>                        
                    </div>
                </div>
            </router-link>
             <router-link :to="{name:'cartdetails',params:{id:data.productId}}" class="commodity-item" v-for="data in goodsdata.Peijianlist" :key="data" tag="div">
                <div class="commodity-img">
                    <img :src="api2 + data.productPic">
                </div>
                <div class="commodity-content">
                    <div class="commodity-title"> 
                        {{data.productName}}
                    </div>
                    <div class="commodity-specs">
                        <div class="price">
                           <span class="rmb"> ¥ </span>  {{data.price}}
                        </div>
                        <div class="cart-btn">
                            查看详情
                        </div>                        
                    </div>
                </div>
            </router-link>
             <router-link :to="{name:'cartdetails',params:{id:data.productId}}" class="commodity-item" v-for="data in goodsdata.Spreelist" :key="data" tag="div">
                <div class="commodity-img">
                    <img :src="api2 + data.productPic">
                </div>
                <div class="commodity-content">
                    <div class="commodity-title"> 
                        {{data.productName}}
                    </div>
                    <div class="commodity-specs">
                        <div class="price">
                           <span class="rmb"> ¥ </span>  {{data.price}}
                        </div>
                        <div class="cart-btn">
                            查看详情
                        </div>                        
                    </div>
                </div>
            </router-link>                      
        </div>
    </div>
</template>

<script>
    export default {
        name:'goods',
        props:{
            goodsdata:'',
        },
        components:{
        },
        data() {
            return {
            }
        },
        methods:{

        },
        mounted(){
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/commodity.scss"
</style>