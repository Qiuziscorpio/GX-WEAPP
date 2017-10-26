<template>
    <div>
        <!-- 搜索 -->
        <Vsearch></Vsearch>
        <!-- 轮播图 -->
        <Vswipe :img="banner"></Vswipe>
        <!-- 商品列表 -->
        <Vcommodity :commoditydata="listdata" v-on:addCart="addCart"></Vcommodity>
        <!-- 购物车 -->
        <Vcart :number="number"></Vcart>    
        <!-- 选择规格  -->
        <Vspecspopup v-if="showpecspopup" :specspopupdata="cartdetails" v-on:isspecspopup="isspecspopup"></Vspecspopup>
    </div>
</template>

<script>
    import Vswipe from './module/Swipe.vue'
    import Vcommodity from './module/Commodity.vue'
    import Vsearch from './module/Search.vue'
    import Vcart from './module/Cart.vue'
    import Vspecspopup from './module/Specspopup.vue'
    import img from '../assets/banner.png'
    export default {
        name:'index',
        components:{
            Vswipe,
            Vcommodity,
            Vspecspopup,
            Vsearch,
            Vcart
        },
        data() {
            return {
                showpecspopup:false,
                cartdetails:{},
                listdata:[
                    // {
                    //     productld:'177',
                    //     productCode:'10086',
                    //     productName:'小米／红米4A 16G版 全网通 4g智能手机',
                    //     productPic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490635373185&di=982f7b407b42f4d2685d7df8d978d6b9&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140318%2F2531170_082310004375_2.jpg',
                    //     price:'2000',
                    //     stock:'90',
                    //     type:1,
                    //     stauts:0,
                    //     salesVolume:1290
                    // },
                    // {
                    //     productld:'88',
                    //     productCode:'10086',
                    //     productName:'小米／红米4A 16G版 全网通 4g智能手机',
                    //     productPic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490635373185&di=982f7b407b42f4d2685d7df8d978d6b9&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140318%2F2531170_082310004375_2.jpg',
                    //     price:'2000',
                    //     stock:'90',
                    //     type:1,
                    //     stauts:0,
                    //     salesVolume:1290
                    // },
                    // {
                    //     productld:'111',
                    //     productCode:'10086',
                    //     productName:'小米／红米4A 16G版 全网通 4g智能手机',
                    //     productPic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490635373185&di=982f7b407b42f4d2685d7df8d978d6b9&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140318%2F2531170_082310004375_2.jpg',
                    //     price:'2000',
                    //     stock:'90',
                    //     type:1,
                    //     stauts:0,
                    //     salesVolume:1290
                    // },                    
                    //  {
                    //     productld:'99',
                    //     productCode:'10086',
                    //     productName:'小米／红米4A 16G版 全网通 4g智能手机',
                    //     productPic:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490635373185&di=982f7b407b42f4d2685d7df8d978d6b9&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140318%2F2531170_082310004375_2.jpg',
                    //     price:'2000',
                    //     stock:'90',
                    //     type:1,
                    //     stauts:0,
                    //     salesVolume:1290
                    // }                                       
                ],
                banner:[
                    {
                        img:img
                    },
                    {
                        img:img
                    },
                    {
                        img:img
                    }                                        
                ],
                number:0
            }
        },
        methods:{
            isspecspopup:function(){
                this.showpecspopup=!this.showpecspopup
            },   
            addCart:function(id){
                let self=this
                 self.$http.get(self.api + 'product/find.do?productid='+id,).then((response) => {
                     self.cartdetails=response.data.data
                     self.cartdetails.versions.map(function(v,i){
                        self.$set(v,'checkbox',false)
                     })
                     self.cartdetails.colors.map(function(v,i){
                        self.$set(v,'checkbox',false)
                     })
                     self.showpecspopup=true
                     localStorage.setItem("CartCount", ++self.number)
                 }),(response)=>{
                     console.log('请求出错')
                 }
            },     
            loadCartData:function(self){
                self.$http.get( self.api+'car/list.do').then((response) => {
                    if(response.body.data.length!=0){
                        localStorage.setItem('cartnumber',response.body.data.length)
                    }
                }),(response)=>{
                    console.log('请求出错')
                }
            },   
            loadData:function(self){
                self.$http.get(self.api + 'product/list.do').then((response) => {
                    console.log('请求成功')
                    self.listdata=response.data
                    console.log( response.data )
                }),(response)=>{
                    console.log('请求出错')
                }
            }
        },
        mounted(){
            let self=this
            self.loadData(self)
            self.loadCartData(self)
            self.number =  localStorage.getItem("CartCount")
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
     @import "../assets/sass/confi.scss"
</style>