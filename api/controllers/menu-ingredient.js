import prisma from "../config/prismaConfig.js";

const menuIngredientController = {
    createMenuIngredient: async (req, res) => {
        try {
          const {menu_id, ingredient_id} = req.body
    
          const menuIngredient = await prisma.menuIngredient.create({
            data: {
              menu_id: menu_id,
              ingredient_id: ingredient_id
            }
          })
          res.status(200).json(menuIngredient)
    
        }catch(error){
          console.error("Error deleting ingredient:", error);
          res.status(500).json({ error: "Failed to delete ingredient" });
        }
    },

  getmenuIngredients: async (req, res) => {
    try {
    //   const {cafe_id} = req.body
      const menuIngredient = await prisma.menuIngredient.findMany({
        include: {
          menu: true,
          ingredient: true,
        },
      });
      res.status(200).json(menuIngredient);
    } catch (error) {
      console.error("Error retrieving menuIngredient:", error);
      res.status(500).json({ error: "faild to get menuIngredient" });
    }
  },
  getmenuIngredientById: async (req, res) => {
    try {
      const { id } = req.params;

      const menuIngredient = await prisma.menuIngredient.findUnique({ where: { id } });

      if (!menuIngredient) {
        return res.status(404).json({ error: "menuIngredient not found" }); 
      }
      res.status(200).json(menuIngredient);
    } catch (error) {
      console.error("Error retrieving menuIngredient:", error);
      res.status(500).json({ error: "Failed to get the payer" });
    }
  },
  updatemenuIngredient: async (req, res) => {
    try {
      const { id } = req.params;
      const {menu_id, ingredient_id,} =
        req.body;

      const existingmenuIngredient = await prisma.menuIngredient.findUnique({
        where: { id },
      });

      if (!existingmenuIngredient) {
        return res.status(404).json({ error: "menuIngredient not found" });
      }

      const updatedmenuIngredient = await prisma.menuIngredient.update({
        where: { id },
        data:{menu_id, ingredient_id},
      });

      res.status(200).json(updatedmenuIngredient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update menuIngredient" });
    }
  },
  deletemenuIngredient: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.menuIngredient.delete({
        where: { id },
      });
      res.json({ message: "menuIngredient deleted successfully" });
    } catch (error) {
      console.error("Error deleting menuIngredient:", error);
      res.status(500).json({ error: "Failed to delete menuIngredient" });
    }
  },

}

export default menuIngredientController;
