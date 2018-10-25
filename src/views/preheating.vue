<template>
    <div class="preheating">
        <img 
            class="xs-show clockRemindImg" 
            src="../../static/images/clock_phone.png"
            @click="preheatingAlert = !preheatingAlert;"
         />
        <img 
            class="sm-show  clockRemindImg"  
            src="../../static/images/clock_pc.png"
            @click="preheatingAlert = !preheatingAlert;"
        />
        <div class="preheatingTop">
            <p class="adText">
                <!-- <img src="../../static/images/preheatingTex.png" class="preheatingTex" /> -->
                <img src="../../static/images/index-banner-text.png" class="banner-text" alt="18萬個號碼 一次過任您揀">
            </p>
            <div class="detailText"><span>搵內地號碼&nbsp;&nbsp;搶1卡2號</span></div>
            <div class="preheatCountDown">
                <p class="preheatCountDownTips">{{timeDown}}</p>
                <div class="preheatCountDownCtn" id="timerCountDown" v-show="showTimeDown">
                    <span>2</span>天
                    <span>8</span>時
                    <span>45</span>分
                    <span>18</span>秒
                </div>
            </div>
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
                        <p class="extraText">內地號碼即將開搶<br class="xs-show">仲有機會搶到尾數一樣內地號碼</p>
                    </div>
                    <div class="diyBtnWrap">
                        <a class="diyBtn"  @click="orderTransFn">
                            <div class="diyBtnCtn">
                                <div class="diyBtnText">敬請期待</div>
                                搶內地號碼
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
                <!-- <li class="active">
                    <p>10月8-10</p>
                    <p>即将开抢</p>
                </li> -->
                <li  class="active">
                    <p>10月18日-20日</p>
                    <p>即將開搶</p>
                </li>
                <li>
                    <p>10月28日-30日</p>
                    <p>未開搶</p>
                </li>
                <li>
                    <p>11月8日-10日</p>
                    <p>未開搶</p>
                </li>
                <li>
                    <p>11月18日-20日</p>
                    <p>未開搶</p>
                </li>
            </ul>
            <div class="ctnBtm">
                <div class="clock">
                    <img src="../../static/images/clock.png" /><strong>10月18日即將開搶</strong>
                </div>
                <div class="diyBtnWrap">
                    <a class="diyBtn" @click="orderDbFn">
                        <div class="diyBtnCtn">
                            <div class="diyBtnText">敬請期待</div>
                            搶全新一卡兩號
                        </div>
                        <div class="likeShadowBlurry"></div>
                    </a>
                </div>
            </div>
        </div>
        <st-rule />
        <st-map/>
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
                                        <a v-va-check.phone="countdown" :class="{unclick: checking}">{{vcodeText}}</a>
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
    let inter;
    export default {
        data(){
            return {
                ruleState: false,
                timeDown:'活動還未啟動',
                showTimeDown: false,
                buyFlag: false,
                vcodeText:'獲 取',
                checking:false,
                preheatingAlert:false,
                remindSuccess: false,
                msisdn:'',
                keycode:'',
            }
        },
        mounted(){
            this.active1();
        },

        methods:{
            /**
             * 用于活动時间
             * options:{
             * 		readyTime:, 准备开始倒计時的時间 格式：'2018-09-17T00:00:00'
             * 		startTime: , 开始倒计時時间 格式：'2018-09-18T00:00:00'
             * 		endTime: ,结束時间 格式：'2018-09-19T00:00:00'
             * 		ele: , 插入到的元素
             * }
             * ingCb,进行中回调
             * ingEndCb, 进行中结束的回调
             * readyIngCb, 准备中的回调
             * readyEndCb, 准备结束的回调
             * noReadyCb, 准备都没开始结束的回調
             * noReadyIngCb, 准备都没开始中的回調
            */
            activeDate(options,ingCb,ingEndCb,readyIngCb,readyEndCb,noReadyIngCb,noReadyCb){
                let nowDate = new Date(),
                    nowTime = +nowDate,
                    readyDate = new Date(options.readyTime),
                    readyTimes = +readyDate,
                    startDate = new Date(options.startTime),
                    startTimes = +startDate,
                    endDate = new Date(options.endTime),
                    endTimes = +endDate,
                    times;
                console.log(nowDate)
                if(endTimes < nowTime){
                    console.log("活动结束");
                    ingEndCb&&ingEndCb();
                }else if(nowTime >= startTimes){
                    console.log("活动进行中");
                    ingCb&&ingCb();
                    times = (endTimes-nowTime)/1000;
                    this.timeCountDown(times,options.ele,ingEndCb);
                }else if(nowTime >= readyTimes){
                    times = (startTimes-nowTime)/1000;
                    readyIngCb&&readyIngCb();
                    this.timeCountDown(times,options.ele,readyEndCb);
                    console.log("活动准备开始");
                }else{
                    console.log("活动连准备都没开始");
                    times = parseInt((readyTimes - nowTime)/1000);
                    noReadyIngCb&&noReadyIngCb();
                    (function fn(times,noReadyCb){
                        setTimeout(() => {
                            times = times -1;
                            if(times > 0){
                                fn(times,noReadyCb);
                            }else{
                                noReadyCb&&noReadyCb();
                            }	
                        }, 1000,times);
                    })(times,noReadyCb);
                }			
            },
            /**
             * times: 传入毫秒段
             * cc: 插入到的那个元素
            */
            timeCountDown(times,cc,cb){ 
                let	leftsecond = parseInt(times), 
                    day = Math.floor(leftsecond/(60*60*24)),//天数
                    hour = Math.floor((leftsecond-day*60*60*24)/(60*60)),//小時数
                    minute = Math.floor((leftsecond-day*60*60*24-hour*3600)/60),//分钟数
                    second = Math.floor(leftsecond-day*60*60*24-hour*3600-minute*60);//秒数
                if(day>0){
                    cc.innerHTML ="<span>"+day+"</span>"+"<small>"+"天" +"</small>"+ "<span>"+hour+"</span>"+"<small>"+"時"+"</small>"+"<span>"+minute+"</span>"+"<small>"+"分"+"</small>"    +"<span>"+second+"</span>"+"<small>"+"秒"+"</small>";
                }else if(day == 0){
                    cc.innerHTML = "</small>"+ "<span>"+hour+"</span>"+"<small>"+"時"+"</small>"+"<span>"+minute+"</span>"+"<small>"+"分"+"</small>"+"<span>"+second+"</span>"+"<small>"+"秒"+"</small>";
                }
                setTimeout(() => {
                    times = times -1;
                    if(times > 0){
                        this.timeCountDown(times,cc,cb);
                    }else{
                        cb&&cb();
                    }	
                }, 1000);
            },
            // activeDate(options,ingCb,ingEndCb,readyIngCb,readyEndCb,noReadyIngCb,noReadyCb){
            active1(){
                var options = {
                    readyTime: '2018/09/01', 
                    startTime: '2018/10/18 10:00:00' , 
                    endTime: '2018/11/10' ,
                    ele: document.getElementById('timerCountDown'),
                }
                this.activeDate(options,
                    ()=>{
                        this.timeDown = "活動正在火熱進行中";
                        this.showTimeDown = true;
                        this.buyFlag = true;
                    }, //ingCb
                    ()=>{
                        this.timeDown = "活動已結束";
                        this.showTimeDown = false;
                        this.buyFlag = false;
                    }, //ingEndCb
                    ()=>{
                        this.timeDown = "距離活動開始還有";
                        this.showTimeDown = true;
                        this.buyFlag = false;
                    }, //readyIngCb
                    ()=>{
                        this.timeDown = "活動正在火熱進行中";
                        this.showTimeDown = true;
                        this.buyFlag = true;
                        // this.active1;
                        window.location.reload();
                    }, //readyEndCb
                    ()=>{
                        this.timeDown = "敬請期待";
                        this.showTimeDown = false;
                        this.buyFlag = false;
                    }, //noReadyIngCb
                    ()=>{
                        this.timeDown = "敬請期待";
                        this.showTimeDown = false;
                        this.buyFlag = false;
                        this.active1;
                    } //noReadyCb
                );
            },
            orderTransFn(){//攜號
                this.statisPoint(1);
                if(!this.buyFlag){
                    this.$messagebox({
                        message:"<div class='pop-preheating-text'><p>活動還未開始，敬請期待哦！</p><p>10月18日，不見不散</p></div>",
                        confirmButtonText:"開搶提醒我"
                    }).then(res=>{
                        this.preheatingAlert = true;
                    })
                    
                }
            },
            orderDbFn(){//一卡雙號
                this.statisPoint(2);
                 if(!this.buyFlag){
                    this.$messagebox({
                        message:"<div class='pop-preheating-text'><p>活動還未開始，敬請期待哦！</p><p>10月18日，不見不散</p></div>",
                        confirmButtonText:"開搶提醒我"
                    }).then(res=>{
                        this.preheatingAlert = true;
                    })
                }
            },
            countdown () {  //倒計時
                if (this.checking) {
                    return false;
                }
                this.$axios.post('sendSmsCode',{
                    msisdn:this.msisdn
                })
                .then(res => {
                    if (res.data.meta.success) {
                        let t = 60;
                        this.checking = true;
                        this.vcodeText = `${t}s后重新獲取`
                        inter = setInterval(() => {
                            if (t == 1) {
                                this.checking = false
                                clearInterval(inter);
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
                        clearInterval(inter);
                        this.vcodeText = '獲 取';
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
                this.keycode = '';
                this.$vaReset(".preheating");
                this.ruleState = false;
            }
        },
        destroyed () {
            clearInterval(inter);
        }
    }
</script>

<style scoped>

</style>