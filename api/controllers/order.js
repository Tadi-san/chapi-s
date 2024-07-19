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
          total,
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

// Get Actions

getPaid:async (req,res)=>{
  try {
    const orders = await prisma.order.findMany({
      where:{paid:true}
    })
    if (!orders){
      console.log("faild to get paid orders")
      res.status(500).json("faild to get paid orders")
    }

    res.status(200).json(orders)
  } catch (error) {
    
  }
},
getUnpaid:async (req,res)=>{
  try {
    const orders = await prisma.order.findMany({
      where:{paid:false}
    })
    if (!orders){
      console.log("faild to get unpaid orders")
      res.status(500).json("faild to get unpaid orders")
    }
    
    res.status(200).json(orders)
  } catch (error) {
    
  }
},
getServed:async (req,res)=>{
  try {
    const orders = await prisma.order.findMany({
      where:{served:true}
    })
    if (!orders){
      console.log("faild to get served orders")
      res.status(500).json("faild to get served orders")
    }
    
    res.status(200).json(orders)
  } catch (error) {
    
  }
},
getUnserve:async (req,res)=>{
  try {
    const orders = await prisma.order.findMany({
      where:{served:false}
    })
    if (!orders){
      console.log("faild to get unServed orders")
      res.status(500).json("faild to get unServed orders")
    }

    res.status(200).json(orders)
  } catch (error) {
    
  }
},
getUnpaidUnserved: async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        served: false,
        paid: false,
      },
      include:{
        items: true
      }
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No unpaid and unserved orders found.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting unpaid and unserved orders:', error);
    res.status(500).json({ message: 'Failed to get unpaid and unserved orders.' });
  }
},


};

export default orderController;