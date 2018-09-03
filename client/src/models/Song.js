
export default class Song {
  constructor(data) {
    this.id = data.trackId,
      this.title = data.trackName,
      this.albumArt = data.artworkUrl60.replace(/60x60/g, "150x150"),
      this.artist = data.artistName,
      this.collection = data.collectionName,
      this.price = data.trackPrice,
      this.preview = data.previewUrl
  }
}