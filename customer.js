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

// customerSchema.pre('findOneAndDelete', async(data)=> {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post('findOneAndDelete', async(customer)=>{
    if(customer.orders.length){
        Order.deleteMany({_id:{$in:customer.orders}})
    }
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


const addCust = async () => {
    let newCust = new Customer({
        name:"Maruthi"
    })

    let newOrder = new Order({
        item:"Pizza",
        price:250
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
}

// addCust();

const delCust = async () => {
    let data= await Customer.findByIdAndDelete("64a0e1f5c3b2f8e5d6a7b9c1");
    console.log("Customer deleted:", data);
}

// delCust();