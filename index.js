import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from 'cors';

import { UserRouter } from "./routes/user.js";
import {productRouter } from './routes/product.js';
import {orderRouter } from './routes/order.js'


const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({extended: true,}));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/users',UserRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);


const PORT =process.env.PORT;
//MongoDB Url
const MONGO_URL = `mongodb://localhost`;

// const MONGO_URL =  process.env.MONGO_URL;

//create connection to the MongoDB
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB has Started");
  return client;
}
//Make client as globally available for connect to the DataBase
export const client = await createConnection();


app.get('/',async(req,res)=>{
    res.status(200).send("Welcome to Money Manger");
});

app.listen(PORT,console.log("App running in PORT :",PORT));
