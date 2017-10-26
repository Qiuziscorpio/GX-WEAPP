<template>
    <div> 
        <router-link :to="{name:'cartList',params:{id:'0'}}" tag="div" class="cart">
            <span class="cart-number">
               {{number}}
            </span> 
            <div class="cart-icon">
                <i class="icon iconfont icon-suini-shopcart"></i>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name:'cart',
        props:{
            number: 0
        },
        components:{
        },
        watch: {
            'number':function() {
                this.number = this.number
            }
        },
        data() {
            return {
            }
        },
        mounted(){
            let self = this
            // self.number= localStorage.getItem('cartnumber')
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/cart.scss"
</style>