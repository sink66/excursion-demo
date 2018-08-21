<template>
  <el-row :gutter="20" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="disable-col-padding">
      <el-col :span="24">
        <h4>archive</h4>
        <p class="text-small stop-top-margin">あなたが保存したアイデアの一覧です。</p>
        <p class="text-small stop-top-margin">クリックかタップでResult画面に移動できます。</p>
      </el-col>
      <el-col :span="24">
        <el-card @click.native="moveResult(item)" v-for="item in localData" :key="item.id" shadow="hover" class="bottom-margin clickable">
          <span>{{ item.theme }}</span>
          <el-button v-on:click.stop="doRemove(item)" type="danger" icon="el-icon-delete" class="remove-button"></el-button>
        </el-card>
      </el-col>
      <el-button type="primary" @click="moveTheme" id="return-top">TOPへ戻る</el-button>
    </el-col>
  </el-row>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data () {
    return {
      localData: []
    }
  },
  mounted: function () {
    var db = firebase.firestore()
    db.collection(this.$store.getters.userData.uid).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var docWithId = doc.data()
        docWithId.id = doc.id
        this.$store.state.localData = docWithId
        this.localData.push(docWithId)
      }.bind(this))
    }.bind(this))
  },
  methods: {
    doRemove: function (item) {
      var index = this.localData.indexOf(item)
      this.localData.splice(index, 1)
      var db = firebase.firestore()
      db.collection(this.$store.getters.userData.uid).doc(item.id).delete().then(function () {
      }).catch(function (error) {
        console.error('削除に失敗しました。: ', error)
      })
    },
    moveTheme: function () {
      this.$router.push('theme')
    },
    moveResult: function (item) {
      this.$store.commit('bindFirestore', item)
      this.$router.push('result')
    }
  }
}
</script>

<style scoped>
.remove-button{
  float: right;
  position: relative;
  bottom: 7px;
}
.clickable{
  cursor: pointer;
}
</style>
