<template>
    <div class="specspopup"> 
        <div class="specspopup-head">
            <div class="img">
                <img :src="api2+specspopupdata.productPic">
            </div>
            <div class="content">
                <div class="price">¥ {{specspopupdata.price}}</div>
                <div class="name">{{specspopupdata.productName}}</div>
            </div>
            <div class="closebtn" v-on:click="isspecspopup">
                <i class="icon iconfont icon-guanbi"></i>
            </div>
        </div>
        <div class="specspopup-content">
            <div class="content-item">
                <div class="title">
                    颜色
                </div>
                <div class="specs">
                    <span class="specs-item" :class="{'active':data.checkbox}" v-for="(data,index) in specspopupdata.colors" key="d" v-on:click="selectColors(index,data.checkbox)">
                    {{data.colorName}}
                    </span>                  
                </div>
            </div>
            <div class="content-item">
                <div class="title">
                    版本
                </div>
                <div class="specs">
                    <span class="specs-item" :class="{'active':data.checkbox}" v-for="(data,index) in specspopupdata.versions" key="d" v-on:click="selectVersions(index,data.checkbox)" >
                    {{data.versionName}}
                    </span>                  
                </div>
            </div>
             <div class="content-amountitem">
                <div class="title">
                   
                  购买数量  <small>  库存： {{specspopupdata.price}}</small>  
                </div>
                <div class="specs">

                    <span class="specs-item" v-on:click="subtractNum">
                    －
                    </span>
                    <input v-model="num" type="number" class="numinput">
                    <span class="specs-item" v-on:click="addNum">
                    ＋
                    </span>                    
                </div>
            </div>           
        </div>
        <div class="specspopup-foot">
            <div class="addbtn" v-on:click="addCart">
            加入购物车
            </div>
            <div class="paybtn" v-on:click="buyGoods">
            我要购买
            </div>            
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name:'specspopup',
        props:{
            specspopupdata:'',
        },
        components:{
        },
        data() {
            return {
                num:1,
                colorsarr:[],
                versionsarr:[],
                colors_id:'',
                version_id:''
            }
        },
        watch:{
            num:function(val){
               let self=this
                if(val=='0'){
                    self.num=1
                }
                if(val > self.specspopupdata.price){
                    self.num=self.specspopupdata.price
                }
            }
        },
        methods:{
            selectColors:function(index,val){
                let self=this
                self.specspopupdata.colors.map(function(v,i){
                     v.checkbox=false
                     self.specspopupdata.colors[index].checkbox=!val 
                     if(self.specspopupdata.colors[index].checkbox){
                        self.colorsarr.push(v)
                         self.colors_id=self.specspopupdata.colors[index].colorId
                     }else{
                         self.colorsarr.splice(i,1)
                     }
                })
            },
            selectVersions:function(index,val){
                let self=this
                self.specspopupdata.versions.map(function(v,i){
                     v.checkbox=false
                     self.specspopupdata.versions[index].checkbox=!val   
                     if(self.specspopupdata.versions[index].checkbox){
                       self.versionsarr.push(v)
                       self.version_id=self.specspopupdata.versions[index].versionId
                     }else{
                         self.versionsarr.splice(i,1)
                     }                                      
                })
            },
            addCart:function(){
                let self=this

                if(self.colorsarr.length==0||self.versionsarr.length==0){
                      Toast({
                        message: '请选择规格',
                        iconClass: 'icon icon-success'
                     });  
                }else{
                    let data={
                        'productId':self.specspopupdata.productId,
                        'version_id':self.version_id,
                        'color_id':self.colors_id,
                        'price':self.specspopupdata.price,
                        'count':self.num
                    }
                    self.$http.post(self.api+'car/addCar.do',data).then((response) => {
                        Toast({
                            message: '加入成功',
                            iconClass: 'icon icon-success'
                        });   
                        self.$emit('isspecspopup',true)  
                        self.specspopupdata.colors.map(function(v,i){
                            v.checkbox=false
                        })                    
                        self.specspopupdata.versions.map(function(v,i){
                            v.checkbox=false
                        }) 
                        self.$http.get( self.api+'car/list.do').then((response) => {
                            localStorage.setItem('cartnumber',response.body.data.length)
                        }),(response)=>{
                            console.log('请求出错')
                        }
                    }),(response)=>{
                        console.log('请求出错')
                    }
 
                }
            },
            buyGoods:function(){
                let self=this

                if(self.colorsarr.length==0||self.versionsarr.length==0){
                      Toast({
                        message: '请选择规格',
                        iconClass: 'icon icon-success'
                     });  
                }else{
                    let data={
                        'productId':self.specspopupdata.productId,
                        'version_id':self.version_id,
                        'color_id':self.colors_id,
                        'price':self.specspopupdata.price,
                        'count':self.num
                    }
                    self.$http.post(self.api+'car/addCar.do',data).then((response) => {
                        Toast({
                            message: '加入成功',
                            iconClass: 'icon icon-success'
                        });   
                        self.$emit('isspecspopup',true)  
                        self.specspopupdata.colors.map(function(v,i){
                            v.checkbox=false
                        })                    
                        self.specspopupdata.versions.map(function(v,i){
                            v.checkbox=false
                        }) 


                        
                    }),(response)=>{
                        console.log('请求出错')
                    }
 
                }

            },
            isspecspopup:function(){
                let self=this
                self.$emit('isspecspopup',true)
                self.specspopupdata.colors.map(function(v,i){
                    v.checkbox=false
                })                    
                self.specspopupdata.versions.map(function(v,i){
                    v.checkbox=false
                })                

            },
            subtractNum:function(){
                let self=this
                if(self.num==1){
                    return false;
                }
                --self.num
            },
            addNum:function(){
                let self=this
                ++self.num
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" >
   @import "../../assets/sass/specspopup.scss"
</style>