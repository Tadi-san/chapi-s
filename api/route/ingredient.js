import express from 'express';
const router = express.Router();
import ingredientController from '../controllers/ingredient.js';
const ingredientControllerInstance = ingredientController;

router.get('/', ingredientControllerInstance.getIngredients);
router.post('/', ingredientControllerInstance.createIngredient);
router.get('/:id', ingredientControllerInstance.getIngredientById);
router.put('/:id', ingredientControllerInstance.updateIngredient);
router.delete('/:id', ingredientControllerInstance.deleteIngredient);

export default router;