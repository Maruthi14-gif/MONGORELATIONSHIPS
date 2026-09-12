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
    email: String,
});

const postsSchema = new Schema({
    content: String,
    likes: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postsSchema);

const addPosts = async () => {
    let user = await User.findOne({ username: "John Doe" });

    let post2 = new Post({
        content: "hello world",
        likes: 20,
    });

    post2.user = user; // Assign the user ID to the post

    
    await post2.save(); // Save the post with the user reference

};

const getData = async () => {
    let result = await Post.findOne({}).populate("user","username");
    console.log(result);
}
getData();
// addPosts();