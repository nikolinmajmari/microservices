import React, { useState } from "react";
import axios from "axios";



// eslint-disable-next-line import/no-anonymous-default-export
export default ({postId})=>{
    const [content,setContent] = useState();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios.post(`http://127.0.0.1:4001/posts/${postId}/comments`,{
            content
        });
        setContent("");
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>New Comment</label>
                <input value={content} 
                onChange={e=>setContent(e.target.value)}
                className="form-control"/>
            </div>
            <div className="mb-3">
                <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>)
}