<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <img src="@/assets/logo.png" id="logo">
      </el-col>
    </el-row>
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
          <el-button @click="doGoogleLogin" class="social-login btn-google"><span class="word">Googleアカウントでログイン</span></el-button>
        </el-col>
        <el-col :span="24">
          <el-button class="btn-anonymous" type="primary" @click="doLoginAnonymous" plain>ログインしないで使ってみる</el-button>
        </el-col>
      </el-col>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%">
        <span>申し訳ありません。サービスの実行に失敗しました。後ほどお試しいただくか、運営者までご連絡ください。</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">OK</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: 'Home',
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    doGoogleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    doLoginAnonymous () {
      firebase.auth().signInAnonymously().catch(function (error) {
        console.log(error)
        this.dialogVisible = true
      })
    },
    moveToTheme () {
      this.$router.push('theme')
    }
  }
}
</script>

<style scoped>
#logo {
  width: 100%;
  height: auto;
  margin-top: 1em;
  margin-bottom: 4em;
}
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
.btn-google:hover{
  color: white !important;
  background-color: #dd4b39 !important;
}
.social-login{
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
}
.social-login .word {
  font-size: 1rem;
}
</style>
