import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Theme from '@/components/Theme'
import Some from '@/components/Some'
import Associate from '@/components/Associate'
import Idea from '@/components/Idea'
import Result from '@/components/Result'
import Archive from '@/components/Archive'
import Terms from '@/components/Terms'
import Privacy from '@/components/Privacy'
import Howto from '@/components/Howto'
import store from '@/store.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/theme',
      name: 'Theme',
      component: Theme,
      beforeEnter (to, from, next) {
        if (store.getters.userData.uid) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/some',
      name: 'Some',
      component: Some,
      beforeEnter (to, from, next) {
        if (store.getters.userData.uid) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/associate',
      name: 'Associate',
      component: Associate,
      beforeEnter (to, from, next) {
        if (store.getters.userData.uid) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/idea',
      name: 'Idea',
      component: Idea,
      beforeEnter (to, from, next) {
        if (store.getters.userData.uid) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/result',
      name: 'Result',
      component: Result,
      beforeEnter (to, from, next) {
        if (store.getters.userData.uid) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive,
      beforeEnter (to, from, next) {
        if (store.getters.userData.uid) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/howto',
      name: 'Howto',
      component: Howto
    }
  ]
})
