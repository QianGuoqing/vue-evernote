import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    username: '未登录',
    noteId: -1,
    notebookId: -1,
    currentNote: {},
    trashNote: {},
    allTrashNotes: [],
    allNotes: [],
    richText: '',
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
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
    },
    setAllNotes(state, notes) {
      state.allNotes = notes
    },
    setTrashNote(state, note) {
      state.trashNote = note
    },
    setAllTrashNotes(state, notes) {
      state.allTrashNotes = notes
    },
    setRichText(state, rich) {
      state.richText = rich
    }
  },
  getters: {

  },
  actions: {

  }
})

export default store