import express, { Request, Response } from 'express';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(`hey there`);
});

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});