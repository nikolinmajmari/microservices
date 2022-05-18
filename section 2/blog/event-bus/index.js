const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];


app.post("/events",(req,res)=>{
    const event = req.body;
    events.push(event);
    console.log("sending event of ",req.body.type);
    axios.post("http://127.0.0.1:4000/events",event).catch((e)=>console.log("error 0"));
    axios.post("http://127.0.0.1:4001/events",event).catch((e)=>console.log("error 1"));
    axios.post("http://127.0.0.1:4002/events",event).catch((e)=>console.log("error 2"));
    axios.post("http://127.0.0.1:4003/events",event).catch((e)=>console.log("error 3"));
    res.send({status:"ok"});
});
app.get("/events",async (req,res)=>{
    res.json(events);
});

app.listen(4005,()=>console.log("listening to 4005"));