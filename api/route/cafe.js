import express from 'express';
const router = express.Router();
import cafeController from '../controllers/cafe.js';

router.post('/', cafeController.createcafe);

export default router;