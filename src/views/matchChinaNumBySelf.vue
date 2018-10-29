<template>
    <div class="matchNum">
        <div class="matchNumBanner">
            <div class="container">
                <div class="matchNumTop">
                    <a class="likeSearch" @click="toNumberSearch">
                        <img class="searchImg" src="../../static/images/return.png" />
                        按號碼搜尋
                    </a>
                    <p class="resultText">
                        澳門號碼：<br class="xs-show">
                        <span class="numText">{{msisdn}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="searchPhone">
            <div class="searchInputWrap clearfix">
                <input type="tel" class="searchNum4" v-model="searchText" maxLength="4" v-va:searchNum4  placeholder="請輸入您的1-4位心水數字" />
                <a class="searchBtn" v-va-check.searchNum4 = 'searchFn'>搜尋</a>
            </div>
        </div>
        <div v-if="phoneNumArr.length">
            <div class="bgf2f2f2" v-if="numberType != 4">
                <div class="w_chooseNum">
                    <p class="titleText">選擇您心水的內地號碼</p>
                    <div class="w_chooseNumWrap">
                        <ul class="w_chooseNumCtn clearfix">
                            <li :class="{'active':chooseNumFlag==index}" v-for="(list,index) in phoneNumArr" :key="index" @click="chooseNumFn(list,index)">{{list.cmdn}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="numberType == 4">
                <div class="w_chooseNum">
                    <p class="titleText">抱歉！沒有您搜尋的號碼！</p>
                    <p class="sub-titletext">為您推薦以下號碼</p>
                    <div class="w_chooseNumWrap">
                        <ul class="w_chooseNumCtn clearfix">
                            <li :class="{'active':chooseNumFlag==index}" v-for="(list,index) in phoneNumArr" :key="index" @click="chooseNumFn(list,index)">{{list.cmdn}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <st-insetrule :ruleState.sync = 'ruleState'/>
        </div>
        <div v-if="!phoneNumArr.length" class="hasNoMatchNum">
            搜尋您心水的內地號碼
        </div>
        <div class="comFixBtm">
            <div class="comFixBtmCtn">
                <div class="hasChooseChinaNum">
                    已選内地副號：<span class="numText">{{chooseNum}}</span>
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
        },
        data(){
            return{
                isLoading: true,
                numberType: 1,  //区分是否是没有搜索到  推荐的号码
                chooseNumFlag: -1,//默认不选择
                chooseNum: '',
                phoneNumArr:[],
                ruleState:false,
                searchText:'',//搜尋的數字
                msisdn: this.$route.query.msisdn ||'',
                uuid: ''
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
                if(this.phoneNumArr.length&&!this.ruleState){
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
                this.statisPoint(11);
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
            searchFn(){
                // console.log(this.searchText);
                this.statisPoint(12);
                // if (this.uuid != '') {
                //     this.$axios.post('releaseNumber',{
                //         uuid: this.uuid
                //     },{
                //         auth: {
                //             endNone: true 
                //         }
                //     }).then(res => {
                //         //if (res.data.meta.success) {
                //             this.uuid = '';
                //             this.getList();
                //         //}
                //     })
                // }
                // else {
                    this.getList();
                // }
            },
            getList () {
                this.$axios.post('getNumber',{
                    rule_type: 1,
                    number: this.searchText,
                    msisdn: this.$route.query.msisdn ||''
                })
                .then(res => {
                    if (res.data.meta.success) {
                        if (res.data.data.type == 4) {
                            this.numberType = 4
                        }
                        else {
                            this.numberType = 1
                        }
                        this.phoneNumArr = res.data.data.msnList;
                        this.chooseNumFlag = -1;
                        this.chooseNum = "";
                        this.uuid = res.data.data.uuid;
                    }
                    else {
                        this.phoneNumArr = [],
                        this.uuid = ''
                    }
                })
            },
            toNumberSearch () {
                this.statisPoint(10);
                let _url = ''
                if (this.$route.query.type == 1) {
                    _url = 'pairsuccess'
                }
                else {
                    _url = 'matchchinanumbynum'
                }
                this.$router.push({
                    path: '/'+_url,
                    query: {
                        msisdn: this.msisdn,
                    }
                })
                // if (this.uuid != '') {
                //     this.$axios.post('releaseNumber',{
                //         uuid: this.uuid
                //     },{
                //         auth: {
                //         endNone: true 
                //         }
                //     })
                //     .then(res => {
                //         //if (res.data.meta.success) {
                //             this.$router.push({
                //                 path: '/'+_url,
                //                 query: {
                //                     msisdn: this.msisdn,
                //                 }
                //             })
                //         //}
                //     })
                // }
                // else {
                //     this.$router.push({
                //         path: '/'+_url,
                //         query: {
                //             msisdn: this.msisdn,
                //         }
                //     })
                // }
            }
        }
    }
</script>

<style scoped>

</style>