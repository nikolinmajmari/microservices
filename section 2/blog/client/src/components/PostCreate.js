import React,{useState} from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>{
    const [title,setTitle] = useState(" ");
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const res = await axios.post("http://posts.com/posts/create",{
            title
        })

        setTitle(" ");
    }


   return ( <div className="container">
   <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
            Title
        </label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" id="title" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <button className="btn btn-primary">Submit</button>
    </div>
   </form>
</div>);
}