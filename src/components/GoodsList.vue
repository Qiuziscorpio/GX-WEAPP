<template>
  <div>
      <div class="search">   
        <div class="search-content"> 
          <i class="iconfont icon-sousuo_sousuo"></i>
          <input type="text" placeholder="热门搜索： 小米" class="search-input"  v-model="key"/>
        </div>
      </div>
    <!--  <div class="bg-grey2">
        <Vgoods :goodsdata="goodslistdata"></Vgoods>
      </div> -->
    <div class="page-loadmore-wrapper bg-grey2" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" :top-method="loadTop"  @top-status-change="handleTopChange"   @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
        <Vgoods :goodsdata="goodslistdata"></Vgoods>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div> 
      </mt-loadmore>
    </div>
      
  </div>
</template>

<script>
import { Loadmore ,Toast} from 'mint-ui';
import Vgoods from './module/Goods.vue'

export default {
  name: 'goodslist',
  data () {
    return {
      goodslistdata:"",
      pages:1,
      key:'',
      list: [],
      allLoaded: false,
      bottomStatus: '',
      topStatus:'',
      wrapperHeight: 0     
    }
  },
  components:{
      Vgoods
  }, 
  watch:{
    key:function(val){
      let self=this
      self.loadData(self,val,1)
    }
  },
  methods:{
       handleTopChange:function(status){
        this.topStatus = status;
       },
       handleBottomChange:function(status) {
        this.bottomStatus = status;
      },
      loadTop:function(){
         let self=this
         self.$http.get(self.api + 'product/list.do?queryName='+self.key+'&offset=1').then((response) => {
            self.goodslistdata=response.data           
          }),(response)=>{
              console.log('请求出错')
          }
          self.allLoaded = true;
         self.$refs.loadmore.onBottomLoaded();
      },
      loadBottom:function() {
         let self=this
         ++self.pages
         self.$http.get(self.api + 'product/list.do?queryName='+self.key+'&offset='+self.pages).then((response) => {
              if(response.data.Hotlist.length==0&&response.data.Peijianlist.length==0&&response.data.Peijianlist.length==0){
                self.allLoaded = true;
                Toast({
                    message: '暂无更多数据',
                    iconClass: 'icon icon-success'
                  });              
              }else{
                self.goodslistdata=response.data
              }    
          }),(response)=>{
              console.log('请求出错')
          }
        self.$refs.loadmore.onBottomLoaded();
      },   
      loadData:function(self,queryName,offset){
          self.$http.get(self.api + 'product/list.do?queryName='+queryName+'&offset='+offset).then((response) => {
              self.goodslistdata=response.data
          }),(response)=>{
              console.log('请求出错')
          }
      }
  },
  mounted(){
      let self=this
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      self.loadData(self,'',self.pages)
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
