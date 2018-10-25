<template>
    <div class="store-box" :class="{'store-box-inner': inner == 'inner'}">
        <div class="container">
            <div class="hr-title">
                <span>門市分佈</span>
            </div>
            <div class="inner-map">
                <p class="xs-show" v-if="inner != 'inner'">點擊文字和數字均可彈框顯示具體的地址</p>
                <p class="sm-show"><span>*</span>點擊文字和數字均可彈框顯示具體的地址</p>
                <div class="map-wrapper">
                    <div class="store-exp" v-for="(store,index) in storeList" :key="index" :class="'exp-'+(index+1)" @click="showTips(store,index)">
                        <span class="store-marker">{{index + 1}}</span>
                        <span class="store-name" :class="store.arrow">{{store.name}}</span>
                        <div class="tips-content" v-if="store.showtips">
                            <p class="p-name">{{store.name}}</p>
                            <p>地址：{{store.address}}</p>
                            <p>營業時間：{{store.bushours}}</p>
                            <p v-if="store.phone">電話：{{store.phone}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'st-map',
        props: ['inner'],  //判斷是否是內頁的地圖
        mounted () {
            console.log(this.inner)
        },
        data () {
            return {
                storeList: [
                    {
                        name: '企業客戶部',
                        address: "澳門宋玉生廣場中航大廈12樓",
                        bushours: "週一至週五 09:30-18:30",
                        phone: "施生 6699 9589、馮生 6699 9826",
                        showtips: false,
                        arrow: "down"
                    },
                    {
                        name: "水坑尾分店",
                        address: "澳門水坑尾天神巷1號興昌大廈地下A座",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "right"
                    },
                    {
                        name: "皇朝旗艦店",
                        address: "澳門皇朝巴黎街29號大豐廣場第二座地下B座（新口岸大豐總行右側）",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "left"
                    },
                    {
                        name: "信達廣場分店",
                        address: "澳門永安街160號、166號信達廣場第三座地下D座",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "right"
                    },
                    {
                        name: "高士德分店",
                        address: "澳門俾利喇街109號及高士德大馬路39至39E號，地下“AR/C”鋪",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "left"
                    },
                    {
                        name: "氹仔利民分店",
                        address: "氹仔孫逸仙博士大馬路253號利民大廈地下C座（成昌超級市場隔離）",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "down"
                    },
                    {
                        name: "激成分店",
                        address: "澳門黑沙環第五街21號 激成工業大廈地下C座",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "left"
                    },
                    {
                        name: "紅街市分店",
                        address: "澳門提督馬路115至117-A號地舖（紅街市對面）",
                        bushours: "每日 09:30-20:00",
                        showtips: false,
                        arrow: "right"
                    },
                    {
                        name: "氹仔樂駿盈軒分店",
                        address: "氹仔柯維納馬路194號樂駿盈軒第一座地下B座（四面佛對面）",
                        bushours: "上午11:00-20:00",
                        showtips: false,
                        arrow: "right"
                    },
                ]
            }
        },
        methods: {
            showTips (store,index) {
                store.showtips = !store.showtips;
                if (store.showtips) {  //如果當前的顯示 則隱藏其他的
                    this.storeList.forEach((item,inx) => {
                        if (inx != index) {
                            item.showtips = false
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>