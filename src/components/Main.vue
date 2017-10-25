<template>
    <div class="flex-vertical">
        <!-- 中间内容 -->
        <router-view class="flex-vertical-content"></router-view>
        <!-- 底部菜单 -->
        <Vtab :tab="tab"></Vtab>
    </div>
</template>

<script>
    import Vtab from './module/Tab.vue'
    
    export default {
        name:'main',
        data() {
            return {
                tab:[
                    {
                        name:'index',
                        icon:'icon-iconfonthome',
                        text:'广信商城'
                    },
                    {
                        name:'order',
                        icon:'icon-iconfonthome',
                        text:'我的订单'
                    },
                    {
                        name:'vip',
                        icon:'icon-geren',
                        text:'会员中心'
                    }                                        
                ]
            }
        },
        components:{
            Vtab
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../assets/sass/confi.scss"

</style>