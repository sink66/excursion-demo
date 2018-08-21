<template>
  <div id="app">
    <el-header v-if="this.$route.path !== '/'">
      <ul class="main-nav">
        <li><span id="nav-logo" @click="first">EXCURSION</span></li>
        <template v-if="this.$store.getters.userData.uid">
          <li class="hidden-sm-and-down" @click="moveArchive">保存一覧</li>
          <li class="hidden-sm-and-down" @click="doLogout">ログアウト</li>
          <el-menu :default-active="activeIndex" class="el-menu-demo hidden-md-and-up" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title">Menu</template>
              <el-menu-item index="1-1">保存一覧</el-menu-item>
              <el-menu-item index="1-2">ログアウト</el-menu-item>
            </el-submenu>
          </el-menu>
        </template>
      </ul>
    </el-header>
    <router-view/>
    <Navigation />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import firebase from 'firebase/app'
export default {
  name: 'App',
  components: {
    Navigation
  },
  data () {
    return {
      isLogin: false,
      userData: {},
      activeIndex: '1'
    }
  },
  watch: {
    isLogin: {
      handler: function (isLogin) {
        if (isLogin) {
          this.$router.replace('theme')
        } else {
          this.$router.replace('/')
        }
      },
      deep: true
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.userData = user || {}
      if (user) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
      this.$store.dispatch('doUserDataUpdate', this.userData)
    })
  },
  methods: {
    doLogout () {
      firebase.auth().signOut()
    },
    first () {
      if (this.isLogin) {
        this.$router.replace('/theme')
      } else {
        this.$router.replace('/')
      }
    },
    moveArchive () {
      this.$router.replace('archive')
    },
    handleSelect (key, keyPath) {
      if (key === '1-1') {
        this.moveArchive()
      } else if (key === '1-2') {
        this.doLogout()
      }
    }
  }
}
</script>

<style>
html {
  background-color: rgb(251, 252, 253);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  min-height: 95vh;
  flex-direction: column;
}
#main {
   flex: 1;
}
.el-header {
  background-color: rgb(251, 252, 253) !important;
  text-align: right;
  border-bottom: 1px solid rgb(192, 192, 192) !important;
}
.el-menu {
  background-color: rgb(251, 252, 253) !important;
}
.el-menu-item:not(.is-disabled):hover {
  color: #409EFF !important;
  background-color: #ecf5ff !important;
}
.el-menu--horizontal {
  border-bottom: none;
}
.el-submenu__title {
  background-color: rgb(251, 252, 253) !important;
  border-bottom: 1px solid rgb(192, 192, 192) !important;
}

ul.main-nav {
  display: flex;
  list-style: none;
  margin: 0px;
  padding: 0px;
}
ul.main-nav li {
  color: rgb(104, 112, 121);
  height: 55px;
  padding: 0px 20px;
  cursor: pointer;
}
ul.main-nav li:not(:first-child):hover{
  transition: 0.2s;
  color: #409EFF;
  background-color: #ecf5ff;
}
ul.main-nav li:first-child {
  margin-right: auto;
  padding: 0px;
}
</style>
