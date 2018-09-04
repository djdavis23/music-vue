<template>
  <div class="row">
    <div v-for="song in playlist.songs" :key="song.id" class="col-md-6 col-xs-12 song-card">
      <div class="card bg-light mb-3">
        <h3 class="card-header clickable" @click="playTitle(song.id)">{{song.artist}}: {{song.title}}</h3>
        <div class="card-body">
          <audio controls :id="song.id" @play="prevPlay(song.id)">
            <source :src="song.preview" type="audio/ogg">
            <source :src="song.preview" type="audio/aac">
            <source :src="song.preview" type="audio/mp4"> Your browser does not support the audio element.
          </audio>
        </div>
        <div class="card-footer">
          <span class="clickable" @click="moveUp(song)"><i class="fas fa-chevron-circle-up"></i></span>&nbsp
          <span class="clickable" @click="moveDown(song)"><i class="fas fa-chevron-circle-down"></i></span>&nbsp
          <span class="clickable" @click="remove(song)"><i class="fas fa-minus-circle"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Playlist',

    data() {
      return {
        revealed: false
      };
    },

    methods: {
      //this function will pause the previously selected audio track and set
      //current track as the active player
      prevPlay(id) {
        if (this.activePlayer) {
          this.activePlayer.pause();
        }
        this.activePlayer = document.getElementById(id);
      },

      //this function plays the preview for the selected title element
      playTitle(id) {
        let aud = document.getElementById(id);
        console.log(aud);
        //@ts-ignore
        aud.play();
      },

      moveUp(song) {
        let index = this.playlist.songs.indexOf(song)
        let temp = this.playlist.songs[index - 1]
        this.playlist.songs[index - 1] = song
        this.playlist.songs[index] = temp
        this.$store.dispatch('updatePlaylist', this.playlist)
      },

      moveDown(song) {
        let index = this.playlist.songs.indexOf(song)
        let temp = this.playlist.songs[index + 1]
        this.playlist.songs[index + 1] = song
        this.playlist.songs[index] = temp
        this.$store.dispatch('updatePlaylist', this.playlist)
      },

      remove(song) {
        let index = this.playlist.songs.indexOf(song)
        this.playlist.songs.splice(index, 1)
        this.$store.dispatch('updatePlaylist', this.playlist)
        console.log(song);
      }
    },

    computed: {
      user() {
        return this.$store.state.user;
      },

      playlist() {
        return this.$store.state.playlist;
      }
    }
  };
</script>


<style scoped>
</style>