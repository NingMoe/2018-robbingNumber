<template>
    <div class="matchNum">
        <div class="matchNumBanner">
            <div class="container">
                <div class="matchNumTop">
                    <a class="likeSearch"  @click="toSelf('matchchinanumbyself',2)">
                        <img class="searchImg" src="../../static/images/search.png" />
                        按心水數字搜尋
                    </a>
                    <p class="resultText">
                        澳門號碼：<br class="xs-show">
                        <span class="numText">{{msisdn}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- <div v-if="phoneNumArr.length"> -->
            <div class="w_chooseNum">
                <p class="titleText">選擇您心水的內地號碼</p>
                <div class="w_chooseNumWrap">
                    <ul class="w_chooseNumCtn clearfix">
                        <li :class="{'active':chooseNumFlag==index}" v-for="(list,index) in phoneNumArr" :key="index" @click="chooseNumFn(list,index)">{{list.cmdn}}</li>
                    </ul>
                </div>
            </div>
            <st-insetrule :ruleState.sync = 'ruleState'/>
        <!-- </div> -->
        <!-- <div v-if="!phoneNumArr.length" class="hasNoMatchNum">
            快來搜索您的心水號碼吧
        </div> -->
        <div class="comFixBtm">
            <div class="comFixBtmCtn">
                <div class="hasChooseChinaNum">
                    已選内地號碼：<span class="numText">{{chooseNum}}</span>
                </div>
                <a href="javascript:void(0);" class="preButton" @click="orderReadyNumFn">我要這個號碼</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
            if (window.sessionStorage.getItem('notShare') != '1') {
                this.$router.push({
                    path: '/'
                })
                return false;
            }
            this.$axios.post('getNumber',{
                rule_type: 1,
                number: this.$route.query.msisdn ||'',
                msisdn: this.$route.query.msisdn ||''
            })
            .then(res => {
                if (res.data.meta.success) {
                    this.phoneNumArr = res.data.data.msnList;
                    this.uuid = res.data.data.uuid
                }
            })
        },
        data(){
            return{
                isLoading: true,
                chooseNumFlag: -1,//默认不选择
                chooseNum: '',
                phoneNumArr:[],
                ruleState:false,
                msisdn: this.$route.query.msisdn ||''
            }
        },
        methods:{
            chooseNumFn(list,index){
                this.chooseNumFlag = index;
                this.chooseNum = list.cmdn;
            },
            orderReadyNumFn(){
                if (!this.isLoading) {
                    return false;
                }
                if(!this.ruleState){
                    this.$messagebox.alert('請先閱讀條款及細則並勾選同意',{
                        confirmButtonText: '確定',
                        title: '提示'
                    });
                    return;
                }
                if(!this.chooseNum){
                    this.$messagebox.alert('請選擇號碼',{
                        confirmButtonText: '確定',
                        title: '提示'
                    });
                    return;
                }
                this.isLoading = false;
                this.statisPoint(9);
                this.$axios.post('reserveMsisdn', {
                    msisdn: this.msisdn,
                    reserve_cmdn: this.chooseNum,
                    type: 1
                })
                .then(res => {
                    this.isLoading = true;
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
                }).catch(err => {
                    this.isLoading = true;
                });
            },
            toSelf (src,type) {
                this.statisPoint(8);
                this.$axios.post('releaseNumber',{
                    uuid: this.uuid
                },{
                    auth: {
                       endNone: true 
                    }
                })
                .then(res => {
                    // if (res.data.meta.success) {
                        this.$router.push({
                            path: '/'+src,
                            query: {
                                msisdn: this.msisdn,
                                type: type
                            }
                        })
                    // }
                })
            }
        }
    }
</script>

<style scoped>

</style>