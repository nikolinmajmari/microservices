import React, { useState, useEffect } from "react";
import axios from "axios";


// eslint-disable-next-line import/no-anonymous-default-export
export default ({comments}) => {
    const renderedComments = Object.values(comments).map(comment=>{
        console.log(comment);
        let content;
        if(comment.status ==="approved"){
            content = comment.content;
        }else if(comment.status === "pending"){
            content = "This comment is awaiting moderation";
        }else if(comment.status==="rejected"){
            content = "This Comment is rejected"
        }
        
        
        return <li key={comment.id}>{content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
};