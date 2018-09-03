import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Song from './models/Song'
import User from './models/User'
import router from './router'


Vue.use(Vuex)

const appleApi = Axios.create({
  baseURL: '//itunes.apple.com/search?term=',
  timeout: 3000
})

const myTunesApi = Axios.create({
  baseURL: '//localhost:3000',
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    user: {},
    songs: []

  },
  mutations: {

    setUser(state, data) {
      state.user = new User(data)
    },

    setSongs(state, songs) {
      let mySongs = []
      songs.forEach(song => {
        let mySong = new Song(song)
        mySongs.push(mySong)
      })
      state.songs = mySongs
    }

  },
  actions: {

    registerUser({ commit, dispatch }, creds) {
      myTunesApi.post('/users/register', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(err => console.log(err.message))
    },

    loginUser({ commit, dispatch }, creds) {
      myTunesApi.post('/users/login', creds)
        .then(res => {
          console.log("return from login: ", res.data)
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(err => console.log(err.message))
    },

    getMusicByArtist({ commit, dispatch }, artist) {
      appleApi.get(artist)
        .then(res => {
          console.log(res.data.results)
          commit('setSongs', res.data.results)
        })
        .catch(err => console.error(err.message))
    }
  }
})
