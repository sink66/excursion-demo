<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <h4 class="stop-bottom-margin">連想したことと<span class="bg-blue">{{ this.$store.getters.theme }}</span> を組み合わせてアイデアを考えてみましょう</h4>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="disable-col-padding">
        <p v-for="item in localAssociates" v-bind:key="item.id" class="fix-height">
          <el-col :span="9">
            <span>{{ item.associate }}</span>
          </el-col>
          <el-col :span="3">
            <el-button v-if="item.idea" type="success" class="stop-cursor-change" icon="el-icon-check" circle disabled></el-button>
            <el-button v-else class="stop-cursor-change" icon="el-icon-arrow-right" circle disabled></el-button>
          </el-col>
          <el-col :span="12">
            <el-input v-model="ideas[item.id]" @blur="endInput(item)" placeholder="アイデア"></el-input>
          </el-col>
        </p>
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
      localAssociates: [],
      ideas: {}
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
    endInput: function (item) {
      item.idea = this.ideas[item.id]
      this.$store.dispatch('doIdeasUpdate', this.ideas)
    }
  },
  created () {
    this.localAssociates = associateApi.fetch(this.$store)
  },
  mounted () {
    this.ideas = this.$store.getters.ideas
    this.localAssociates.forEach(function (item, index) {
      item.idea = this.ideas[index]
    }.bind(this))
  }
}
</script>

<style scoped>
.el-col {
  margin-bottom: 10px;
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

.fix-height {
  display: flex;
  flex-wrap: wrap;
}

.stop-cursor-change{
  cursor: default !important;
}

.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: inherit;
    background-image: inherit;
    background-color: inherit;
}
</style>
