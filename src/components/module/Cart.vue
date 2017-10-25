<template>
    <div> 
        <router-link :to="{name:'cartList'}" tag="div" class="cart">
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
            
        },
        components:{
        },
        data() {
            return {
                number:''
            }
        },
        mounted(){
            let self = this
             self.number= localStorage.getItem('cartnumber')
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/cart.scss"
</style>