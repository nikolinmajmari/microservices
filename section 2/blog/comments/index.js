const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const commentsByPostId = {};


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
});

app.post("/posts/:id/comments", async(req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];
    comments.push({ id: commentId, content });
    await axios.post("http://event-bus-srv:4005/events",{
        type:"CommentCreated",
        data:{
            postId,
            id:commentId,
            content,
            status:"pending"
        }
    });
    commentsByPostId[postId] = comments;
    res.json(comments);
});

app.post("/events",async (req,res)=>{
    const {type,data} = req.body;
    if(type === "CommentModerated"){
        console.log("received comment moderated event");
        const {postId,id,status,content} = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(
            comment=>comment.id === id
        );
        if(comment!=undefined){
            comment.status = status;
            await axios.post("http://event-bus-srv:4005/events",{
                type:"CommentUpdated",
                data:{id,status,postId,content}
            });
        }
    }

    res.send({});
});


app.listen(4001, () => console.log("listening on 4001"));