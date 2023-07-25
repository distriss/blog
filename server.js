const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_STRING)
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));


const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String,
});

const Post = mongoose.model('Post', postSchema);


app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});


app.get('/posts/:id', async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.send(post);
});

// create post
app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.send(savedPost);
});

// delete post
app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send('Post deleted.');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


