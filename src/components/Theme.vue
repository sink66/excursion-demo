<template>
  <el-row :gutter="20" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="disable-col-padding">
      <el-col :span="24">
        <h4 class="stop-bottom-margin">どんなアイデアを考えますか？</h4>
        <p class="text-small stop-top-margin">新しいペン、新しいキーボード、新しいWebサービス etcetc...</p>
      </el-col>
      <el-col :span="24">
        <el-input placeholder="アイデアのテーマを入力してください" v-model="theme"></el-input>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    theme: {
      get () { return this.$store.getters.theme },
      set (value) { this.$store.dispatch('doThemeUpdate', value) }
    }
  }
}
</script>

<style scoped>
.disable-col-padding {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.stop-bottom-margin{
  margin-bottom: 0px;
}
.text-small {
  font-size: 0.8rem;
}
.stop-top-margin {
  margin-top: 0px;
}
</style>
