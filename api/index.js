// import { PrismaClient } from "@prisma/client";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
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


  import orderRoutes from './route/order.js'
  import menuRoutes from './route/menu.js'
  import userRoutes from './route/user.js'
  import ingredientRoutes from './route/ingredient.js'
  import inventoryRoutes from './route/inventory.js'
  import cafeRoutes from './route/cafe.js'
  import menuIngredientRoutes from './route/menu-ingredient.js'

  app.use('/api/orders', orderRoutes);
  app.use('/api/menus', menuRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/ingredients', ingredientRoutes);
  app.use('/api/inventories', inventoryRoutes);
  app.use('/api/cafe', cafeRoutes);
  app.use('/api/menu-ingredients', menuIngredientRoutes);
  


  app.listen(port, () => {
    console.log('Server is running on port 5000');
  });
