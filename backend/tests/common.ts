import { ProductResponse, CreateProductRequest, UpdateProductRequest } from "../src/api/types"

export const exampleProduct:ProductResponse = {
    id: 1,
    name: 'Have One on Me',
    artist: 'Joanna Newsom'
}

export const exampleCreateProductRequest:CreateProductRequest = {
    name: 'Love Is Overtaking me',
    artist: 'Arthur Russell'
}

export const exampleUpdateProductRequest:UpdateProductRequest = {
    name: 'Ys',
}