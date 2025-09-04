# Product Management System

This is a simple product management system for a music-centric environment, made up of an API service and a client application.

This system allows you to create a product, providing:
- the name of the product
- the name of the artist or band associated with the product
- an image upload of the product's cover art

It also allows you to view the current list of products.

## Getting Started

You can run both the Client Application and API service together locally, with production-style builds, with Docker.

Start Docker and run from the root of the project:

```
docker compose up
```

If you would prefer to run the applications without Docker, you can read below how to run each in development mode.

## API service

The API is written with Express + Typescript. To run in dev mode:

```
cd backend
npm install
npm start
```

To run the tests:

```
npm test
```

The documentation for using the API can be found [here](backend/README.md#api-documentation).

## Client Application

The client application is written with React + Vite + Typescript. To run in dev mode:

```
cd frontend
npm install
npm run dev
```

To run the tests:

```
npm test
```

## Considerations

- All products are stored in memory in the API service, therefore restarting the application will reset the product data. The [in-memory DB](backend/src/db/product.inMemory.db.ts) file needs to be replaced by a real database interface to add persistence.
- Uploads are also stored locally in the API project directory, and cleared every time the application starts. There is a temporary route `/products/:id/coverArt` to retrieve images. In a production environment, this could be replaced by uploads to cloud object storage and retrieved via a CDN from the client application.
- The API has fully functioning update and delete routes for products, but these are not yet supported from the client application.