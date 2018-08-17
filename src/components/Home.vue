<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1 class="catchphrase">偶然に頼るのはもう終わり。<br />シンプルでシステマティックなアイデア発想法。</h1>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" class="flex-benefits">
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-card class="box-card">
          <div slot="header">
            <i class="catch-icon el-icon-edit-outline"></i>
          </div>
          <div>
            <p class="catchphrase">質問に答えていくだけでさまざまなアイデアを考えることができます。</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-card class="box-card">
          <div slot="header">
            <i class="catch-icon el-icon-document"></i>
          </div>
          <div>
            <p class="catchphrase">考えたアイデアを保存すれば、いつでもどこでも確認できます。</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <el-card class="box-card">
          <div slot="header">
            <i class="catch-icon el-icon-download"></i>
          </div>
          <div>
            <p class="catchphrase">アイデアはpng形式、xlsx形式でダウンロード可能です。</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" class="top-margin">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-col :span="24">
          <el-button @click="moveToTheme" class="btn-anonymous" type="primary" plain>使ってみる</el-button>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
    moveToTheme () {
      this.$router.push('theme')
    }
  }
}
</script>

<style scoped>
.catchphrase {
  font-size: 1.5rem;
}
.flex-benefits {
  flex-wrap: wrap;
}
.catch-icon {
  font-size: 2.5rem;
  color: #3EE8C4;
}
.box-card {
  margin-bottom: 20px;
}
.top-margin{
  margin-top: 50px;
}
.btn-anonymous{
  width: 300px;
  height: 50px;
}
</style>
