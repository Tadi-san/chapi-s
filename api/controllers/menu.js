import prisma from "../config/prismaConfig.js";

const menuController = {
  createMenu: async (req, res) => {
    try {
      const { name, price, category} =
        req.body;

      // Check if a student with the same name or grade already exists
      const existingMenu = await prisma.menu.findFirst({
        where: { name },
      });

      if (existingMenu) {
        return res.status(400).json({ error: "Menu already exists" });
      }

      const menu = await prisma.menu.create({
        data: {
          name, price, category
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
      const Menu = await prisma.menu.findMany();
      res.status(200).json(Menu);
    } catch (error) {
      console.error("Error retrieving Menu:", error);
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
};

export default menuController;


// router.post('/add', async (req, res) => {
//     const {name, category, price} = req.body
//                 try{
//                     const item = await Menu.create({
//                         name, category, price
//                     })
//                     res.json(item)
//                 } 
//                 catch(err){
//                     res.json(err)
//                 }      
// })

// router.get('/food', async(req,res)=>{
//     const foods = await Menu.find({category:"Food"})
//     if(foods){
//         res.json(foods)
//         }
//     else{
//         res.json("error ocured finding food menu")
//     }
// })
// router.get('/drink', async(req,res)=>{
//     const drinks = await Menu.find({category:"Drink"})
//     if(drinks){
//         res.json(drinks)
//         }
//     else{
//         res.json("error ocured finding food menu")
//     }
// })

// router.get('/other', async(req,res)=>{
//     const others = await Menu.find({category:"Other"})
//     if(others){
//         res.json(others)
//         }
//     else{
//         res.json("error ocured finding food menu")
//     }
// })

// router.get('/:id', async (req,res)=>{
//     const {id} = req.params
//     const menu = await Menu.findById(id)
  
//       if(menu){
//           return res.json(menu)
//       }
//       else{
//         res.json("Menu not found")
//       }
//   })


  
//   router.post("/edit/:id", async (req, res) => {
//     const { id } = req.params;
//     const { name, price, category } = req.body;
  
//     try {
//       const menu = await Menu.findById(
//         id,
//       );
  
//       if (menu) {
//           menu.name =name,
//           menu.price = price,
//           menu.category = category
//           await menu.save()
//           res.json(menu);
//       } else {
//         res.status(404).json("User not found");
//       }
//     } catch (error) {
//       res.status(422).json(error);
//     }
//   });

//   router.delete("/delete/:id", async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const deletedMenu = await Menu.findByIdAndDelete(id);
  
//       if (deletedMenu) {
//         res.json(deletedMenu);
//       } else {
//         res.status(404).json("Menu not found");
//       }
//     } catch (error) {
//       res.status(422).json(error);
//     }
//   });

  
// module.exports = router;