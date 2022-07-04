const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const posts = {};
const generator = () => randomBytes(4).toString("hex");

const app = express();
app.use(cors());
app.use(bodyParser.json())

/// get route for getting posts 
app.get("/posts", (req, res) => {
    res.json(posts);
});


/// post route to sent posts 
app.post("/posts", (req, res, next) => {
    const id = generator();
    const { title } = req.body;
    posts[id] = {
        id,
        title
    };
    axios.post("http://event-bus-srv:4005/events",{
        type:"PostCreated",
        data:{
            id,title
        }
    });
    res.status(201).json(posts[id]);
});


app.post("/events",async (req,res)=>{
   
    res.send({});
});

app.listen(4000, () => {
    console.log("v40")
    console.log("listening on 4000");
})