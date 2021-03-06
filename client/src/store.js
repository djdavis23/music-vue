import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Song from './models/Song'
import User from './models/User'
import Playlist from './models/Playlist'
import router from './router'


Vue.use(Vuex)

//axios api for iTunes query
const appleApi = Axios.create({
  baseURL: '//itunes.apple.com/search?term=',
  timeout: 3000
})

//axios api for myTunes query
const myTunesApi = Axios.create({
  baseURL: '//localhost:3000',
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    user: {},
    songs: [],
    playlist: {}
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
    },

    setPlaylist(state, playlist) {
      state.playlist = new Playlist(playlist)
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
          commit('setUser', res.data)
          dispatch('getPlaylist', res.data._id)
          router.push({ name: 'home' })
        })
        .catch(err => console.log(err.message))
    },

    getMusicByArtist({ commit, dispatch }, artist) {
      appleApi.get(artist)
        .then(res => {
          commit('setSongs', res.data.results)
        })
        .catch(err => console.error(err.message))
    },

    getPlaylist({ commit, dispatch }, userId) {
      myTunesApi.get(`/api/playlists/by-user/${userId}`)
        .then(res => {
          commit('setPlaylist', res.data)
        })
        .catch(err => console.log(err.message))
    },

    createPlaylist({ commit, dispatch }, playlist) {
      myTunesApi.post('/api/playlists', playlist)
        .then(res => commit('setPlaylist', res.data))
        .catch(err => console.log(err.message))
    },

    updatePlaylist({ commit, dispatch }, playlist) {
      myTunesApi.put(`/api/playlists/${playlist._id}`, playlist)
        .then(res => {
          commit('setPlaylist', res.data)
        })
        .catch(err => console.log(err.message))
    }


  }
})
