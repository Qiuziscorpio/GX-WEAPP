<template>
    <div>
        <div class="flex-row tab-group">
            <router-link class="flex-grid tab-item"  :class="{'router-link-active':data.name==='index'&&$route.path==='/Main'}" :router-link-active="$route.name===data.name"  :to="{name:data.name}" v-for="data in tab" key="d" >
                <i class="iconfont" :class="data.icon"></i>
                <span>{{data.text}} </span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:'tab',
        props:{
            tab:''
        },
        data() {
            return {

            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
     @import "../../assets/icon/iconfont.css"
     @import "../../assets/sass/tab.scss"
</style>