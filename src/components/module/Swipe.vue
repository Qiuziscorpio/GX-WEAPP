<template>
    <div class="page-swipe">   
        <mt-swipe :auto="4000">
            <mt-swipe :auto="4000">
                <mt-swipe-item key="d" class="" v-for="data in img">
                    <img :src="data.img"/>
                </mt-swipe-item>
            </mt-swipe>
        </mt-swipe>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';

    export default {
        name:'swipe',
        props:{
            img:''
        },
        components:{
            Swipe,
            SwipeItem
        },
        data() {
            return {

            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
    @import "../../assets/sass/swipe.scss"
</style>