<template>
  <el-row :gutter="20" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14" class="disable-col-padding">
      <el-col :span="24">
        <h4 class="stop-bottom-margin">テーマと関係ないものを入力してください</h4>
        <p class="text-small stop-top-margin">動物、職業、場所、映画、小説、食べ物、横にあったもの etcetc...</p>
        <el-input placeholder="テーマと関係ないもの" v-model="some" v-loading="loading"></el-input>
      </el-col>
      <el-col :span="24">
        <p class="text-small">動物と職業はランダムで出力することもできます。チェックしてランダム表示ボタンを押してください</p>
        <el-checkbox v-model="animal" label="動物" border></el-checkbox>
        <el-checkbox v-model="work" label="職業" border></el-checkbox>
      </el-col>
      <el-col :span="24">
        <el-button v-on:click="refreshSome" type="success" icon="el-icon-refresh">ランダム表示</el-button>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      animal: false,
      work: false,
      loading: false
    }
  },
  computed: {
    some: {
      get () { return this.$store.getters.some },
      set (value) { this.$store.dispatch('doSomeUpdate', value) }
    }
  },
  watch: {
    some: {
      handler: function (some) {
        if (some) {
          this.loading = false
        }
      },
      deep: true
    }
  },
  methods: {
    refreshSome: function () {
      this.loading = true
      let animalApi = 'https://script.google.com/macros/s/AKfycbzq8Ow2oQ2eGcNNSRVNHmzT-P1MbSNUbvrZ-wTjhbSvJ-oxmbJy/exec'
      let workApi = 'https://script.google.com/macros/s/AKfycbzYFSKk8GF_QmSxPXs1vnsaAUyL3FyRBNrI9tDgcEjXpqVhA_U/exec'
      let url = ''
      if ((this.animal && this.work) || (!this.animal && !this.work)) {
        const randomBoolean = Math.random() >= 0.5
        if (randomBoolean) {
          url = animalApi
        } else {
          url = workApi
        }
      } else if (this.animal) {
        url = animalApi
      } else {
        url = workApi
      }
      axios
        .get(url)
        .then(
          function (response) {
            this.some = response.data
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e)
        })
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
