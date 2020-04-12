<template>
  <div id="app">
    <TitleBar>联易全保工作台</TitleBar>
    <router-view />
  </div>
</template>
<script>
import TitleBar from '@/components/TitleBar'
export default {
  components: {
    TitleBar: TitleBar
  },
  watch: {
    $route(to, from) {
      // console.log(to.path)
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  width: 100%;
  padding-top: 40px;
  height: calc(100% - 40px);
  overflow: hidden;
}
</style>
