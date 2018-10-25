<template>
    <div class="pairentry-box">
        <div class="form-info">
            <div class="container">
                <h3>輸入信息查看我的搶佔號碼</h3>
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
        <div class="inset-btn text-center m-t-20">
            <div class="diyBtn" v-va-check="formSubmit">
                <div class="diyBtnCtn">查看已搶佔號碼</div>
                <div class="likeShadowBlurry"></div>
            </div>
        </div>
    </div>
</template>

<script>
    let inter;
    import sharePc from '@/components/sharePc.vue'
    export default {
        mounted () {
            // console.log(this.$route)
        },
        components: {
            sharePc
        },
        data () {
            return {
                showSharePop: false,
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
                    type: 3
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
                this.statisPoint(25);
                this.$axios.post('verifyUserInformation', {
                    msisdn: this.msisdn,
                    verifyCode: this.keycode,
                })
                .then(res => {
                    if (res.data.meta.success) {
                        if (res.data.data.returnType == 2) {
                            this.$messagebox.alert('您暫未參與任何活動，請先搶佔后再來查詢',{
                                confirmButtonText: '去搶佔'
                            })
                            .then(() => {
                                this.$router.push({path: '/'})
                            })
                        }
                        else {
                            this.$router.push({
                                path: '/searchdetail',
                                query: {
                                    msisdn: this.msisdn
                                }
                            })
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