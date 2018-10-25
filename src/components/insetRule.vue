<template>
    <div class="insetrule-box">
        <div class="container">
            <ul>
                <li>
                    <!-- <span class="number">1</span> -->
                    <p>本人同意中國電信（澳門）有限公司使用本人提供之個人資料進行遊戲活動</p>
                </li>
                <li>
                    <!-- <span class="number">2</span> -->
                    <p>本人願意接受有關中國電信（澳門）有限公司其它優惠推廣之短訊</p>
                </li>
                <li>
                    <!-- <span class="number">3</span> -->
                    <p>中國電信（澳門）有限公司保留活動最終決定權</p>
                </li>
                <!-- <li>
                    <p>當您進入遊戲活動，即代表您同意中國電信（澳門）有限公司蒐集、處理及使用您的個人資料作相關之活動及服務申請。</p>
                </li> -->
            </ul>
            <div class="box-checkbox">
                <div class="checkbox-box">
                    <input type="checkbox" v-model="ruleState" @change="changeState">
                    <span></span>
                </div>
                <span @click="changeState(ruleState)">我同意以上所有條款</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'st-insetrule',
        props: ['ruleState'],
        methods: {
            changeState (newValue) {
                if (typeof(newValue) != 'object') {
                    this.$emit('update:ruleState', !newValue);
                }
                else {
                    this.$emit('update:ruleState', this.ruleState);
                }
            }
        }
    }
</script>

<style scoped>

</style>