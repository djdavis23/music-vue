<template>
  <div class="row home justify-content-left">
    <!-- LEFT PANEL -->
    <!-- WELCOME AND SEARCH FORM -->
    <div id="left-panel" class="col-md-6 col-xs-12">
      <div class="row front">
        <div id="control-panel" class="col-md-6 offset-md-4 col-xs-12 front">
          <h1 id="welcome" class="mt-2 text-lg text-center text-white">
            <strong>Welcome {{user.userName}}</strong>
          </h1>
          <form class="form-inline front" @submit.prevent="getMusic">
            <div class="form-group mt-2 p-2 front">
              <input type="text" class="form-control-lg mt-2 mb-2 mr-2" name="artist" placeholder="Artist Name" v-model="artist" />
              <button type="submit" class="btn btn-primary  btn-lg mt-2 mb-2" id="get-music-button">Get Music</button>
            </div>
          </form>
        </div>
        <div class="col-md-6 offset-md-6 text-white text-center mt-2 front">
          <h2 class="clickable" @click="revealed = !revealed">Playlist <i class="fas fa-arrows-alt"></i></h2>
        </div>
      </div>
      <!-- Playlist component here -->
      <Playlist :revealed="revealed" :activePlayer="activePlayer" v-on:prevPlay="prevPlay" v-on:playTitle="playTitle" />


    </div>
    <!-- RIGHT PANEL -->
    <div id="right-panel" class="col-md-6 offset-md-6 col-xs-12">
      <div class="row front spacer">
      </div>

      <!-- Search component here -->
      <Search :activePlayer="activePlayer" v-on:prevPlay="prevPlay" v-on:playTitle="playTitle" />

    </div>
  </div>
</template>

<script>

  import Playlist from "../components/Playlist";
  import Search from "@/components/Search";



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

    methods: {

      //searches itunes database for tracks by selected artist
      getMusic() {
        this.$store.dispatch('getMusicByArtist', this.artist)
        this.artist = ""
      },
      //pauses activeplayer when a new player is activated
      prevPlay(id) {
        if (this.activePlayer) {
          this.activePlayer.pause()
        }
        this.activePlayer = document.getElementById(id)
      },

      //plays the track when the title is clicked
      playTitle(id) {

        let aud = document.getElementById(id)
        console.log(aud)
        //@ts-ignore
        aud.play()
      },

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

  .front {
    z-index: 1;
  }

  .spacer {
    height: 25vh;
  }

  @media screen and (max-width: 768px) {
    .song-card {
      position: relative;
      z-index: -1;
      padding-top: 220px;
    }
  }

  .card {
    z-index: 0;
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