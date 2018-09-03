<template>
  <div class="row home justify-content-left">
    <!-- LEFT PANEL -->
    <div id="left-panel" class="col-md-6 col-xs-12">
      <div class="row">
        <div id="control-panel" class="col-md-6 offset-md-6 col-xs-12">
          <h1 id="welcome" class="mt-2">
            <strong>Welcome {{userName}}</strong>
          </h1>
          <form class="form-inline" @submit.prevent="getMusic">
            <!--DO NOT MODIFY THE ID OR ONCLICK ATTRIBUTES IN THIS FORM-->
            <div class="form-group mt-2 p-2">
              <input type="text" class="form-control mt-2 mb-2 mr-2" name="artist" placeholder="Artist Name" v-model="artist" />
              <button type="submit" class="btn btn-primary mt-2 mb-2" id="get-music-button">Get Music</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- RIGHT PANEL -->
    <div id="right-panel" class="col-md-6 offset-md-6 col-xs-12">
      <div id="songs" class="row">
        <div v-for="song in songs" :key="song.id" class="col-md-6 col-xs-12 song-card">
          <div class="card bg-light mb-3">
            <h3 class="card-header">{{song.artist}}</h3>
            <div class="card-body">
              <h5 class="card-title clickable" @click="playTitle(song.id)">{{song.title}}</h5>
              <h6 class="card-subtitle text-muted">{{song.collection}}</h6>
            </div>
            <img style="width: 100%; display: block;" :src="song.albumArt" alt="Card image">
            <div class="card-body">
              <audio controls :id="song.id" @play="prevPlay(song.id)">
                <source :src="song.preview" type="audio/ogg">
                <source :src="song.preview" type="audio/aac">
                <source :src="song.preview" type="audio/mp4"> Your browser does not support the audio element.
              </audio>
            </div>
            <div class="card-body text-primary">
              <h5 class="clickable" @click="addToPlaylist(song)"><i class="fas fa-plus-circle"></i> Add to playlist</h5>
            </div>
            <div class="card-footer">
              Price: {{song.price}} @ itunes.apple.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'home',
    mounted() {
      if (!this.$store.state.user.id) {
        this.$router.push({ name: 'login' })
      }
    },
    data() {
      return {
        artist: '',
        activePlayer: undefined
      }
    },
    components: {

    },
    methods: {

      getMusic() {
        this.$store.dispatch('getMusicByArtist', this.artist)
        this.artist = ""
      },

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

      //ADD SELECTED SONG TO PLAYLIST
      addToPlaylist(song) {
        console.log("Adding " + song.title + " to playlist")
      }
    },

    computed: {
      songs() {
        return this.$store.state.songs
      },

      userName() {
        return this.$store.state.user.userName
      }
    }
  }
</script>

<style>
  #welcome {
    color: white;
  }


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

  .flexbox {
    display: flex;
    justify-content: center
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

  .clickable {
    cursor: pointer;
  }

  audio {
    width: 90%;
  }

  @media screen and (max-width: 768px) {
    .song-card {
      position: relative;
      z-index: 0;
      padding-top: 230px;
    }
  }

  .card {
    z-index: auto;
    position: relative;
  }

  #control-panel {
    /* position: fixed;
    z-index: 10; */
    text-align: left;
  }

  .right-panel {
    min-width: 50%;
  }
</style>