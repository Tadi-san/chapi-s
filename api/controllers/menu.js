import prisma from "../config/prismaConfig.js";

const menuController = {
  createMenu: async (req, res) => {
  try {
    const { name, price, category, cafe_id } = req.body;

    const cafe = await prisma.cafe.findFirst({
      where: { id: cafe_id },
    });

    if (!cafe) {
      return res.status(400).json({ error: "Cafe does not exist" });
    }

    const existingMenu = await prisma.menu.findFirst({
      where: { name, cafe_id },
    });

    if (existingMenu) {
      return res.status(400).json({ error: "Menu already exists" });
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        price,
        category,
        cafe_id,
      },
    });

    res.status(200).json(menu);
  } catch (error) {
    console.error({ error: "Failed to create Menu" });
    res.status(500).json({ error: "Failed to add Menu" });
  }
},
  getMenus: async (req, res) => {
    try {
      const { cafe_id } = req.body;
      const Menu = await prisma.menu.findMany(
        { where: { cafe_id: cafe_id } }
      );
      res.status(200).json(Menu);
    } catch (error) {
      console.error("Error retrieving Menu:", error.message);
      res.status(500).json({ error: "faild to get Menu" });
    }
  },
  getMenuById: async (req, res) => {
    try {
      const { id } = req.params;

      const menu = await prisma.menu.findUnique({ where: { id } });

      if (!menu) {
        return res.status(404).json({ error: "menu not found" });
      }
      res.status(200).json(menu);
    } catch (error) {
      console.error("Error retrieving menu:", error);
      res.status(500).json({ error: "Failed to get the payer" });
    }
  },
  updateMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, category} =
        req.body;

      const existingmenu = await prisma.menu.findUnique({
        where: { id },
      });

      if (!existingmenu) {
        return res.status(404).json({ error: "menu not found" });
      }

      const updatedMenu = await prisma.menu.update({
        where: { id },
        data:{ name, price, category},
      });

      res.status(200).json(updatedMenu);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update menu" });
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.menu.delete({
        where: { id },
      });
      res.json({ message: "menu deleted successfully" });
    } catch (error) {
      console.error("Error deleting menu:", error);
      res.status(500).json({ error: "Failed to delete menu" });
    }
  },

  // Actions 

  // getFood:async (req,res)=>{
  //   try {
  //     const menuItems = await prisma.menu.findMany({
  //       where:{category:"Food"}
  //     })
  //     if (!menu){

  //     }
  //   } catch (error) {
      
  //   }
  // },

};

export default menuController;
