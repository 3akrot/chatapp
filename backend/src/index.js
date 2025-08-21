
import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'
import { connectDB } from './lib/db.js';
const app = express();
const PORT = process.env.PORT || 5001;

//
app.use(express.json({limit: '10mb'}));
//this remove the cors error
app.use(cors({
    origin:["http://localhost:5173",'http://192.168.1.4:5173'],
}))

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
  console.log(app.url)
  connectDB();
});