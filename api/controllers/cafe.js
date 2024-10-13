import prisma from "../config/prismaConfig.js";

const cafeController = {
  createcafe: async (req, res) => {
    try {
      const { name } = req.body;
//check cafe exists 
const Existingcafe = await prisma.cafe.findFirst({
  where: { name }, 
});

if (Existingcafe) {
  return res.status(400).json({ Existingcafe, error: "cafe already exist" });
}

      const cafe = await prisma.cafe.create({
        data: {
            name, 
        },
      });

      res.status(200).json(cafe);
    } catch (error) {
      console.error({ error: "Failed to create cafe" });
      res.status(500).json({ error: "Failed to add cafe" });
    }
  },
  getcafes: async (req, res) => {
    try {
      const {cafe_id} = req.body
      const cafe = await prisma.cafe.findMany();
      res.status(200).json(cafe);
    } catch (error) {
      console.error("Error retrieving cafe:", error);
      res.status(500).json({ error: "faild to get cafe" });
    }
  },
  getcafeById: async (req, res) => {
    try {
      const { id } = req.body;

      const cafe = await prisma.cafe.findUnique({ where: { id } });

      if (!cafe) {
        return res.status(404).json({ error: "cafe not found" }); 
      }
      res.status(200).json(cafe);
    } catch (error) {
      console.error("Error retrieving cafe:", error);
      res.status(500).json({ error: "Failed to get the payer" });
    }
  },
  updatecafe: async (req, res) => {
    try {
      const { id } = req.params;
      const {amount, unit, name} =
        req.body;

      const existingcafe = await prisma.cafe.findUnique({
        where: { id },
      });

      if (!existingcafe) {
        return res.status(404).json({ error: "cafe not found" });
      }

      const updatedcafe = await prisma.cafe.update({
        where: { id },
        data:{amount:parseFloat(amount), unit, name},
      });

      res.status(200).json(updatedcafe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update cafe" });
    }
  },
  deletecafe: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.cafe.delete({
        where: { id },
      });
      res.json({ message: "cafe deleted successfully" });
    } catch (error) {
      console.error("Error deleting cafe:", error);
      res.status(500).json({ error: "Failed to delete cafe" });
    }
  },


};

export default cafeController;
