<template>
    <div class="preheating">
        <div class="preheatingTop indexTop">
            <!-- <img src="../../static/images/preheatingTex.png" class="preheatingTex" /> -->
            <!-- <p class="adText">靚號碼&nbsp;齊齊搶</p> -->
            <p class="adText">
                <!-- <img src="../../static/images/preheatingTex.png" class="preheatingTex" /> -->
                <img src="../../static/images/index-banner-text.png" class="banner-text" alt="18萬個號碼 一次過任您揀">
            </p>
            <div class="detailText"><span>搵內地號碼&nbsp;&nbsp;搶1卡2號</span></div>
        </div>
        <div class="preheatingTrans">
            <div class="preheatingTransCtn">
                <div class="diyTip">帶號碼轉台</div>
                <div class="ctnTop"> 
                    <img class="transPhone" src="../../static/images/preheatingTransPhone.png" />
                    <p class="firstText">轉台加內地號碼<br class="xs-show">內地消費更便利</p>
                    <!-- <p>辦內地銀行卡、<br class="xs-show">網購及登記app必備之選</p> -->
                </div>
                <div class="ctnBtm">
                    <div class="clock">
                        <img src="../../static/images/clock.png" /><strong>10月18日至11月20日</strong>　
                        <p class="extraText">內地號碼火熱開搶中<br class="xs-show">仲有機會搶到尾數一樣內地號碼</p>
                    </div>
                    <div class="diyBtnWrap">
                        <a class="diyBtn">
                            <div class="diyBtnCtn" :class="{'is-end': activeEnd}" @click="statisPoint(3),getActiveStart(1)">
                                {{activeEnd ? '活動已結束': '搶內地號碼'}}
                            </div>
                            <div class="likeShadowBlurry"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="preheatingReady">
            <div class="diyTip diyTip1">新號碼上台</div>
            <p class="titleText"><strong>全新1卡2號　勿失良機</strong></p>
            <p class="titleSubText">新號碼一次過任你揀，搶得早，號碼好</p>
            <ul class="timeCtn clearfix">
                 <li v-for="(list,index) in timeSelect" :key="index" :class="{active: leftTime().inx == index}">
                    <p>{{list.name}}</p>
                    <p v-if="!list.end && list.start">火熱進行中</p>
                    <p v-else-if="!list.start && (leftTime().inx == index)">即將開搶</p>
                    <p v-else-if="!list.start && !list.end">敬請期待</p>
                    <p v-else-if="list.end">已结束</p>
                </li>
            </ul>
            <div class="ctnBtm">
                <div class="countdown-box">
                    <p class="count-tips" v-if="!activeEnd">
                        {{countDownText()}}
                    </p>
                    <div class="count-time" v-if="!activeEnd">
                        <big>{{countTime.day}}</big>天
                        <big>{{countTime.hour}}</big>時
                        <big>{{countTime.minute}}</big>分
                        <big>{{countTime.second}}</big>秒
                    </div>
                </div>
                <div class="diyBtnWrap">
                    <a class="diyBtn">
                        <div class="diyBtnCtn"  :class="{'is-end': activeEnd}" @click="statisPoint(4),getActiveStart(2)">
                            <div class="diyBtnText" v-if="isReserve">敬請期待</div>
                            {{activeEnd ? '活動已結束': '搶全新1卡2號'}}
                        </div>
                        <div class="likeShadowBlurry"></div>
                    </a>
                </div>
            </div>
        </div>
        <div class="index-view-number">
            <div class="container">
                <p>我參與過活動了，查看我已經搶佔的號碼</p>
                <router-link to="/searchinfo" @click.native="statisPoint(5)">立即查看 &gt;</router-link>
            </div>
        </div>
       <st-rule />
       <st-map />
       <st-footer />
       <transition name="alertFade">
            <div class="preheatingAlert" v-show="preheatingAlert" @touchmove.prevent>
                <transition name="alertCtnFade">
                    <div class="preheatingAlertCtn" v-show="preheatingAlert">
                        <div class="close" @click="closeFn()"></div>
                        <ul class="alertUl">
                            <li>
                                <input type="tel" placeholder="輸入您的8位澳門手機號碼/11位內地手機號碼" v-model="msisdn" class="default-input phone" v-va:autoPhone maxlength="11">
                            </li>
                            <li>
                                <div class="inset-code">
                                    <div class="code-input">
                                        <input type="tel" placeholder="輸入短信驗證碼" v-model="keycode" class="default-input" v-va:checkCode maxlength="6">
                                    </div>
                                    <div class="code-btn">
                                        <a v-va-check.phone="countTimeDown" :class="{unclick: checking}">{{vcodeText}}</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <st-insetrule :ruleState.sync = 'ruleState'/>
                        <div class="text-center">
                            <div class="diyBtn" v-va-check="formSubmit">
                                <div class="diyBtnCtn">開搶提醒我</div>
                                <div class="likeShadowBlurry"></div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <transition name="alertFade">
            <div class="preheatingAlert" v-show="remindSuccess"  @touchmove.prevent>
                <transition name="alertCtnFade">
                    <div class="preheatingAlertCtn" v-show="remindSuccess">
                        <div class="close" @click="closeFn2()"></div>
                        <div class="remindSuccess">
                            <img src="../../static/images/clockImg.png" class="clockImg" />
                            <p class="resultText">開搶提醒設置成功</p>
                            <p class="tips">活動開始前一天我們會以短信提醒您，</p>
                            <p class="tips">請留意查收短信通知！</p>
                            <p class="tips">若未收到提醒請致電1888查詢。</p>
                            <a class="remindBtm" @click="closeFn2()">確定</a>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    // import rule from '@/components/rule'
    // import storeMap from '@/components/storeMap'
    let inter = null;
    let interCountDown = null;
    export default {
        mounted () {
            window.sessionStorage.setItem('notShare','1');
            this.leftTime();
            this.countDown();
            if (new Date().getTime() > new Date(this.timeSelect[this.timeSelect.length-1].endTime).getTime()) {
                this.activeEnd = true;
                this.$messagebox({
                    message: '<div class="index-popend">活動已結束，配對成功的用戶，請在8天內前往附近門店辦理，逾期號碼將失效。</div>',
                    confirmButtonText: '我知道了'
                })
            }
        },
        components: {
            // rule,
            // storeMap
        },
        data () {
            return {
                isReserve: false,  //用于判断是否是活动开始还是预留号码期间
                preheatingAlert: false,  //是否显示预留的弹出
                vcodeText:'獲取驗證碼',
                activeEnd: false,  //活动是否结束
                timeSelect: [
                    // {
                    //     name: '10月8-10',
                    //     startTime: '2018/10/08',
                    //     endTime: '2018/10/11',
                    //     start: false,
                    //     end: false,
                    // },
                    {
                        name: '10月18日-20日',
                        startTime: '2018/10/18 10:00:00',
                        endTime: '2018/10/21',
                        start: false,
                        end: false,
                        tips: '10月18日'
                    },
                    {
                        name: '10月28日-30日',
                        startTime: '2018/10/28 10:00:00',
                        endTime: '2018/10/31',
                        start: false,
                        end: false,
                        tips: '10月28日'
                    },
                    {
                        name: '11月8日-10日',
                        startTime: '2018/11/08 10:00:00',
                        endTime: '2018/11/11',
                        start: false,
                        end: false,
                        tips: '11月8日'
                    },
                    {
                        name: '11月18日-20日',
                        startTime: '2018/11/18 10:00:00',
                        endTime: '2018/11/21',
                        start: false,
                        end: false,
                        tips: '11月18日'
                    }
                ],
                countTime: {
                    day: 0,
                    hour: 0,
                    minute: 0,
                    second: 0
                }
            }
        },
        methods: {
            countDown () {
                let day = 0,
                    hour = 0,
                    minute = 0,
                    second = 0;
                let leftSecond = this.leftTime().leftSecond / 1000;

                let getTime = () => {
                    day = Math.floor(leftSecond / (60 * 60 * 24));
                    hour = Math.floor(leftSecond / (60 * 60)) - (day * 24);
                    minute = Math.floor(leftSecond / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(leftSecond) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    leftSecond --;
                    this.countTime = {
                        day: day,
                        hour: hour,
                        minute: minute,
                        second: second
                    }
                }
                inter = setInterval(() => {
                    if (leftSecond < 1 && this.leftTime().inx != null) {
                        leftSecond = this.leftTime().leftSecond / 1000;
                        getTime();
                    }
                    else if (leftSecond < 0 && this.leftTime().inx == null) {
                        clearInterval(inter);
                        this.activeEnd = true;
                    }
                    else {
                        getTime();
                    }
                },1000);
                
            },
            leftTime () {
                let _now = new Date().getTime();
                let _leftSecond = null,inx = null,isOn = false;
                
                for (let i = 0; i< this.timeSelect.length; i++) {
                    let _startTime = new Date(this.timeSelect[i].startTime).getTime(),
                        _endTime = new Date(this.timeSelect[i].endTime).getTime();
                    //如果大于开始時间 小于结束時间
                    if (_now > _startTime && _now <= _endTime) {
                        this.timeSelect[i].start = true;
                        _leftSecond = _endTime - _now;
                        inx = i;
                        isOn = true;
                        break;
                    }
                    //如果大于结束時间
                    else if (_now > _endTime) {
                        this.timeSelect[i].end = true;
                    }
                    //小于开始時间
                    else if (_now < _startTime) {
                        _leftSecond = _startTime - _now;
                        inx = i;
                        break;
                    }
                }
                return {
                    leftSecond: _leftSecond,
                    inx: inx,
                    isOn: isOn
                };
            },
            countDownText () {
                let _leftTime = this.leftTime();
                let _text = '';
                if (_leftTime.inx == 0 && _leftTime.leftSecond > 0 && !_leftTime.isOn) {
                    _text = '距離活動開始還有';
                    this.isReserve = false;
                }
                else if (_leftTime.inx > 0 && _leftTime.leftSecond > 0 && !_leftTime.isOn) {
                    _text = '距離下次活動開始還有';
                    this.isReserve = true;
                }
                else if (_leftTime.isOn) {
                    _text = '本場距離活動結束還有';
                    this.isReserve = false;
                }
                else {
                    _text = '活動已結束';
                    this.isReserve = false;
                }

                return _text
            },
            getActiveStart (type) {
                if (this.activeEnd) {
                    return false;
                }
                //點擊按鈕判斷活動是否已經開始  1配對內地  2一卡兩號
                if (type == 2 && this.isReserve) {  //判断是否抢1卡双号 且活动预留期间
                    this.$messagebox({
                        message:"<div class='pop-preheating-text'><p>活動還未開始，敬請期待哦！</p><p>"+this.timeSelect[this.leftTime().inx].tips+"，不見不散</p></div>",
                        confirmButtonText:"開搶提醒我"
                    }).then(res=>{
                        this.preheatingAlert = true;
                    })
                }
                else {
                    this.$axios.post('getActivityState',{
                        rule_type: type || 1
                    })
                    .then(res => {
                        if (res.data.meta.success) {
                            if (type == 1) {
                                this.$router.push({
                                    path: '/pairentry'
                                })
                            }
                            else {
                                window.sessionStorage.setItem('enterOneCard',1);
                                this.$router.push({
                                    path: '/onecardentry'
                                })
                            }
                        }
                    })
                }  
                
            },
            countTimeDown () {  //倒計時
                if (this.checking) {
                    return false;
                }
                this.$axios.post('sendSmsCode',{
                    msisdn:this.msisdn,
                    type: 2
                })
                .then(res => {
                    if (res.data.meta.success) {
                        let t = 60;
                        this.checking = true;
                        this.vcodeText = `${t}s后重新獲取`
                        interCountDown = setInterval(() => {
                            if (t == 1) {
                                this.checking = false
                                clearInterval(interCountDown);
                                this.vcodeText = '重新獲取'
                                return false;
                            }
                            this.checking = true;
                            t --
                            this.vcodeText = `${t}s后重新獲取`
                        },1000);
                    }
                })
            },
            formSubmit () {    
                
                if (!this.ruleState) {
                    this.$messagebox.alert('請勾選服務條款哦',{
                        confirmButtonText: '確定',
                        title: '提示'
                    });
                    return;
                }
                //埋点
                this.statisPoint(30);
                //短信提醒接口
                this.$axios.post('addPreviewMsisdn',{
                    msisdn: this.msisdn,
                    verificationCode: this.keycode
                }).then(res=>{
                    if(res.data.meta.success){
                        //成功后
                        this.preheatingAlert = false;
                        this.remindSuccess = true;   
                        //初始化弹窗和倒计時
                        this.msisdn = '';
                        this.keycode = '';
                        this.checking = false
                        clearInterval(interCountDown);
                        this.vcodeText = '獲取驗證碼';
                        this.ruleState = false;
                    }
                });
            },
            closeFn(){ //关闭提醒弹窗
                this.preheatingAlert = false;
                this.resetData();
            },
            closeFn2(){ //关闭成功弹窗
                this.remindSuccess = false;
                this.resetData();
            },
            resetData () {
                this.msisdn = '';
                clearInterval(interCountDown);
                this.vcodeText = '獲取驗證碼';
                this.checking = false;
                this.keycode = '';
                this.$vaReset(".preheating");
                this.ruleState = false;
            },
        },
        destroyed () {
            clearInterval(inter);
            clearInterval(interCountDown);
        }
    }

    
</script>

<style scoped lang="less">

.current {
    color: #27a1fb
}

</style>