import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from "morgan";
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoute.js';

//config env
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/room", productRoutes);
app.use("/api/v1/user", userRoutes);

//rest api
app.get('/', (req, res) => {
    res.send(
        "<h1>welcome to hotel app</h1>"
    );
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})