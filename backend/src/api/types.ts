export interface ProductRequest {
    name: string;
    artist: string;
}

export interface Product extends ProductRequest {
    id: number;
}