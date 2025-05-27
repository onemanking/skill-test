import 'reflect-metadata';
import app from './app';

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default server;