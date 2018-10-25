<template>
    <div class="pairSuccess">
        <div class="pairSuccessBanner">
            <div class="container">
                <div class="pairSuccessTop">
                    <img src="../../static/images/success.png" class="successImg" />
                    <p class="resultText">恭喜您，預留成功</p>
                    <p class="numText">澳門號碼：{{msisdn}}</p>
                </div>
            </div>
        </div>
        <div class="pairSuccessCtn tosn-pairSuccessCtn">
            <div class="chinaPhoneNum">
                內地副號：<span class="numText">{{reserve_cmdn}}</span>
            </div>
            <div class="tosn-infocode">
                <div class="info-text">
                    <p>此號碼為您預留7天，您可在<span>{{expiry_time.split('-')[0]}}年{{expiry_time.split('-')[1]}}月{{expiry_time.split('-')[2]}}日19:00</span>之前，前往附近門店辦理，逾期將自動取消。</p>
                </div>
                <p class="get-code">
                    提取碼：<big>{{distillcode}}</big>
                </p>
            </div>
        </div>
        <div class="xs-show reserve-share-phone">
            <div class="container">
                <div class="phone-title">
                    <p>好事要大家共享<br>快快分享給你的好友吧</p>
                </div>
                <div class="desc">
                    <p>妳可點擊瀏覽器的分享，分享至微信朋友<br>圈/微信好友/Facebook等</p>
                </div>
                <div class="inset-btn" v-if="screenBrowser != 0">
                    <a @click="showSharePop = true,this.statisPoint(14);">立即分享</a>
                </div>
                <p class="link-index"><router-link to="/" @click.native="statisPoint(13);">回活動首頁 &gt;&gt;</router-link></p>
            </div>
        </div>
        <div class="share-pcbox sm-show">
            <share-pc  pos="down"/>
        </div>
        <st-phoneshare :screenBrowser="screenBrowser" v-if="showSharePop" @closeModal = 'closeModal'/>
        <div class="sm-show pc-link-index">
            <div class="container">
                <p><router-link to="/" @click.native="statisPoint(13);">回活動首頁 &gt;&gt;</router-link></p>
            </div>
        </div>
        <st-map inner="inner"/>
        <div class="default-footer">活動最終解釋權歸中國電信（澳門）有限公司所有</div>
    </div>
</template>

<script>
    import sharePc from '@/components/sharePc.vue'
    export default {
        mounted () {
            this.shareIndex();
            (this.$route.query && this.$route.query.msisdn) && (this.msisdn = this.$route.query.msisdn);
            (this.$route.query && this.$route.query.cmdn) && (this.reserve_cmdn = this.$route.query.cmdn);
            (this.$route.query && this.$route.query.distillcode) && (this.distillcode = this.$route.query.distillcode);
            (this.$route.query && this.$route.query.expiry_time) && (this.expiry_time = this.$route.query.expiry_time);
        },
        data () {
            return {
                showSharePop: false,
                msisdn: '',
                distillcode: '',
                reserve_cmdn: '',
                expiry_time: ''
            }
        },
        components: {
            sharePc
        },
        methods: {
            closeModal (val) {
                this.showSharePop = val
            },
        }
    }
</script>

<style scoped>

</style>