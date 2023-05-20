import express from 'express'
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.error('Failed to connect:', error);
  });

  const app = express();
  app.use(express.json());

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  