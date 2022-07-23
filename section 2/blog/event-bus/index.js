const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    console.log("request on event bus service");
    next();
})

const events = [];


app.post("/events",(req,res)=>{
    const event = req.body;
    events.push(event);
    console.log("sending event of ",req.body.type);
    axios.post("http://post-clusterip-serv:4000/events",event).catch((e)=>console.log("error 0"));
    axios.post("http://comments-clusterip-serv:4001/events",event).catch((e)=>console.log(e));
    axios.post("http://query-serv:4002/events",event).catch((e)=>console.log(e));
   axios.post("http://moderation-serv:4003/events",event).catch((e)=>console.log(e));
    res.send({status:"ok"});
});
app.get("/events",async (req,res)=>{
    res.json(events);
});

app.listen(4005,()=>console.log("listening to 4005"));