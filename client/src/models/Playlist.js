export default class Playlist {
  constructor(data) {
    this._id = data._id,
      this.userId = data.userId,
      this.songs = data.songs
  }
}