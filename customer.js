const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    email: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
});

const Order= mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomers = async () => {
    let customer1 = new Customer({
        name: "Alice Smith",
        email: "alice@example.com",
        orders: []
    });
    let order1 = await Order.findOne({ item: "Laptop" });
    let order2 = await Order.findOne({ item: "Phone" });
    
    customer1.orders.push(order1);
    customer1.orders.push(order2);
    let result = await customer1.save();
    console.log(result);
}


const findCustomer = async () => {
    let customer = await Customer.findOne({}).populate("orders");
    console.log(customer);
}

// const addOrders = async () => {
//     let result = await Order.insertMany([
//         { item: "Laptop", price: 1200 },
//         { item: "Phone", price: 800 },
//         { item: "Tablet", price: 600 }
//     ]);
//     console.log(result);
// }

// addOrders();
// addCustomers();
findCustomer();