<template>
  <div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="14" :xl="14" class="disable-col-padding">
        <form class="add-form" v-on:submit.prevent="doAdd">
          <h4 class="stop-bottom-margin"><span class="bg-blue">{{ this.$store.getters.some }}</span> から連想できることを思い付く限り書いてください</h4>
          <p class="text-small stop-top-margin">特徴は何ですか？どう動きますか？何が起こりますか？</p>
          <el-col :span="20">
            <el-input placeholder="連想できること" ref="associateForm"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="doAdd" type="primary" icon="el-icon-plus"></el-button>
          </el-col>
        </form>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="14" :xl="14" class="disable-col-padding">
        <transition-group name="list" tag="p">
          <p v-for="item in localAssociates" v-bind:key="item.id">
            <el-col :span="20">
              <span>{{ item.associate }}</span>
            </el-col>
            <el-col :span="4">
              <el-button @click="doRemove(item)" type="danger" icon="el-icon-delete"></el-button>
            </el-col>
          </p>
        </transition-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let associateApi = {
  fetch: function (store) {
    let associates
    associates = JSON.parse(JSON.stringify(store.state.associates) || '[]')
    associates.forEach(function (associate, index) {
      associate.id = index
    })
    associateApi.uid = associates.length
    return associates
  },
  save: function (store, associates) {
    store.commit('setAssociates', {associates})
  }
}

export default {
  data () {
    return {
      localAssociates: []
    }
  },
  watch: {
    localAssociates: {
      handler: function (newAssociateValue) {
        associateApi.save(this.$store, newAssociateValue)
      },
      deep: true
    }
  },
  methods: {
    doAdd: function (event, value) {
      var associateForm = this.$refs.associateForm
      if (!associateForm.currentValue.length) {
        return
      }
      this.localAssociates.push({
        id: associateApi.uid++,
        associate: associateForm.currentValue,
        idea: ''
      })
      associateForm.currentValue = ''
    },
    doRemove: function (item) {
      var index = this.localAssociates.indexOf(item)
      this.localAssociates.splice(index, 1)
    }
  },
  created () {
    this.localAssociates = associateApi.fetch(this.$store)
  }
}
</script>

<style scoped>
.el-col {
  margin-bottom: 10px;
}

.text-small {
  font-size: 0.8rem;
}

.stop-top-margin {
  margin-top: 0px;
}

.stop-bottom-margin {
  margin-bottom: 0px;
}

.bg-blue{
  color:#409EFF;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-45px);
}
</style>
