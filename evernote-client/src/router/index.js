import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '../views/login/Login.vue'
import NotebookList from '../views/notebook-list/NotebookList.vue'
import NoteDetail from '../views/note-detail/NoteDetail.vue'
import TrashDetail from '../views/trash-detail/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'sidebar-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/note',
      name: 'NoteDetail',
      component: NoteDetail
    },
    {
      path: '/trash',
      name: 'TrashDetail',
      component: TrashDetail
    }
  ]
})
