import React,{useState,useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";


// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
    const [posts,setPosts] = React.useState({});
    const fetchPosts = async ()=>{
        const res = await axios.get("http://posts.com/posts");
        const data = res.data;
        console.log(data);
        setPosts(data);
    }

    useEffect(()=>{
        fetchPosts();
    },[])

    const renderedPosts = Object.values(posts).map(post=>{
        return (
            <div key={post.id} className="card" style={{width:"30%",minWidth:"200px",marginBottom:"20px"}}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <br/>
                    <CommentCreate postId={post.id}/>
                    <CommentList comments={post.comments}/>
                </div>
            </div>
        );
    });
    return (<div className="d-flex flex-row flex-wrap justify-content-around">
        {
            renderedPosts
        }
    </div>);
}