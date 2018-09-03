import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


Vue.use(Vuex)

const appleApi = Axios.create({
  baseURL: '//itunes.apple.com/search?term=',
  timeout: 3000
})

export default new Vuex.Store({
  state: {
    songs: []

  },
  mutations: {
    setSongs(state, songs) {
      let mySongs = []
      songs.forEach(song => {

        let mySong = {
          id: song.trackId,
          title: song.trackName,
          albumArt: song.artworkUrl60.replace(/60x60/g, "150x150"),
          artist: song.artistName,
          collection: song.collectionName,
          price: song.trackPrice,
          preview: song.previewUrl
        }
        mySongs.push(mySong)
      })
      state.songs = mySongs
      console.log("state songs: ", state.songs)
    }

  },
  actions: {

    registerUser({ commit, dispatch }, creds) {
      console.log("regsitering user: ", creds)
    },

    loginUser({ commit, dispatch }, creds) {
      console.log("login user: ", creds)
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
