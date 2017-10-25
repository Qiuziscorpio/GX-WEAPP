<template>
  <div class="flex-vertical vipbooklet">
    <div class="vip flex-vertical-content">
        <div class="vip-head">
            <div class="vip-card">
                <img src="../assets/vipimg.png">
                <span class="vipnum">{{memberNumber}}</span>                
            </div>
        </div>
        <div class="vip-content">
          <div class="content">
          <pre>
           一、 会员卡功能
1、会员卡同时具备打折优惠、储值和积分三项功能
2、打折功能：按照卡内的折扣信息给予住房和餐菜品相应折扣。
3、储值功能：会员卡可提前预存金额，以方便消费。
 二、会员功能
1、酒店会员凭会员卡可享受酒店住房和餐厅菜品执行价的8.8折优惠，
协议单位和特别客户可根据达成的协议给予相依的折扣。
2、所有会员住房可延迟到15：00退房，免收半天房租。
3.会员优先享受酒店预订、会员特价和各项优惠措施。
4、享受酒店的消费积分奖励和邀请免费参加酒店举办的各类会员联谊
活动和参加抽奖活动。
5、在酒店客房紧张时，会员将享有客房预订优先权。
6、预订延时保留在您因故未能在预订保留时间内到达酒店时，经电话
确认后，酒店将为会员适当延长保留时间至20:00.
 7、定期专人回访和个性贴心服务。</pre>
          </div>
        </div>
        <div class="vipbooklet-foot">
          <div>版权所有：广通信连锁</div>
          <div>
          服务热线：18022448088
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vipbooklet',
  data () {
    return {
      memberNumber:''
    }
  },
  mounted(){
      let self=this
      self.memberNumber=localStorage.getItem('memberNumber')
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
 @import "../assets/sass/vipbooklet.scss"
</style>
