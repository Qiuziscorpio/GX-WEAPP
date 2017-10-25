<template>
    <div class="search">   
		<div class="search-content" v-on:click="openSearch"> 
			<i class="iconfont icon-sousuo_sousuo"></i>
			<input type="text" placeholder="热门搜索： 小米" class="search-input" />
		</div>
    </div>
</template>

<script>
    export default {
        name:'search',
        props:{
            
        },
        components:{
        },
        data() {
            return {

            }
        },
        methods:{
            openSearch:function(){
                this.$router.push({ name: 'goodslist' })
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/search.scss"
</style>