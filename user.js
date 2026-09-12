const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    addresses: [{
        _id: false,
        location: String,
        city: String,
    }]
});

const User = mongoose.model("User",userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "John Doe",
        addresses: [
            { location: "123 Main St", city: "New York" },
            { location: "456 Elm St", city: "Los Angeles" }
        ]
    })
    user1.addresses.push({ location: "789 Oak St", city: "Chicago" });
    let result = await user1.save();
    console.log(result);
}

addUsers();