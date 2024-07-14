// import { PrismaClient } from "@prisma/client";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"
import { MongoClient } from 'mongodb'
import cookieParser from 'cookie-parser'

dotenv.config();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const app = express()

app.use(cookieParser())
const port = 5000
app.use(express.json());

app.use(cors({
  // origin: 'https://system1-nine.vercel.app',
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
  // const menuRoutes = require('./controlers/menu');
  // const profileRoutes = require('./controlers/user');
  import orderRoutes from './route/order.js'
  import menuRoutes from './route/menu.js'
  // app.use('/menu', menuRoutes);
  // app.use('/user', profileRoutes);
  app.use('/orders', orderRoutes);
  app.use('/menu', menuRoutes)
  
  app.get('/', (req, res) => {
  
    res.json("test");
  });

//     // Connect to MongoDB
//  main().then(console.log("connected to db")).catch(err => console.log(err));

//  async function main() {
//   await mongoose.connect(process.env.MONGO_URL);
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


  app.listen(port, () => {
    console.log('Server is running on port 5000');
  });

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     await prisma.user.create({
//       data: {
//         email:"dshjk@gshj"
//       },
//     });

//     const fees = await prisma.user.findMany();
//     console.table(fees);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();