<template>
  <div id="app">
    <el-container>
      <el-header v-if="this.$route.path !== '/'">
        <ul class="main-nav">
          <li><img src="./assets/logo.png" id="nav-logo" @click="first"></li>
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
      <el-main id="main">
        <el-row :gutter="10" class="bottom-margin" type="flex" justify="center"
        v-if="this.$route.path !== '/terms' &&
        this.$route.path !== '/privacy' &&
        this.$route.path !== '/howto' &&
        this.$route.path !== '/archive'">
          <el-col :xs="24" :sm="24" :md="16" :lg="14" :xl="14">
            <el-card shadow="hover" class="bottom-margin" v-if="this.$store.getters.theme">
              {{ this.$store.getters.theme }}
            </el-card>
            <el-card shadow="hover" class="bottom-margin" v-if="this.$store.getters.some">
              {{ this.$store.getters.some }}
            </el-card>
          </el-col>
        </el-row>
        <transition>
          <router-view/>
        </transition>
      </el-main>
      <el-footer>
        <Navigation />
        <social-sharing url="https://skliber.net/excursion/"
                          title="excursion | アイデアを発想するツール"
                          description="excursion | アイデアを発想するツール | 「アイデアとは既存の要素の新しい組み合わせ以外の何ものでもない」 - ジェームス・W・ヤング"
                          quote="excursion | アイデアを発想するツール | 「アイデアとは既存の要素の新しい組み合わせ以外の何ものでもない」 - ジェームス・W・ヤング"
                          hashtags=""
                          twitter-user=""
                          :networks="hatenaBookmark"
                          inline-template>
          <div class="social-links">
            <network network="twitter">
              <font-awesome-icon :icon="['fab', 'twitter']" class="fa-3x" />
            </network>
            <network network="facebook">
              <font-awesome-icon :icon="['fab', 'facebook']" class="fa-3x" />
            </network>
            <network network="googleplus">
              <font-awesome-icon :icon="['fab', 'google-plus-square']" class="fa-3x" />
            </network>
            <network network="line">
              <font-awesome-icon :icon="['fab', 'line']" class="fa-3x" />
            </network>
            <network network="hatena">
              <img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" class="hatena-bookmark-button" />
            </network>
          </div>
        </social-sharing>
        <div id="footer-links" class="top-margin-middle bottom-margin">
          <el-row :gutter="10" type="flex" justify="center">
            <el-col :span="5">
              <span id="howto" @click="howto">使い方</span>
            </el-col>
            <el-col :span="5">
              <span id="terms" @click="terms">利用規約</span>
            </el-col>
            <el-col :span="5">
              <span id="privacy" @click="privacy">プライバシーポリシー</span>
            </el-col>
            <el-col :span="5">
              <span id="copylight"><a href="#">© 2018</a></span>
            </el-col>
          </el-row>
        </div>
      </el-footer>
    </el-container>
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
      activeIndex: '1',
      hatenaBookmark: {
        'hatena': {
          'sharer': 'http://b.hatena.ne.jp/entry/s/skliber.net/excursion/',
          'type': 'popup'
        }
      }
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
      this.$store.dispatch('clearAllState')
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
    },
    terms () {
      this.$router.replace('/terms')
    },
    privacy () {
      this.$router.replace('/privacy')
    },
    howto () {
      this.$router.replace('/howto')
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
  line-height: 55px;
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
#nav-logo {
  width: auto;
  height: 100%;
}
.hatena-bookmark-button{
  flex: left;
  cursor: pointer;
  width: 42px;
  height: 42px;
}
.social-links {
  margin-top: 20px;
}
.social-links svg {
    margin-right: 1rem;
    margin-bottom: 3px;
    cursor: pointer;
}
.fa-facebook, .fa-facebook-square {
    color: #3b5998
}
.fa-twitter, .fa-twitter-square {
    color: #00aced
}
.fa-google-plus, .fa-google-plus-square {
    color: #dd4b39
}
.fa-line {
    color: #1dcd00
}
.v-enter-active {
  transition: opacity 1s;
}
.v-enter {
  opacity: 0;
}
.bottom-margin {
  margin-bottom: 10px;
}
#copylight a, #footer-links a, #terms, #privacy, #howto {
  text-decoration: none;
  cursor: pointer;
}
.top-margin-middle {
  margin-top: 20px;
}
</style>
