<template>
    <div class="sharepop-box" :class="[screenBrowser == 1 ? 'arrow-up': 'arrow-down']">
        <div class="share-content">
            <div class="content-text">
                <p>點擊{{screenBrowser == 1 ? '上': '下'}}方分享到<br>微信或Facebook</p>
            </div>
            <div class="content-btn">
                <a @click="closeModal">我知道了</a>
            </div>
        </div>
        <div class="share-arrow"></div>
    </div>
</template>

<script>
    
    export default {
        name: 'st-phoneshare',
        props: ['screenBrowser'],
        methods: {
            closeModal () {
                this.$emit('closeModal',false)
            }
        }
    }
</script>

<style scoped>

</style>