import express from 'express';

export const app = express();
const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});