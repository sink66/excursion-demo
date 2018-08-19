<template>
  <el-row :gutter="10" type="flex" justify="center" v-if="this.$route.path !== '/'">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <el-button-group class="nav-margin" v-if="this.$route.path === '/theme'">
        <el-button type="primary" @click="next">進む <i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </el-button-group>
      <el-button-group class="nav-margin" v-else-if="this.$route.path === '/result'">
        <el-button type="primary" @click="prev" icon="el-icon-arrow-left">戻る</el-button>
        <el-button type="primary" @click="first" icon="el-icon-refresh">最初から</el-button>
      </el-button-group>
      <el-button-group class="nav-margin" v-else>
        <el-button type="primary" @click="prev" icon="el-icon-arrow-left">戻る</el-button>
        <el-button type="primary" @click="next">進む <i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </el-button-group>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    next () {
      if (this.$route.path === '/theme') {
        this.$router.push('some')
      } else if (this.$route.path === '/some') {
        this.$router.push('associate')
      } else if (this.$route.path === '/associate') {
        this.$router.push('idea')
      } else if (this.$route.path === '/idea') {
        this.$router.push('result')
      }
    },
    prev () {
      if (this.$route.path === '/result') {
        this.$router.push('idea')
      } else if (this.$route.path === '/idea') {
        this.$router.push('associate')
      } else if (this.$route.path === '/associate') {
        this.$router.push('some')
      } else if (this.$route.path === '/some') {
        this.$router.push('theme')
      }
    },
    first () {
      this.$router.replace('theme')
    }
  }
}
</script>

<style>
.nav-margin {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
