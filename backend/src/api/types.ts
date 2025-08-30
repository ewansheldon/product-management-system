export interface ProductRequest {
  name: string;
  artist: string;
}

export interface ProductResponse extends ProductRequest {
  id: number;
}