<template>
    <div class="tosn-pop-section" @click="closePop" v-if="popShow">
        <div class="tosn-pop-box" @click.stop>
            <div class="pop-box-title">請選擇月費使用地區<span class="b-close" @click="closePop">×</span></div>
            <div class="pop-box-btnwrap"><a>本澳月費計劃</a><a>兩地月費計劃</a></div>
            <div class="pop-box-btn" @click="closePop">確定</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['popShow'],
        methods: {
            closePop () {
                this.$emit('update:popShow',false)
            }
        }
    }
</script>

<style scoped>

</style>