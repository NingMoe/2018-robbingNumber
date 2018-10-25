<template>
    <div class="search-detail-section">
        <div class="sd-info">
            <div class="container">
                <p>{{msisdn}}，您好!</p>
            </div>
        </div>
        <div class="sd-detaillist">
            <div class="container">
                <div class="onecard-info">
                    <h4>搶1卡2號活動參與情況</h4>
                    <ul class="ul-list">
                        <li v-for="(list,index) of ykshList" :key="index">
                            <div class="inset-number">
                                <label><span>澳門號：</span>{{list.reserve_msisdn}}</label>
                                <label><span>內地號：</span>{{list.reserve_cmdn}}</label>
                            </div>
                            <div class="inset-info">
                                <div class="info-time">
                                    <div class="time-text">
                                        <p v-if="list.state != 2 && list.state != 5"><span>預留時間：</span>{{list.reserve_time.split('-')[0]}}年{{list.reserve_time.split('-')[1]}}月{{list.reserve_time.split('-')[2]}}日</p>
                                        <p v-if="list.state != 2 && list.state != 5"><span>失效時間：</span>{{list.expiry_time.split('-')[0]}}年{{list.expiry_time.split('-')[1]}}月{{list.expiry_time.split('-')[2]}}日</p>
                                        <p v-if="list.state == 5"><span>失效時間：</span>{{list.give_time.split('-')[0]}}年{{list.give_time.split('-')[1]}}月{{list.give_time.split('-')[2]}}日</p>
                                        <p class="get-code">提取码：<big>{{list.distill_code || ''}}</big></p>
                                    </div>
                                    <p class="time-left" v-if="list.state == '1'">
                                        <span class="time-icon"></span>
                                        預留有效期還剩 <strong>{{list.remainDays}}</strong> 天
                                    </p>
                                    <!-- <p class="time-left"  v-if="list.remainDays < 0">
                                        <span class="time-icon"></span>
                                        該號碼已過預留期
                                    </p> -->
                                    <p class="time-left"  v-if="list.state == '2'">
                                        <span class="time-icon"></span>
                                        該號碼已放棄
                                    </p>
                                    <p class="time-left"  v-if="list.state == '3'">
                                        <span class="time-icon"></span>
                                        該號碼已成功辦理上台
                                    </p>
                                    <p class="time-left"  v-if="list.state == '5'">
                                        <span class="time-icon"></span>
                                        該號碼已失效
                                    </p>
                                </div>
                                <!-- <div class="info-btn" v-if="list.remainDays >= 0">
                                    <a class="giveup" @click="giveup(list,2,index)">立即放棄</a>
                                </div> -->
                            </div>
                        </li>
                        <!-- <li>
                            <div class="inset-number">
                                <label><span>澳門號：</span>68783133</label>
                                <label><span>內地號：</span>19974613133</label>
                            </div>
                            <div class="inset-info">
                                <div class="info-time">
                                    <div class="time-text">
                                        <p><span>預留時間：</span>2018年10月10日</p>
                                        <p><span>失效時間：</span>2018年10月17日</p>
                                    </div>
                                    <p class="time-left">
                                        <span class="time-icon"></span>
                                        預留有效期還剩 <strong>7</strong> 天
                                    </p>
                                </div>
                                <div class="info-btn">
                                    <a class="online" @click="popShow = true">在線上台</a>
                                    <a class="giveup">立即放棄</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="inset-number">
                                <label><span>澳門號：</span>68783133</label>
                                <label><span>內地號：</span>19974613133</label>
                            </div>
                            <div class="inset-info">
                                <div class="info-time">
                                    <div class="time-text">
                                        <p><span>預留時間：</span>2018年10月10日</p>
                                        <p><span>失效時間：</span>2018年10月17日</p>
                                    </div>
                                    <p class="time-left">
                                        <span class="time-icon"></span>
                                        預留有效期還剩 <strong>7</strong> 天
                                    </p>
                                </div>
                                <div class="info-btn">
                                    <a class="online" @click="popShow = true">在線上台</a>
                                    <a class="giveup">立即放棄</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="inset-number">
                                <label><span>澳門號：</span>68783133</label>
                                <label><span>內地號：</span>19974613133</label>
                            </div>
                            <div class="inset-info">
                                <div class="info-time">
                                    <div class="time-text">
                                        <p><span>預留時間：</span>2018年10月10日</p>
                                        <p><span>失效時間：</span>2018年10月17日</p>
                                    </div>
                                    <p class="time-left">
                                        <span class="time-icon"></span>
                                        預留有效期還剩 <strong>7</strong> 天
                                    </p>
                                </div>
                                <div class="info-btn">
                                    <a class="online" @click="popShow = true">在線上台</a>
                                    <a class="giveup">立即放棄</a>
                                </div>
                            </div>
                        </li> -->
                    </ul>
                    <div class="diyBtnWrap m-t-20 text-center">
                        <a class="diyBtn" v-if="ykshList.length < 4" @click="goToOneCard">
                            <div class="diyBtnCtn">
                                還可獲取{{4 - ykshList.length}}組靚號
                            </div>
                            <div class="likeShadowBlurry"></div>
                        </a>
                    </div>
                </div>
                <div class="pair-info" v-if="matchList.length > 0">
                    <h4>配對內地副號活動參與情況</h4>
                    <ul class="ul-list">
                        <li v-for="(list,index) of matchList" :key="index">
                            <div class="inset-number">
                                <label><span>已配對內地副號：</span>{{list.reserve_cmdn}}</label>
                            </div>
                            <div class="inset-info">
                                <div class="info-time">
                                    <div class="time-text">
                                        <p v-if="list.state != 2 && list.state != 5"><span>預留時間：</span>{{list.reserve_time.split('-')[0]}}年{{list.reserve_time.split('-')[1]}}月{{list.reserve_time.split('-')[2]}}日</p>
                                        <p v-if="list.state != 2 && list.state != 5"><span>失效時間：</span>{{list.expiry_time.split('-')[0]}}年{{list.expiry_time.split('-')[1]}}月{{list.expiry_time.split('-')[2]}}日</p>
                                        <p v-if="list.state == 5"><span>失效時間：</span>{{list.give_time.split('-')[0]}}年{{list.give_time.split('-')[1]}}月{{list.give_time.split('-')[2]}}日</p>
                                        <p class="get-code">提取码：<big>{{list.distill_code || ''}}</big></p>
                                    </div>
                                    <p class="time-left" v-if="list.state == '1'">
                                        <span class="time-icon"></span>
                                        預留有效期還剩 <strong>{{list.remainDays}}</strong> 天
                                    </p>
                                    <!-- <p class="time-left"  v-if="list.remainDays < 0">
                                        <span class="time-icon"></span>
                                        該號碼已過預留期
                                    </p> -->
                                    <p class="time-left"  v-if="list.state == '2'">
                                        <span class="time-icon"></span>
                                        該號碼已放棄
                                    </p>
                                    <p class="time-left"  v-if="list.state == '3'">
                                        <span class="time-icon"></span>
                                        該號碼已成功辦理上台
                                    </p>
                                    <p class="time-left"  v-if="list.state == '5'">
                                        <span class="time-icon"></span>
                                        該號碼已失效
                                    </p>
                                </div>
                                <!-- <div class="info-btn" v-if="list.remainDays >= 0">
                                    <a class="giveup" @click="giveup(list,1,index)">立即放棄</a>
                                </div> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="insetrule-box bottom-gray">
            <div class="span-title">
                <div class="container">
                    <span>温馨提示</span>
                </div>
            </div>
            <div class="container">
                <ul>
                    <li v-if="ykshList.length > 0">
                        <!-- <span class="number">1</span> -->
                        <p>搶一卡雙號每人最多可搶佔4組號碼，一次只能搶佔一個號碼</p>
                    </li>
                    <li>
                        <!-- <span class="number">{{ykshList.length > 0 ? '2' : '1'}}</span> -->
                        <p>號碼搶好後，您有7天的辦理準備期，請您在號碼的預留有效期內攜帶有效個人身份證件前往我司任意門市辦理，具體地址請看如下門市分佈。</p>
                    </li>
                </ul>
            </div>
        </div>
        <st-map inner="inner"/>
        <!-- <pop-choose :popShow.sync = 'popShow'/> -->
        <div class="default-footer">活動最終解釋權歸中國電信（澳門）有限公司所有</div>
    </div>
</template>

<script>
    // import popChoose from '@/components/popChoose'
    export default {
        mounted () {
            this.shareIndex();
            this.getList();
        },
        data () {
            return {
                msisdn: this.$route.query.msisdn || '',
                matchList: [],
                ykshList: []
            }
        },
        methods: {
            goToOneCard () {
                this.statisPoint(28);
                this.$axios.post('getActivityState',{
                    rule_type: 2
                })
                .then(res => {
                    if (res.data.meta.success) {
                        this.$router.push({
                            path: '/onecardentry'
                        })
                    }
                })
            },
            getList () {
                this.$axios.post('freshReserveInformation',{
                    msisdn: this.msisdn
                })
                .then(res => {
                    if (res.data.meta.success) {
                        this.matchList = res.data.data.matchList;
                        this.ykshList = res.data.data.ykshList;
                    }
                })
            },
            giveup (list,type,index) {  //放棄 type 1 內地匹配  2 一卡雙號匹配
                let popText = '';
                if (type == 1) {
                    this.statisPoint(29);
                    popText = `
                        <div class="index-popend">為您搶佔的內地號${list.reserve_cmdn}，您確定放棄麽？放棄後，號碼將立即失效，您可重新預佔新的號碼</div>
                    `
                }
                else {
                    this.statisPoint(27);
                    popText = `<div class="index-popend">您確定放棄麽？放棄後，號碼將立即失效，您可重新預佔新的號碼。</div>`
                }
                this.$messagebox.confirm(popText,{
                    confirmButtonText: '確定放棄',
                    cancelButtonText: '取消'
                })
                .then(() => {
                        this.$axios.post('releaseNumber',{
                        uuid: list.uuid
                    })
                    .then(reschild => {
                        if (reschild.data.meta.success) {
                            if (type == 1) {
                                this.matchList.splice(index,1)
                            }
                            else if (type == 2) {
                                this.ykshList.splice(index,1)
                            }
                            // this.$messagebox.alert('放棄成功').then(() => {
                                // this.getList();
                            // });
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>