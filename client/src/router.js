import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Question from './views/Question.vue'
import Detail from './views/Detail.vue'
import AddQuestion from './views/AddQuestion'
import Profile from './views/Profile'
import Edit from './views/Edit.vue'
import GSignInButton from 'vue-google-signin-button'


Vue.use(Router)
Vue.use(GSignInButton)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/questions',
      name: 'questions',
      component: Question
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/add',
      name: 'add',
      component: AddQuestion
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
    ,
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
