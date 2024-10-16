import express from 'express';
const router = express.Router();
import menuIngredientController from '../controllers/menu-ingredient.js';

router.post('/', menuIngredientController.createMenuIngredient);
router.get('/', menuIngredientController.getmenuIngredients);
router.put('/:id', menuIngredientController.updatemenuIngredient);

export default router;