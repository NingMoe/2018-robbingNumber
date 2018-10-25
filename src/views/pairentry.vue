<template>
    <div class="pairentry-box">
        <div class="form-info">
            <div class="container">
                <h3>輸入信息搜尋內地號碼</h3>
                <!-- <p class="text-tips">請輸入需要增加內地號碼之澳門號碼</p> -->
                <ul>
                    <li>
                        <input type="tel" placeholder="請輸入需要增加內地號碼之澳門號碼" v-model="msisdn" class="default-input phone" v-va:macaoPhone maxlength="8">
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
                <div class="diyBtnCtn">立即搜尋內地號碼</div>
                <div class="likeShadowBlurry"></div>
            </div>
        </div>
        <div class="share-box xs-show" :class="{'share-box-flex' : screenBrowser != 0}">
            <div class="inner-text">
                分享好友，幫妳賺好運氣，搶靚號得心應手！
            </div>
            <div class="inner-btn" v-if="screenBrowser != 0">
                <a @click="showSharePop = true,statisPoint(7)">立即分享</a>
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
            this.shareIndex();
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

                this.$axios.post('sendSmsCode',{
                    msisdn: this.msisdn,
                    type: 1
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
                        },1000)
                    }
                })
                
            },
            formSubmit () {
                if (!this.ruleState) {
                    this.$messagebox.alert('請先閱讀條款及細則並勾選同意',{
                        confirmButtonText: '確定',
                        title: '提示'
                    });
                    return false;
                }
                this.statisPoint(6);
                this.$axios.post('verifyUserInformation', {
                    msisdn: this.msisdn,
                    verifyCode: this.keycode,
                    type: 1
                })
                .then(res => {  //matchType 1 完全匹配 2 不完全匹配  3匹配不到   returnType 1 有预留记录  2 没有预留记录
                    if (res.data.meta.success) {
                        if (res.data.data.matchType == 1 && res.data.data.returnType == 2) {
                            this.$router.push({
                                path: '/pairsuccess',
                                query: {
                                    msisdn: res.data.data.msisdn
                                }
                            })
                        }
                        else if (res.data.data.matchType == 2 && res.data.data.returnType == 2) {
                            this.$router.push({
                                path: '/matchchinanumbynum',
                                query: {
                                    msisdn: res.data.data.msisdn
                                }
                            })
                        }
                        else if (res.data.data.matchType == 3 && res.data.data.returnType == 2) {
                            this.$router.push({
                                path: '/matchchinanumnone',
                                query: {
                                    msisdn: res.data.data.msisdn
                                }
                            })
                        }
                        else if (res.data.data.returnType == 1) {
                            // 閣下已預留內地號碼12913788123，請在10月18號之前前往附近門市辦理，逾期號碼將會失效。提取碼：××××
                            // {{expiry_time.split('-')[0]}}
                            this.$messagebox.alert(
                                `<div class="index-popend">閣下已預留內地號碼${res.data.data.cmdn}，
                                請在${res.data.data.expiry_time.split('-')[1]}月${res.data.data.expiry_time.split('-')[2]}日19:00之前前往附近門市辦理，逾期號碼將會失效。提取碼：${res.data.data.distill_code}</div>`,{
                                    confirmButtonText: '我知道了',
                                    // cancelButtonText: '放棄預佔號碼',
                                })
                            // .then(() => {},() => {
                            //     // 內地號碼12913788123，確定放棄？放棄後，號碼將立即失效。閣下可重新找另一內地號碼。
                            //     this.$messagebox.confirm(
                            //         `<div class="index-popend">內地號碼${res.data.data.cmdn}，
                            //         確定放棄？放棄後，號碼將立即失效。閣下可重新找另一內地號碼。</div>`,{
                            //             confirmButtonText: '確定放棄',
                            //             cancelButtonText: '取消'
                            //         }
                            //     )
                            //     .then(() => {
                            //         this.$axios.post('releaseNumber',{
                            //             uuid: res.data.data.uuid
                            //         })
                            //         .then(reschild => {
                            //             if (reschild.data.meta.success) {
                            //                 this.$messagebox.alert('放棄成功',{
                            //                     confirmButtonText: '確定',
                            //                     title: '提示'
                            //                 });
                            //             }
                            //         })
                            //     })
                            // })
                        }
                        else if (res.data.data.returnType == 3) {
                            this.$messagebox.alert(
                                `<div class="index-popend">閣下已經辦理過內地號碼${res.data.data.cmdn}，請放心使用。</div>`, {
                                    confirmButtonText: '我知道了'
                                }
                            )
                        }
                    }
                })
            }
        },
        destroyed () {
            clearInterval(inter);
        }
    }
</script>

<style scoped>

</style>