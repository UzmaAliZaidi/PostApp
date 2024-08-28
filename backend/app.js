const express = require('express');
const bodyParser = require("body-parser");
const Post = require('./models/post');
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb+srv://uzma7102:4ysSqmLPy6Ut7a4O@cluster0.5myd5.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0")
    .then(() =>{
        console.log('connected to database');
    })
    .catch((error) =>{
        console.log('connection failed', error);
    });


app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: "post added successfully",
            postId : createdPost._id
        });
    });
    
})

app.put("/api/posts/:id",(req, res, next) =>{
    const post = new Post({
        _id : req.body.id,
        title: req.body.title,
        content: req.body.content 
    });
    Post.updateOne({ _id:req.params.id }, post).then(result =>{
        console.log(result);
        res.status(200).json({ message : "Update successful"});
    })
});

app.get('/api/posts/get', async (req, res, next) => {
    const p = await Post.find({});
    res.status(200).json({
        message:'posts fetch successfully',
        posts: p
    });
});

app.delete("/api/posts/:id", (req , res ,next) =>{
    
    Post.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(200).json({ message : "Post Deleted" });
    });

});
 


module.exports = app ; 