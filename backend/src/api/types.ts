export interface ProductResponse {
  id: number;
  name: string;
  artist: string;
  coverArtURL: string;
}

export interface CreateProductRequest {
  name: string;
  artist: string;
  coverArt: Buffer;
}

export interface UpdateProductRequest {
  name?: string;
  artist?: string;
  coverArt?: Buffer;
}