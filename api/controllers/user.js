import prisma from "../config/prismaConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secretKey = process.env.JWT_SECRET;
const saltRounds = 10;


const userController = {
  createUser: async (req, res) => {
    try {
      const { password, name, field , cafe_id} =
        req.body;
      // check if user exists
      const existingUser = await prisma.user.findFirst({
        where: { name, field },
    });
    // check if cafe exists
    const cafe = await prisma.cafe.findFirst({
      where: { id: cafe_id },
    })
    if (!cafe) {
      return res.status(400).json({ error: "cafe does not exist" });
    }

      if (existingUser) {
        return res.status(400).json({ error: "user already exists" });
      }
        // hash password
        // const salt = bcrypt.genSaltSync(bcryptSalt);
        // const hashPass = bcrypt.hashSync(password, salt);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await prisma.user.create({
        data: {
            name, 
            password:hashedPassword,
            field,
            cafe_id
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error({ error: "Failed to create user" });
      res.status(500).json({ error: "Failed to add user" });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { name, password } = req.body;
  
      // Check if field is provided

  
      const user = await prisma.user.findFirst({
        where: { name },
      });
  
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      const responseToken = jwt.sign({ type: 'user', userId: user.id }, secretKey);
      res.json({ user, token: responseToken });
    } catch (error) {
      console.error({ error: "Failed to login user" });
      res.status(500).json({ error: "Failed to login user" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const {cafe_id} = req.body
      const user = await prisma.user.findMany({
        where: {cafe_id: cafe_id},
      });
      res.status(200).json(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "faild to get user" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ error: "Failed to get the payer" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const {name, field, password} =
        req.body;

      const existinguser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existinguser) {
        return res.status(404).json({ error: "user not found" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const updateduser = await prisma.user.update({
        where: { id },
        data:{
          name, 
          field, 
          password:hashedPassword,
        },
      });

      res.status(200).json(updateduser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },
  deleteuser: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { id },
      });
      res.json({ message: "user deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },


};

export default userController;
