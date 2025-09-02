export interface Product {
  id: number
  name: string
  artist: string
  coverArtURL: string
}

export interface CreateProductRequest {
  name: string
  artist: string
  coverArt?: File
}