import prisma from "../config/prismaConfig.js";

const inventoryController = {
  createInventory: async (req, res) => {
    try {
      const { name, amount, unit, cafe_id, price} =
        req.body;
        const cafe = await prisma.cafe.findFirst({
          where: { id: cafe_id },
        });
        if (!cafe) {
          return res.status(400).json({ error: "cafe does not exist" });
        }
      const inventory = await prisma.inventory.create({
        data: {
            name, 
            amount: parseFloat(amount),
            unit,
            cafe_id,
            price:parseFloat(price)
        },
      });

      res.status(200).json(inventory);
    } catch (error) {
      console.error({ error: "Failed to create inventory", error });
      res.status(500).json({ error: "Failed to add inventory" });
    }
  },
  getInventorys: async (req, res) => {
    try {
      const {cafe_id} = req.body
      const inventory = await prisma.inventory.findMany(
        {
          where:{cafe_id: cafe_id},
        }
      );
      res.status(200).json(inventory);
    } catch (error) {
      console.error("Error retrieving inventory:", error);
      res.status(500).json({ error: "faild to get inventory" });
    }
  },
  getInventoryById: async (req, res) => {
    try {
      const { id } = req.params;

      const inventory = await prisma.inventory.findUnique({ where: { id } });

      if (!inventory) {
        return res.status(404).json({ error: "inventory not found" });
      }
      res.status(200).json(inventory);
    } catch (error) {
      console.error("Error retrieving inventory:", error);
      res.status(500).json({ error: "Failed to get the payer" });
    }
  },
  updateInventory: async (req, res) => {
    try {
      const { id } = req.params;
      const {amount, unit, name, price} =
        req.body;

      const existinginventory = await prisma.inventory.findUnique({
        where: { id },
      });

      if (!existinginventory) {
        return res.status(404).json({ error: "inventory not found" });
      }

      const updatedinventory = await prisma.inventory.update({
        where: { id },
        data:{
          amount:parseFloat(amount), 
          unit, 
          name, 
          price: parseFloat(price),
        },
      });

      res.status(200).json(updatedinventory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update inventory" });
    }
  },
  deleteInventory: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.inventory.delete({
        where: { id },
      });
      res.json({ message: "inventory deleted successfully" });
    } catch (error) {
      console.error("Error deleting inventory:", error);
      res.status(500).json({ error: "Failed to delete inventory" });
    }
  },


};

export default inventoryController;
