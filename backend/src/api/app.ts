import express, { Response, Request } from 'express';
import * as productController from '../../src/api/product.controller';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/products', async (_, res: Response) => {
  res.json(await productController.getAll());
});

app.post('/products', async (req: Request, res: Response) => {
  res.status(201).json(await productController.create(req.body));
});

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});