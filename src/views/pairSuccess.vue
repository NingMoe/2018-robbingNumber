<template>
    <div class="pairSuccess">
        <div class="pairSuccessBanner">
            <div class="container">
                <div class="pairSuccessTop">
                    <a class="likeSearch" @click="toSelf('matchchinanumbyself',1)">
                        <img class="searchImg" src="../../static/images/search.png" />
                        搜尋心水數字
                    </a>
                    <img src="../../static/images/success.png" class="successImg" />
                    <p class="resultText">成功搵到內地號碼</p>
                    <p class="numText">澳門號碼：{{msisdn}}</p>
                </div>
            </div>
        </div>
        <div class="pairSuccessCtn">
            <div class="chinaPhoneNum">
                內地號碼：<span class="numText">{{cmdn}}</span>
            </div>
        </div>
        <div class="comFixBtm">
            <div class="comFixBtmCtn">
                <div class="hasChooseChinaNum">
                    已選内地號碼：<span class="numText">{{cmdn}}</span>
                </div>
                <a class="preButton" @click="reserveMsisdn">預留號碼</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
            // this.$axios.post('releaseNumber',{
            //     uuid:"8c4efe5e-12ad-499b-9eab-737ffa0d0563"
            // })
            if (window.sessionStorage.getItem('enterOneCard') != 1) {
                this.$router.push({
                    path: '/'
                })
                return false;
            }
            this.$axios.post('getNumber', {
                rule_type: 1,
                number: this.msisdn,
                msisdn: this.msisdn
            })
            .then(res => {
                if (res.data.meta.success) {
                    this.cmdn = res.data.data.msnList[0].cmdn;
                    this.uuid = res.data.data.uuid;
                }
            })
        },
        data(){
            return{
                cmdn: '',
                msisdn: this.$route.query.msisdn,
                uuid: ''
            }
        },
        methods: {
            reserveMsisdn () {  //預留號碼
                this.$axios.post('reserveMsisdn', {
                    msisdn: this.msisdn,
                    reserve_cmdn: this.cmdn,
                    type: 1
                })
                .then(res => {
                    if (res.data.meta.success) {
                        this.$router.push({
                            path: '/reservesuccess',
                            query: {
                                msisdn: res.data.data.msisdn,
                                cmdn: res.data.data.reserve_cmdn,
                                distillcode: res.data.data.distillcode,
                                expiry_time: res.data.data.expiry_time
                            }
                        })
                    }
                })
            },
            toSelf (src,type) {
                this.$axios.post('releaseNumber',{
                    uuid: this.uuid
                })
                .then(res => {
                    if (res.data.meta.success) {
                        this.$router.push({
                            path: '/'+src,
                            query: {
                                msisdn: this.msisdn,
                                type: type
                            }
                        })
                        // this.$messagebox.alert('放棄成功');
                    }
                })
                // $router.push({path: '/matchchinanumbyself',query: {msisdn: msisdn,type: 1}})
            }
        }
    }
</script>

<style scoped>

</style>