<template>
  <el-row :gutter="20" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="disable-col-padding">
      <el-col :span="24">
        <h4 class="stop-bottom-margin">テーマと関係ないものを入力してください</h4>
        <p class="text-small stop-top-margin">動物、職業、場所、映画、小説、食べ物、横にあったもの etcetc...</p>
      </el-col>
      <el-col :span="24">
        <el-input placeholder="テーマと関係ないもの" v-model="some"></el-input>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    some: {
      get () { return this.$store.getters.some },
      set (value) { this.$store.dispatch('doSomeUpdate', value) }
    }
  }
}
</script>

<style scoped>
.disable-col-padding {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.text-small {
  font-size: 0.8rem;
}
.stop-top-margin{
  margin-top: 0px;
}
.stop-bottom-margin{
  margin-bottom: 0px;
}
</style>
