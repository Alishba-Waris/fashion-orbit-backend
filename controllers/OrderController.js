const Order = require('../models/OrderModel');

const createOrder = async(req, res) => {
    const { items, totalAmount, username, email, phone, address, city, country, postalcode} = req.body;

    try {
        newOrder = new Order({
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

}

module.exports = createOrder;

