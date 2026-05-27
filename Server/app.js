import express from 'express';
import cors from 'cors';
import signin from './controllers/Login.js';
import Signup from './controllers/Signup.js';
import { connection } from './db.js';

const app = express();
// Use environment variable PORT or fallback to 3001
const PORT = process.env.PORT || 3001;

// Initialize MongoDB connection
connection();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5174', // client dev server port
  credentials: true,
}));

// Mount routers
app.use('/api/login', signin);
app.use('/api', Signup); // routes defined in Signup.js (e.g., /signup)

// Basic health check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;