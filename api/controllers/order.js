import prisma from "../config/prismaConfig.js";

const orderController = {
  // CRUD
  //TODO: ADD cafe_id to every thing
createOrder: async (req, res) => {
  try {
    const { user_id, items, total, cafe_id, table } = req.body;

    // Start a database transaction
    const result = await prisma.$transaction(async () => {
      // Create the order
      const order = await prisma.order.create({
        data: {
          user_id,
          total,
          cafe_id,
          table,
        },
      });

      // Create the order items
      const orderItems = await Promise.all(
        items.map(async (item) => {
          const menuItem = await prisma.menu.findUnique({
            where: {
              id: item.menuItemId,
            },
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          });

          const orderItem = await prisma.orderItem.create({
            data: {
              menuItemId: menuItem.id,
              orderId: order.id,
              quantity: item.quantity,
            },
          });

          // Update the inventory for each ingredient
          await Promise.all(
            menuItem.ingredients.map(async (menuIngredient) => {
              const ingredient = menuIngredient.ingredient;
              const decrementAmount = ingredient.quantity * item.quantity;

              // Ensure decrementAmount is valid
              if (decrementAmount > 0) {
                await prisma.inventory.update({
                  where: {
                    id: ingredient.inventory_id,
                  },
                  data: {
                    amount: {
                      decrement: decrementAmount,
                    },
                  },
                });
              }
            })
          );

          return orderItem;
        })
      );

      return { order, orderItems };
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
},
getOrders:async (req,res)=>{
  try {
    const { paid, served, all, cafe_id} = req.query
    if (!all){
      const whereClause = {}
      whereClause.paid = paid
      whereClause.served = served
      whereClause.cafe_id = cafe_id
    const orders = await prisma.order.findMany({
      where:whereClause
    })
    if (!orders){
      console.log("faild to get  orders")
      res.status(500).json("faild to get  orders")
    }
    res.status(200).json(orders)
    }
    else{
      const orders = await prisma.order.findMany({where:{cafe_id:cafe_id}})
      if (!orders){
        console.log("faild to get  orders")
        res.status(500).json("faild to get  orders")
      }
      res.status(200).json(orders)
    }

  } catch (error) {
    
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

payOrder:async (req, res)=>{
  try {
    const {id} = req.body;
    const order = await prisma.order.findUnique({
      where:{id},
      data:{
        served:true
      }
    })
    res.status(200).json(order) 
  } catch (error) {
    
  }
},
unpayOrder:async (req, res)=>{
  try {
    const {id} = req.body;
    const order = await prisma.order.findUnique({
      where:{id},
      data:{
        paid:false
      }
    })
    res.status(200).json(order) 
  } catch (error) {
    
  }
},
serveOrder:async (req, res)=>{
  try {
    const {id} = req.body;
    const order = await prisma.order.findUnique({
      where:{id},
      data:{
        served:true
      }
    })
    res.status(200).json(order) 
  } catch (error) {
    
  }
},
unserveOrder:async (req, res)=>{
  try {
    const {id} = req.body;
    const order = await prisma.order.findUnique({
      where:{id},
      data:{
        served:false
      }
    })
    res.status(200).json(order) 
  } catch (error) {
    
  }
},
deleteOrder: async (req, res) => {
  try {
    const { orderId } = req.params;

    // Start a database transaction
    const result = await prisma.$transaction(async () => {
      // Delete the order items associated with the order
      await prisma.orderItem.deleteMany({
        where: {
          orderId,
        },
      });

      // Delete the order
      const deletedOrder = await prisma.order.delete({
        where: {
          id: orderId,
        },
      });

      return deletedOrder;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting order' });
  }
},

// Get Actions


// getUnpaid:async (req,res)=>{
//   try {
//     const orders = await prisma.order.findMany({
//       where:{paid:false}
//     })
//     if (!orders){
//       console.log("faild to get unpaid orders")
//       res.status(500).json("faild to get unpaid orders")
//     }
    
//     res.status(200).json(orders)
//   } catch (error) {
    
//   }
// },
// getServed:async (req,res)=>{
//   try {
//     const orders = await prisma.order.findMany({
//       where:{served:true}
//     })
//     if (!orders){
//       console.log("faild to get served orders")
//       res.status(500).json("faild to get served orders")
//     }
    
//     res.status(200).json(orders)
//   } catch (error) {
    
//   }
// },
// getUnserve:async (req,res)=>{
//   try {
//     const orders = await prisma.order.findMany({
//       where:{served:false}
//     })
//     if (!orders){
//       console.log("faild to get unServed orders")
//       res.status(500).json("faild to get unServed orders")
//     }

//     res.status(200).json(orders)
//   } catch (error) {
    
//   }
// },
// getUnpaidUnserved: async (req, res) => {
//   try {
//     const orders = await prisma.order.findMany({
//       where: {
//         served: false,
//         paid: false,
//       },
//       include:{
//         items: true
//       }
//     });

//     if (orders.length === 0) {
//       return res.status(400).json({ message: 'No unpaid and unserved orders found.' });
//     }

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error getting unpaid and unserved orders:', error);
//     res.status(500).json({ message: 'Failed to get unpaid and unserved orders.' });
//   }
// },


};

export default orderController;