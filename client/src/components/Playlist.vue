<template>
  <div class="row list">
    <div v-if="playlist._id && revealed" v-for="song in playlist.songs" :key="song.trackId" class="col-md-8 col-xs-12 song-card">
      <div class="card bg-light mb-3">
        <h3 class="card-header clickable" @click="playTitle(song._id)">{{song.artist}}: {{song.title}}</h3>
        <div class="card-body">
          <audio controls :id="song._id" @play="prevPlay(song._id)">
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
</template>

<script>
  export default {
    name: 'Playlist',

    props: ['revealed', 'activePlayer'],

    data() {
      return {

      };
    },

    methods: {

      prevPlay(id) {
        this.$emit('prevPlay', id)
        // if (this.activePlayer) {
        //   this.activePlayer.pause()
        // }
        // this.activePlayer = document.getElementById(id)
      },

      playTitle(id) {
        this.$emit('playTitle', id)
        // let aud = document.getElementById(id)
        // console.log(aud)
        // //@ts-ignore
        // aud.play()
      },

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