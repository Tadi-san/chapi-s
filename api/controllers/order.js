import prisma from "../config/prismaConfig.js";

const orderController = {
  // CRUD
  
  createOrder: async (req, res) => {
    try {
      const { items, table, total, waiter } = req.body;

      const order = await prisma.order.create({
        data: {
          table,
          total,
          waiter,
        },
      });

      if (!order) {
        throw new Error("Order not created");
      }

      const createdOrders = await prisma.$transaction(
        items.map((item) =>
          prisma.orderItem.create({
            data: {
              menuItemId: item.menuItem,
              orderId: order.id,
              quantity: item.quantity,
            },
          })
        )
      );

      if (!createdOrders) {
        throw new Error("Order items not created");
      }

      const finalOrder = await prisma.order.findUnique({
        where: { id: order.id },
        include: {
          items: true,
        },
      });

      if (!finalOrder) {
        throw new Error("Could not get final order");
      }

      console.log("Final order:", finalOrder);
      return res.status(200).json(finalOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Error creating order" });
    }
},
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { items, table, total, waiter } = req.body;
  
      // Check if the order exists
      const existingOrder = await prisma.order.findUnique({
        where: { id },
        include:{
          items:true
        }
      });
  
      if (!existingOrder) {
        console.log("Order doesn't exist");
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Update the order
      const order = await prisma.order.update({
        where: { id },
        data: {
          table,
          total,
          waiter,
        },
      });
  
      // Delete the existing order items
      const deletedOrderItems = await prisma.$transaction(
        existingOrder.items.map((item) =>
          prisma.orderItem.delete({
            where: { id: item.id },
          })
        )
      );
  
      // Create new order items
      const createdOrderItems = await prisma.$transaction(
        items.map((item) =>
          prisma.orderItem.create({
            data: {
              menuItemId: item.menuItem,
              orderId: id,
              quantity: item.quantity,
            },
          })
        )
      );
  
      // Fetch the updated order with the new order items
      const finalOrder = await prisma.order.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });
  
      console.log("Final order:", finalOrder);
      return res.status(200).json(finalOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ error: "Error updating order" });
    }
},
  getOrders: async (req, res) => {
    try {
        const Orders = await prisma.order.findMany({
          include:{
            items:true
          }
        })
        res.status(200).json(Orders)
    } catch (error) {
        console.error('Error retrieving Orders:', error)
        res.status(500).json({ error: "faild to get Orders" })
    }
},
  getOrderById: async (req, res) => {
    try {
        const { id } = req.params;

        const order = await prisma.order.findUnique({ 
          where: { id },
          include:{ items:true }
      });

        if (!order) {
            return res.status(404).json({ error: 'order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ error: 'Failed to get the order' });
    }
},
  deleteOrder: async (req, res) => {
  try {
      const { id } = req.params;
      // Check if the order exists
      const existingOrder = await prisma.order.findUnique({
        where: { id },
        include:{
          items:true
        }
      });
  
      if (!existingOrder) {
        console.log("Order doesn't exist");
        return res.status(404).json({ error: "Order not found" });
      }
      const deletedOrderItems = await prisma.$transaction(
        existingOrder.items.map((item) =>
          prisma.orderItem.delete({
            where: { id: item.id },
          })
        )
      );
      if (!deletedOrderItems) {
        console.log("OrderItems Not deleted ");
        return res.status(404).json({ error: "OrderItems Not deleted" });
      }

      await prisma.order.delete({
          where: { id }
      })
      res.json({ message: "order deleted successfully" })
  } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Failed to delete order' });
  }
},
// Actions

};

export default orderController;


// router.get("/yalderese", async (req, res) => {
  
//     // const user = await User.findById()
//     // user.notification = null
//     // await user.save()

//   try {
//     const orders = await Order.find({ made: false })
//       .sort({ _id: -1 })
//       .limit(20)
//       .exec();
//     res.json(orders);
//   } catch (error) {
//     res.json(error);
//   }
// });

// router.post("/yederese", async (req, res) => {
//   const { name } = req.body;
//   try {
//     const orders = await Order.find({ made: true })
//       .sort({ _id: -1 })
//       .limit(20)
//       .exec();
//     const user = await User.findOne({name:name});
    
//     if (user.notification === "" || user.notification === null) {
//       res.json(orders);
//     } else {
//       user.notification = "";
//       await user.save();
//       res.json(orders);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/get-food", async (req, res) => {
//   const { id } = req.body;
//   const order = await Order.findById(id);
//   if (order) {
//     const { items } = order;
//     const menuItemIds = items.map((item) => item.menuItem);
//     const menuItems = await Menu.find({ _id: { $in: menuItemIds } });

//     // Create an array of menu items with their respective quantities and prices
//     const itemsWithQuantities = items.map((item) => {
//       const menuItem = menuItems.find(
//         (menu) => menu._id.toString() === item.menuItem.toString()
//       );
//       const price = menuItem ? menuItem.price : null;
//       return { menuItem, quantity: item.quantity, price };
//     });

//     res.json(itemsWithQuantities);
//   } else {
//     res.json("This order is not in the database.");
//   }
// });
// router.post("/pay/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const order = await Order.findById(id);

//   if (order) {
//     order.set({
//       cashier: name,
//       paid: true,
//     });
//     await order.save();
//     console.log(name)
//     const cashier = await User.findOne({ name: name });
//     console.log(cashier)
//     if (cashier) {
//       cashier.MoneyMade = cashier.MoneyMade + order.total;
//       cashier.itemsSold = cashier.itemsSold + 1;
//       await cashier.save();
//       res.json(order);
//     } else {
//       res.json("Cashier not found");
//     }
//   } else {
//     res.json("Order not found");
//   }
// });

// router.post("/unpay/:id", async (req, res) => {
//   const { id } = req.params;
//   const order = await Order.findById(id);
//   if (order) {
//     order.set({
//       paid: false,
//     });
//     await order.save();
//     res.json(order);
//   } else {
//     res.json("order Not found");
//   }
// });

// router.get("/unpaid", async (req, res) => {
//   try {
//     const orders = await Order.find({ paid: false })
//       .sort({ _id: -1 })
//       .limit(30)
//       .exec();
//     res.json(orders);
//   } catch (error) {
//     res.json(error);
//   }
// });

// router.get("/paid", async (req, res) => {
//   try {
//     const orders = await Order.find({ paid: true })
//       .sort({ _id: -1 })
//       .limit(30)
//       .exec();

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.get("/unmade", async (req, res) => {
//   try {
//     const orders = await Order.find({ made: false })
//       .sort({ _id: -1 })
//       .limit(30)
//       .exec();
//     res.json(orders);
//   } catch (error) {
//     res.json(error);
//   }
// });

// router.get("/made", async (req, res) => {
//   try {
//     const orders = await Order.find({ made: true })
//       .sort({ _id: -1 })
//       .limit(30)
//       .exec();

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/unmake/:id", async (req, res) => {
//   const { id } = req.params;
//   // const name = req.session.name
//   const order = await Order.findById(id);
//   if (order) {
//     order.set({
//       // cashier:name,
//       made: false,
//     });
//     await order.save();
//     res.json(order);
//   } else {
//     res.json("order Not found");
//   }
// });

// router.post("/make/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const order = await Order.findById(id);
  
//   if (order) {
//     order.made = true;
//     order.chef = name;
//     await order.save();
    
//     const waiter = await User.findOne({ name: order.waiter });
    
//     if (waiter) {
//       console.log(waiter)
//       waiter.notification = name;
//       await waiter.save();
//       console.log(waiter)
//     }
    
//     res.json(order);
//   } else {
//     res.json("Order not found");
//   }
// });
// router.post('/serve/:id', async(req,res)=>{
//   const {id} = req.params
//   const order = await Order.findById(id)
//   if (order){
//     order.served = true
//     await order.save()
//     res.json(order)
//   }
//   else{
//     res.json("order not found")
//   }
// })

// router.post('/unserve/:id', async(req,res)=>{
//   const {id} = req.params
//   const order = await Order.findById(id)
//   if (order){
//     order.served = false
//     await order.save()
//     res.json(order)
//   }
//   else{
//     res.json("order not found")
//   }
// })


// module.exports = router;
