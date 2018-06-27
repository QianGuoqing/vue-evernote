import axios from 'axios'
import { 
  API_GET_NOTEBOOK, 
  API_ADD_NOTEBOOK, 
  API_UPDATE_NOTEBOOK, 
  API_DELETE_NOTEBOOK,
  API_ADD_NOTE,
  API_GET_NOTE,
  API_DELETE_NOTE,
  API_UPDATE_NOTE,
  API_GET_TRASH,
  API_CONFIRM_DELETE_NOTE,
  API_REVERT_NOTE
} from './apis'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://note-server.hunger-valley.com'
// 解决前后端跨域问题产生的cookie不生效
axios.defaults.withCredentials = true

export function getDataByGet(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getDataByPost(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getNotebooks() {
  return new Promise((resolve, reject) => {
    axios.get(API_GET_NOTEBOOK).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addNotebook(title) {
  return new Promise((resolve, reject) => {
    axios.post(API_ADD_NOTEBOOK, {
      title: title
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateNotebook(id, title) {
  return new Promise((resolve, reject) => {
    let API = API_UPDATE_NOTEBOOK.replace(':notebookId', id)
    axios.patch(API, {
      title: title
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteNotebook(id) {
  return new Promise((resolve, reject) => {
    let API = API_DELETE_NOTEBOOK.replace(':notebookId', id)
    axios.delete(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addNote(notebookId, title, content) {
  return new Promise((resolve, reject) => {
    let API = API_ADD_NOTE.replace(':notebookId', notebookId)
    axios.post(API, {
      title: title,
      content: content
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getNote(notebookId) {
  return new Promise((resolve, reject) => {
    let API = API_GET_NOTE.replace(':notebookId', notebookId)
    axios.get(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteNote(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_DELETE_NOTE.replace(':noteId', noteId)
    axios.delete(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function updateNote(noteId, title, content) {
  return new Promise((resolve, reject) => {
    let API = API_UPDATE_NOTE.replace(':noteId', noteId)
    axios.patch(API, {
      title: title,
      content: content
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getTrash() {
  return new Promise((resolve, reject) => {
    axios.get(API_GET_TRASH).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function revertNote(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_REVERT_NOTE.replace(':noteId', noteId)
    axios.patch(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function deleteTrash(noteId) {
  return new Promise((resolve, reject) => {
    let API = API_CONFIRM_DELETE_NOTE.replace(':noteId', noteId)
    axios.delete(API).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
