<template>
    <div class="pairentry-box">
        <div class="form-info">
            <div class="container">
                <h3>輸入信息，立即搶心水號碼</h3>
                <ul>
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
            </div>
        </div>
        <st-insetrule :ruleState.sync = 'ruleState'/>
        <div class="inset-btn text-center">
            <div class="diyBtn" v-va-check="formSubmit">
                <div class="diyBtnCtn">立即搶佔</div>
                <div class="likeShadowBlurry"></div>
            </div>
        </div>
        <div class="share-box xs-show" :class="{'share-box-flex' : screenBrowser != 0}">
            <div class="inner-text">
                分享好友，幫妳賺好運氣，搶靚號得心應手！
            </div>
            <div class="inner-btn" v-if="screenBrowser != 0">
                <a @click="showSharePop = true;statisPoint(19);">立即分享</a>
            </div>
            <div class="inner-text" v-if="screenBrowser == 0">
                妳可點擊瀏覽器的分享，分享至微信朋友圈/微信好友/Facebook等
            </div>
        </div>
        <div class="share-pcbox sm-show">
            <share-pc/>
        </div>
        <st-phoneshare :screenBrowser="screenBrowser" v-if="showSharePop" @closeModal = 'closeModal'/>
        <div class="default-footer">活動最終解釋權歸中國電信（澳門）有限公司所有</div>
    </div>
</template>

<script>
    let inter;
    import sharePc from '@/components/sharePc.vue'
    export default {
        mounted () {
            if (window.sessionStorage.getItem('enterOneCard') != 1) {
                this.$router.push({
                    path: '/'
                })
                return false;
            }
        },
        components: {
            sharePc
        },
        data () {
            return {
                showSharePop: false,
                ruleState: false,
                checking: false,  //是否获取验证码中
                vcodeText: '獲取驗證碼',
                msisdn: '',  //手機號
                keycode: ''  //驗證碼
            }
        },
        methods: {
            closeModal (val) {
                this.showSharePop = val
            },
            countdown () {  //倒計時
                if (this.checking) {
                    return false;
                }
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

                this.$axios.post('sendSmsCode',{
                    msisdn:this.msisdn,
                    type: 2
                });
            },
            formSubmit () {
                if (!this.ruleState) {
                    this.$messagebox.alert('請先閱讀條款及細則並勾選同意',{
                        confirmButtonText: '確定',
                        title: '提示'
                    });
                    return;
                }

                this.statisPoint(18);
                // 短信提醒接口
                this.$axios.post('verifyUserInformation',{
                    msisdn: this.msisdn,
                    verifyCode: this.keycode,
                    type:'2'
                }).then(res=>{
                    // console.log(res);
                    if(res.data.meta.success){
                        let data = res.data.data;
                        if(data.ykshList && data.ykshList.length >= 4){
                            let hasFourNum = [],
                                length = data.ykshList.length;

                                hasFourNum.push("<div class= 'index-popend'>");
                                // hasFourNum.push('<p>您搶佔的雙號如下：</p>');
                                // for(let i = 0; i < length; i++){
                                //     hasFourNum.push('<p>'+'澳門號'+(i+1)+data.ykshList[i].reserve_msisdn +'</p>');
                                //     hasFourNum.push('<p>'+'內地號'+(i+1)+data.ykshList[i].reserve_cmdn +'</p>');
                                // }
                                // hasFourNum.push('<p>已幫您預留，請在11月26號之前 前往附近門市辦理，逾期號碼將失效。</p>');
                                // hasFourNum.push('<p>提取碼：××××</p>');
                                hasFourNum.push('一個號碼只能搶佔四組號碼，您已經搶佔四組了哦');
                                hasFourNum.push('</div>');
                                
                            this.$messagebox({
                                message:hasFourNum.join(''),
                                confirmButtonText:'查看我搶佔的號碼'
                            }).then(()=>{
                                this.$router.push({
                                    path:'searchdetail',
                                    query:{
                                        msisdn: this.msisdn
                                    }
                                });
                            });
                            return ;
                        }

                        this.$router.push({
                            path:'onecardmatchnumbyself',
                            query:{
                                msisdn: this.msisdn
                            }
                        });
                    }
                });
            }
        },
        destroyed () {
            clearInterval(inter);
        }
    }
</script>

<style scoped>

</style>