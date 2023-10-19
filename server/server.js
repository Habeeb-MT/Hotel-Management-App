import express from 'express';
const app = express();
import db from "./db.js";
import router from "./Routes/AuthRoutes.js"
import bodyParser from 'body-parser';
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config();
app.use(bodyParser.json());



app.use(cors());
app.use(express.json());

app.use('/', router);

// const PORT = process.env.PORT || 3000;
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});