import express, { Response } from 'express';
import * as productController from '../../src/api/product.controller';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/products', async (_, res: Response) => {
    res.json(await productController.getAll());
});

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});