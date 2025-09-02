export interface Product {
  id: string
  name: string
  artist: string
  coverArtUrl: string
}

export interface CreateProductRequest {
  name: string
  artist: string
  coverArt: File
}