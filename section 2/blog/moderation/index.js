const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    console.log("request on moderation service");
    next();
})
app.post("/events",async (req,res)=>{
    const {type,data} = req.body;
    console.log("received event of type ",type);
    if(type == "CommentCreated"){
        const {id,content,postId} = data;
        const status = content.includes("orange")?"rejected":"approved";
        await axios.post("http://event-bus-srev:4005/events",{
            type:"CommentModerated",
            data:{ id,postId,content,status}
        })
    }
    res.json({});
});






app.listen(4003,()=>console.log("listening in 4003 moderation service"));

