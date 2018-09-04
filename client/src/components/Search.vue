<template>
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

</template>

<script>
  export default {
    name: 'Search',

    data() {
      return {
        artist: ''
      }
    },

    methods: {
      getMusic() {
        this.$store.dispatch('getMusicByArtist', this.artist)
        this.artist = ""
      },

      prevPlay(id) {
        this.$emit('prevPlay', id)
      },

      playTitle(id) {
        this.$emit('playTitle', id)
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
</style>