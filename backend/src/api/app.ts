import express, { Response, Request, NextFunction } from 'express';
import multer from "multer";
import * as productController from '../../src/api/product.controller';
import { CreateProductRequest } from './types';
import { InvalidParamsError } from './errors';

export const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new InvalidParamsError("Invalid cover art file type"));
    }
  },
});

app.use(express.json());

app.get('/products', async (_req: Request, res: Response) => {
  res.json(await productController.getAll());
});

app.post('/products', upload.single('coverArt'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productRequest: CreateProductRequest = {
      ... req.body,
      coverArt: req.file?.buffer
    }
    res.status(201).json(await productController.create(productRequest));
  } catch (e) {
    next(e);
  }
});

app.patch('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await productController.update(Number(req.params.id), req.body as CreateProductRequest));
  } catch (e) {
    next(e);
  }
});

app.delete('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productController.remove(Number(req.params.id));
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InvalidParamsError) {
    return res.status(400).json({ error: err.message });
  }
  console.log(err)
  next(err);
})

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});