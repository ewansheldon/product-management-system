# API Documentation

## Get all products

**GET** `/products`

Gets all the products.

- Status `200`
- Response body `application/json`

```
[
  {
    "id": "uuid",
    "name": "string",
    "artist": "string",
    "coverArtUrl": "/products/:id/coverArt"
  },
  ...
]
```

Example curl: `curl $API_URL/products`

---

## Create Product

**POST** `/products`

Creates a new product.

- Body: `multipart/form-data`
  - `name` (string, required)
  - `artist` (string, required)
  - `coverArt` (file, required, jpg/png)

- Status `201`
- Response body `application/json`

```
{
  "id": "uuid",
  "name": "string",
  "artist": "string",
  "coverArtUrl": "/products/:id/coverArt"
}
```

Example curl: `curl -X POST $API_URL/products -F "name=album name" -F "artist=artist name" -F "coverArt=@/path/to/image.jpg`

---

## Update Product

**PATCH** `/products/:id`

Updates the product.

- Body: `multipart/form-data`
  - `name` (string)
  - `artist` (string)
  - `coverArt` (file, jpg/png)

- Status `200`
- Response body `application/json`

```
{
  "id": "uuid",
  "name": "string",
  "artist": "string",
  "coverArtUrl": "/products/:id/coverArt"
}
```

Example curl: `curl -X PATCH $API_URL/products/1 -F "name=new album name"`

---

## Delete product

**DELETE** `/products/:id`

Deletes the product.

- Status `204`

Example curl: `curl -X DELETE $API_URL/products/1`