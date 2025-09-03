import express, { Response, Request, NextFunction } from 'express';
import multer, { FileFilterCallback, MulterError } from "multer";
import * as productController from './product/product.controller';
import { CreateProductRequest, UpdateProductRequest } from './types';
import { InvalidParamsError } from './errors';
import cors from "cors";

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new InvalidParamsError("Invalid cover art file type"));
    }
  },
});

app.get('/products', async (_req: Request, res: Response) => {
  res.json(await productController.getAll());
});

app.post('/products', upload.single('coverArt'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productRequest: CreateProductRequest = {
      ...req.body,
      coverArt: req.file?.buffer
    };
    res.status(201).json(await productController.create(productRequest));
  } catch (e) {
    next(e);
  }
});

app.patch('/products/:id', upload.single('coverArt'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productRequest: UpdateProductRequest = {
      ...req.body,
      coverArt: req.file?.buffer
    };
    res.json(await productController.update(Number(req.params.id), productRequest));
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

app.get('/products/:id/coverArt', async (req: Request, res: Response) => {
  const coverArt = productController.getProductCoverArt(Number(req.params.id));

  res.setHeader('Content-Type', 'image/jpeg');
  res.send(coverArt);
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InvalidParamsError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});