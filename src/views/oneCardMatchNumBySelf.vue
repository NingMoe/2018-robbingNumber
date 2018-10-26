<template>
    <div class="matchNum double">
        <div class="matchNumBanner">
            <div class="container">
                <div class="matchNumTop">
                    <p class='oneCardBannerText'>輸入心水數字，搶1卡2號</p>
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
                    <p class="titleText">選擇您心水的1卡2號</p>
                    <div class="w_chooseNumWrap">
                        <ul class="w_chooseNumCtn w_chooseLeft clearfix">
                            <li class="lineHeightUP" :class="{'active':chooseNumFlag==index}" v-for="(list,index) in phoneNumArr" :key="index" @click="chooseNumFn(list,index)">
                                <p>澳門號 {{list.msisdn}}</p>
                                <p>內地號 {{list.cmdn}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div class="w_chooseNum" v-if="numberType == 4">
                    <p class="titleText">抱歉！沒有您搜尋的號碼！</p>
                    <p class="sub-titletext">為您推薦以下號碼</p>
                    <div class="w_chooseNumWrap">
                        <ul class="w_chooseNumCtn w_chooseLeft clearfix">
                            <li class="lineHeightUP" :class="{'active':chooseNumFlag==index}" v-for="(list,index) in phoneNumArr" :key="index" @click="chooseNumFn(list,index)">
                                <p>澳門號 {{list.msisdn}}</p>
                                <p>內地號 {{list.cmdn}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!phoneNumArr.length" class="hasNoMatchNum">
            快來搜索您的心水號碼吧
        </div>
        <div class="comFixBtm bgFFF">
            <div class="comFixBtmCtn double">
                <div class="hasChooseChinaNum ">
                    <div>
                        已<br>選
                    </div>
                    <div>
                        <p>澳門號碼：<span class="numText">{{chooseNumMacao}}</span></p>
                        <p>內地號碼：<span class="numText">{{chooseNumChina}}</span></p>
                    </div>
                </div>
                <a href="javascript:void(0);" class="preButton" @click="orderReadyNumFn">立即搶佔</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isLoading: true,
                numberType: 1,  //区分是否是没有搜索到  推荐的号码
                chooseNumFlag: -1,//默认不选择
                chooseNumChina: '',
                chooseNumMacao: '',
                phoneNumArr:[
                    // {
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },
                    // {
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },{
                    //     msisdn:12345678,
                    //     cmdn:12345678912
                    // },
                ],
                ruleState:false,
                searchText:'',//搜尋的數字
                uuid:'',//用于釋放號碼
                distillcode:'',//提取码
                expiry_time: '',//提取截止期
                msisdn: '',//
            }
        },
        mounted(){
            if (window.sessionStorage.getItem('enterOneCard') != 1) {
                this.$router.push({
                    path: '/'
                })
                return false;
            }
            this.msisdn = this.$route.query.msisdn ? this.$route.query.msisdn : '';
            this.getNumberFn();
        },
        methods:{
            chooseNumFn(list,index){
                this.chooseNumFlag = index;

                this.chooseNumChina = list.cmdn;
                this.chooseNumMacao = list.msisdn;               
            },
            orderReadyNumFn(){
                if (!this.isLoading) {
                    return false;
                }
                if(!this.chooseNumChina){
                    this.$messagebox.alert('請選擇號碼',{
                        confirmButtonText: '確定',
                        title: '提示'
                    });
                    return;
                }
                this.isLoading = false;
                this.statisPoint(20);
                this.$axios.post('reserveMsisdn',{
                    msisdn: this.msisdn,
                    reserve_cmdn: this.chooseNumChina,
                    reserve_msisdn: this.chooseNumMacao,
                    type: '2'
                }).then(res=>{
                    this.isLoading = true;
                    if(res.data.meta.success){
                        let data = res.data.data;
                        this.expiry_time = data.expiry_time;
                        this.distillcode = data.distillcode;

                        this.$router.push({
                            path:'onecardsuccess',
                            query:{
                                cmdn: data.reserve_cmdn,
                                msisdn: data.reserve_msisdn,
                                expiry_time: this.expiry_time,
                                distillcode: this.distillcode
                            }
                        });
                    }
                })
                .catch(err => {
                    this.isLoading = true;
                });
                
            },
            searchFn(){
                this.statisPoint(21);
                if(!this.uuid){
                    this.getNumberFn();
                }else{
                    this.$axios.post('releaseNumber',{
                        uuid: this.uuid
                    },{
                        auth: {
                            endNone: true 
                        }
                    }).then(res=>{
                        this.uuid = '';
                        this.getNumberFn();
                        // if(res.data.meta.success){
                        //     // let data = res.data.data;
                        //     // if(data.resultCode == 0){
                        //     //     this.getNumberFn();
                        //     // }else{
                        //     //     this.$messagebox.alert('释放失败请重试！',{
                        //     //         confirmButtonText: '確定',
                        //     //         title: '提示'
                        //     //     });
                        //     // }
                            
                        // }
                        // else {
                            
                        // }
                    })
                }
                
            },
            getNumberFn(){
                this.$axios.post('getNumber',{
                    number: this.searchText,
                    rule_type: '2',
                    msisdn: this.$route.query.msisdn ||''
                }).then(res=>{
                    if(res.data.meta.success){
                        if (res.data.data.type == 4) {
                            this.numberType = 4
                        }
                        else {
                            this.numberType = 1
                        }
                        this.phoneNumArr = res.data.data.msnList;
                        this.uuid = res.data.data.uuid;
                        this.chooseNumFlag = -1;
                        this.chooseNumChina = "";
                        this.chooseNumMacao = "";
                    }
                    else {
                        this.uuid = '';
                        this.phoneNumArr = []
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>