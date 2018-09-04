<template>
  <div class="row home justify-content-left">
    <!-- LEFT PANEL -->
    <div id="left-panel" class="col-md-6 col-xs-12">
      <div class="row">
        <div id="control-panel" class="col-md-6 offset-md-6 col-xs-12">
          <h1 id="welcome" class="mt-2 text-lg text-center text-white">
            <strong>Welcome {{user.userName}}</strong>
          </h1>
          <form class="form-inline" @submit.prevent="getMusic">
            <!--DO NOT MODIFY THE ID OR ONCLICK ATTRIBUTES IN THIS FORM-->
            <div class="form-group mt-2 p-2">
              <input type="text" class="form-control-lg mt-2 mb-2 mr-2" name="artist" placeholder="Artist Name" v-model="artist" />
              <button type="submit" class="btn btn-primary  btn-lg mt-2 mb-2" id="get-music-button">Get Music</button>
            </div>
          </form>
        </div>
        <div class="col-md-6 offset-md-6 text-white text-center mt-2">
          <h2 class="clickable" @click="revealed = !revealed">Playlist <i class="fas fa-arrows-alt"></i></h2>
        </div>
      </div>

      <!-- <Playlist v-on: prevPlay='prevPlay' v-on: playTitle="playTitle" /> -->

      <!-- from Playlist component -->

      <div class="row list">
        <div v-if="playlist._id && revealed" v-for="song in playlist.songs" :key="song.trackId" class="col-md-8 col-xs-12 song-card">
          <div class="card bg-light mb-3">
            <h3 class="card-header clickable" @click="playTitle(song.trackId)">{{song.artist}}: {{song.title}}</h3>
            <div class="card-body">
              <audio controls :id="song.trackId" @play="prevPlay(song.trackId)">
                <source :src="song.preview" type="audio/ogg">
                <source :src="song.preview" type="audio/aac">
                <source :src="song.preview" type="audio/mp4"> Your browser does not support the audio element.
              </audio>
            </div>
            <div class="card-footer">
              <span class="clickable" @click="moveUp(song)"><i class="fas fa-chevron-circle-up"></i></span>&nbsp&nbsp
              <span class="clickable" @click="moveDown(song)"><i class="fas fa-chevron-circle-down"></i></span>&nbsp&nbsp
              <span class="clickable" @click="remove(song)"><i class="fas fa-minus-circle"></i></span>
            </div>
          </div>
        </div>
      </div>

      <!-- from Playlist component -->
    </div>
    <!-- RIGHT PANEL -->
    <div id="right-panel" class="col-md-6 offset-md-6 col-xs-12">

      <!-- <Search v-on: prevPlay='prevPlay' v-on: playTitle="playTitle" /> -->

      <div id="songs" class="row">
        <div v-for="song in songs" :key="song.trackId" class="col-md-6 col-xs-12 song-card">
          <div class="card bg-light mb-3">
            <h3 class="card-header">{{song.artist}}</h3>
            <div class="card-body">
              <h5 class="card-title clickable" @click="playTitle(song.trackId)">{{song.title}}</h5>
              <h6 class="card-subtitle text-muted">{{song.album}}</h6>
            </div>
            <img style="width: 100%; display: block;" :src="song.albumArt" alt="Card image">
            <div class="card-body">
              <audio controls :id="song.trackId" @play="prevPlay(song.trackId)">
                <source :src="song.preview" type="audio/ogg">
                <source :src="song.preview" type="audio/aac">
                <source :src="song.preview" type="audio/mp4"> Your browser does not support the audio element.
              </audio>
            </div>
            <div class="card-body text-primary">
              <h5 class="clickable" @click="addToPlaylist(song)"><i class="fas fa-plus-circle"></i> Add to playlist</h5>
            </div>
            <div class="card-footer">
              Price: ${{song.price}} @ itunes.apple.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Playlist from "@/components/Playlist.vue";
  import Search from "@/components/Search.vue";

  export default {
    name: 'home',

    components: {
      Playlist,
      Search
    },

    mounted() {
      if (!this.$store.state.user.id) {
        this.$router.push({ name: 'login' })
      }
    },

    data() {
      return {
        artist: '',
        activePlayer: undefined,
        revealed: false
      }
    },
    components: {

    },
    methods: {

      //this function will pause the previously selected audio track and set
      //current track as the active player
      prevPlay(id) {
        if (this.activePlayer) {
          this.activePlayer.pause()
        }
        this.activePlayer = document.getElementById(id)
      },

      //this function plays the preview for the selected title element
      playTitle(id) {
        let aud = document.getElementById(id)
        console.log(aud)
        //@ts-ignore
        aud.play()
      },


      //FROM SEARCH COMPONENT
      getMusic() {
        this.$store.dispatch('getMusicByArtist', this.artist)
        this.artist = ""
      },

      //add selected song to playlist
      addToPlaylist(song) {
        if (this.playlist._id) {
          this.playlist.songs.push(song)
          console.log("updating playlist")
          this.$store.dispatch('updatePlaylist', {
            _id: this.playlist._id,
            userId: this.playlist.userId,
            songs: this.playlist.songs
          })
        }
        else {
          console.log("creating playlist")
          let songArr = []
          songArr.push(song)
          this.$store.dispatch('createPlaylist', {
            userId: this.user.id,
            songs: songArr
          })
        }
        this.revealed = true
      },

      //FROM PLAYLIST COMPONENT

      //move song up the playlist
      moveUp(song) {
        let index = this.playlist.songs.indexOf(song)
        if (index > 0) {
          let temp = this.playlist.songs[index - 1]
          this.playlist.songs[index - 1] = song
          this.playlist.songs[index] = temp
          this.$store.dispatch('updatePlaylist', {
            _id: this.playlist._id,
            userId: this.playlist.userId,
            songs: this.playlist.songs
          })
        }
      },

      //move song down the playlist
      moveDown(song) {
        let index = this.playlist.songs.indexOf(song)
        if (index < this.playlist.songs.length - 1) {
          let temp = this.playlist.songs[index + 1]
          this.playlist.songs[index + 1] = song
          this.playlist.songs[index] = temp
          this.$store.dispatch('updatePlaylist', {
            _id: this.playlist._id,
            userId: this.playlist.userId,
            songs: this.playlist.songs
          })
        }
      },

      //remove song from the playlist
      remove(song) {
        let index = this.playlist.songs.indexOf(song)
        this.playlist.songs.splice(index, 1)
        this.$store.dispatch('updatePlaylist', {
          _id: this.playlist._id,
          userId: this.playlist.userId,
          songs: this.playlist.songs
        })
      }
    },

    computed: {
      songs() {
        return this.$store.state.songs
      },

      user() {
        return this.$store.state.user
      },

      playlist() {
        return this.$store.state.playlist
      }
    }
  }
</script>

<style>
  body {
    background-color: black;
    height: 100vh;
  }

  #left-panel {
    position: fixed;
    top: 0;
    height: 100vh;
    background-image: url("../assets/music.jpg");
    background-size: cover;
    background-repeat: no-repeat;
  }

  .form-group {
    border: 1px solid #325d88;
    border-radius: 10px;
    background-color: #d3d3d0
  }

  .card-header,
  .card-footer {
    color: white;
    background: #325d88
  }

  .card-footer {
    font-size: 1.5em;
  }

  .clickable {
    cursor: pointer;
  }

  audio {
    width: 90%;
    height: 40px;
  }

  @media screen and (max-width: 768px) {
    .song-card {
      position: relative;
      z-index: 0;
      padding-top: 260px;
    }
  }

  .card {
    z-index: auto;
    position: relative;
  }

  #control-panel {
    text-align: left;

  }

  .right-panel {
    min-width: 50%;
  }

  .list {
    overflow: auto;
    max-height: 85vh;
  }
</style>