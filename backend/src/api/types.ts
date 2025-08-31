export interface CreateProductRequest {
  name: string;
  artist: string;
}

export interface ProductResponse extends CreateProductRequest {
  id: number;
}

export interface UpdateProductRequest {
  name?: string;
  artist?: string;
}