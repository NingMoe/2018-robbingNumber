<template>
    <div>
        <div class="container">
            <p class="tell-title"><span class="tell-icon"></span>分享好友，幫妳賺好運氣，搶靚號得心應手！</p>
            <ul>
                <li @click.stop="showWx = !showWx">
                    <span class="icon icon-wx"></span>
                    <span class="text">分享到微信</span>
                    <div class="share-wxbox" v-show="showWx" :class="{'pos-down': pos == 'down'}">
                        <span title="關閉" class="close-span" @click.stop = "showWx = false">×</span>
                        <p class="text-center">掃碼分享到微信</p>
                        <qrcode-vue class="wxbox-cont" :value="shareSrc" :size="140" level="H"></qrcode-vue>
                    </div>
                </li>
                <li  onclick="javascript:window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent('https://www.1888.com.mo/ct_gn/')+'&t='+encodeURIComponent('中國電信18萬個號碼任您揀'), 'newWindow','center');void(0);">
                    <span class="icon icon-facebook"></span>
                    <span class="text">分享到facebook</span>
                </li>
                <li @click="copy(shareSrc)">
                    <span class="icon icon-copy"></span>
                    <span class="text">複製鏈接</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import qrcodeVue from 'qrcode.vue'
    export default {
        components: {qrcodeVue},
        data () {
            return {
                showWx: false
            }
        },
        props: ['pos'],
        methods: {
            copy (target) {
                var input = document.createElement("input");
                input.value = target;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
                document.body.removeChild(input);
                this.$messagebox.alert('復製成功',{
                    title: '提示',
                    confirmButtonText: '確定'
                })
            }
        }
    }
</script>

<style scoped>

</style>