import prisma from "../config/prismaConfig.js";

const ingredientController = {
  createIngredient: async (req, res) => {
    try {
      const { name, amount, unit, inventory_id, cafe_id} =
        req.body;
//check cafe exists 
const cafe = await prisma.cafe.findFirst({
  where: { id: cafe_id}, 
});

if (!cafe) {
  return res.status(400).json({ error: "cafe does not exist" });
}
//check inventory exists
const inventory = await prisma.inventory.findFirst({
  where: { id: inventory_id}, 
}); 
if (!inventory) {
  return res.status(400).json({ error: "inventory does not exist" });
}

      const ingredient = await prisma.ingredient.create({
        data: {
            name, 
            amount: parseFloat(amount),
            unit,
            inventory_id,
            cafe_id
        },
      });

      res.status(200).json(ingredient);
    } catch (error) {
      console.error({ error: "Failed to create ingredient" });
      res.status(500).json({ error: "Failed to add ingredient" });
    }
  },
  getIngredients: async (req, res) => {
    try {
      const {cafe_id} = req.body
      const ingredient = await prisma.ingredient.findMany();
      res.status(200).json(ingredient);
    } catch (error) {
      console.error("Error retrieving ingredient:", error);
      res.status(500).json({ error: "faild to get ingredient" });
    }
  },
  getIngredientById: async (req, res) => {
    try {
      const { id } = req.body;

      const ingredient = await prisma.ingredient.findUnique({ where: { id } });

      if (!ingredient) {
        return res.status(404).json({ error: "ingredient not found" }); 
      }
      res.status(200).json(ingredient);
    } catch (error) {
      console.error("Error retrieving ingredient:", error);
      res.status(500).json({ error: "Failed to get the payer" });
    }
  },
  updateIngredient: async (req, res) => {
    try {
      const { id } = req.params;
      const {amount, unit, name} =
        req.body;

      const existingingredient = await prisma.ingredient.findUnique({
        where: { id },
      });

      if (!existingingredient) {
        return res.status(404).json({ error: "ingredient not found" });
      }

      const updatedingredient = await prisma.ingredient.update({
        where: { id },
        data:{amount:parseFloat(amount), unit, name},
      });

      res.status(200).json(updatedingredient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update ingredient" });
    }
  },
  deleteIngredient: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.ingredient.delete({
        where: { id },
      });
      res.json({ message: "ingredient deleted successfully" });
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      res.status(500).json({ error: "Failed to delete ingredient" });
    }
  },


};

export default ingredientController;
