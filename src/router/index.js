import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Theme from '@/components/Theme'
import Some from '@/components/Some'
import Associate from '@/components/Associate'
import Idea from '@/components/Idea'
import Result from '@/components/Result'
import Archive from '@/components/Archive'

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
      component: Theme
    },
    {
      path: '/some',
      name: 'Some',
      component: Some
    },
    {
      path: '/associate',
      name: 'Associate',
      component: Associate
    },
    {
      path: '/idea',
      name: 'Idea',
      component: Idea
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
    }
  ]
})
