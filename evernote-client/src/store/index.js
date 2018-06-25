import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: '未登录',
    noteId: -1,
    notebookId: -1,
    currentNote: {}
  },
  mutations: {
    changeIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setNoteId(state, noteId) {
      state.noteId = noteId
    },
    setNotebookId(state, notebookId) {
      state.notebookId = notebookId
    },
    setCurrentNote(state, note) {
      state.currentNote = note
    }
  },
  getters: {

  },
  actions: {

  }
})

export default store