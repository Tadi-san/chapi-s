import express from 'express';
const router = express.Router();
import ingredientController from '../controllers/ingredient.js';
const ingredientControllerInstance = ingredientController;

router.post('/', ingredientControllerInstance.getIngredients);
router.post('/create', ingredientControllerInstance.createIngredient);
router.post('/find', ingredientControllerInstance.getIngredientById);
router.post('/update/:id', ingredientControllerInstance.updateIngredient);
router.get('/delete/:id', ingredientControllerInstance.deleteIngredient);

export default router;