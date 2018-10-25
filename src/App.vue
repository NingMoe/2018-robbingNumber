<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import rule from '@/components/rule'
import storeMap from '@/components/storeMap'
import footer from '@/components/footer'
import insetRule from '@/components/insetRule'
import share from '@/components/share'
Vue.component(rule.name,rule)
Vue.component(storeMap.name,storeMap)
Vue.component(footer.name,footer)
Vue.component(insetRule.name,insetRule)
Vue.component(share.name,share)
export default {
  name: 'App'
}
</script>

<style>

</style>
