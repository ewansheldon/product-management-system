import express, { Response, Request, NextFunction } from 'express';
import * as productController from '../../src/api/product.controller';
import { ProductRequest } from './types';
import { InvalidParamsError } from './errors';

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/products', async (_req: Request, res: Response) => {
  res.json(await productController.getAll());
});

app.post('/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json(await productController.create(req.body as ProductRequest));
  } catch (e) {
    next(e);
  }
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InvalidParamsError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
})

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});