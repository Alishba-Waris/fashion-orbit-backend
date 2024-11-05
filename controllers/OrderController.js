const Order = require('../models/OrderModel');
const User = require('../models/UserModel');

const createOrder = async(req, res) => {
    const { userId, items, totalAmount, username, email, phone, address, city, country, postalcode} = req.body;

    try {
        newOrder = new Order({
            userId,
            items,
            totalAmount,
            username, 
            email, 
            phone, 
            address,
            city, 
            country, 
            postalcode
            
        });

        await newOrder.save();

        res.status(201).json({newOrder});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }

};

const getOrderDetails = async(req, res) => {
  const {userId} = req.query;
    console.log(req.query)

  try {
    // console.log(orders);
    const orders = await Order.find({userId: userId});
    console.log("userIduserIduserIduserId", userId);
    if (!orders || orders.length === 0) {
      return res.status(400).json({ message: "Orders not found" });
    }

    // const totalAmounts = orders.map(order => order.totalAmount);
    res.json( orders );
    console.log("orders", orders)
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Server error"});    
  }
};

const getRecentOrder = async(req, res) => {
  try {
    const recentOrder = await Order.findOne().sort({createdAt: -1});
    if (!recentOrder){
      res.status(400).json({message: "Order not found"});
    }
    return res.json(recentOrder);
  } catch (error) {
    return res.status(500).json({message: "Server error"});
  }
};

module.exports = {createOrder, getOrderDetails, getRecentOrder};

