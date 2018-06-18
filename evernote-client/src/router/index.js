import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../views/login/Login.vue'
import NotebookList from '../views/notebook-list/NotebookList.vue'
import NotebookDetail from '../views/notebook-detail/NotebookDetail.vue'
import TrashDetail from '../views/notebook-detail/NotebookDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebook-list',
      name: 'NotebookList',
      component: NotebookList
    },
    {
      path: '/notebook-detail/:noteId',
      name: 'NotebookDetail',
      component: NotebookDetail
    },
    {
      path: '/trash-detail/:noteId',
      name: 'TrashDetail',
      component: TrashDetail
    }
  ]
})
