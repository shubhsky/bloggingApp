import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function Blog(){

    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [formData,setFormData] = useState({title:'',content:''})
    const [blogs, setBlogs] = useState([]);

    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[])

    // setStates are asynchronous

    function handleSubmit(e){
        e.preventDefault();
        setBlogs([{title:formData.title, content:formData.content},...blogs]);  // Rest(...) operator what it does is to append new title and content to rest of blogs
        setFormData({title:'',content:''});
        titleRef.current.focus();
    }

    function removeBlog(i){
        setBlogs(blogs.filter((blog,index)=>i!==index))
    }

    return(
        <>
            <h1>Write a Blog!</h1>
            <div className="section">
                <form onSubmit={handleSubmit}>
                    <Row label="Title">
                        <input className="input"
                               placeholder="Enter the Title here...."
                               value={formData.title}
                               ref={titleRef}
                               onChange={(e)=>{
                                setFormData({title:e.target.value,content:formData.content})
                               }}
                        />
                    </Row>
                    <hr/>
                    <Row label="Content">
                        <textarea className="input content"
                               placeholder="Content goes here...."
                               value={formData.content}
                               onChange={(e)=>{
                                setFormData({title:formData.title,content:e.target.value})
                               }}
                        />
                    </Row>
                    <hr/>
                    <button className="btn">ADD</button>
                </form>

                <hr/>

            </div>
            <h2>Blogs</h2>
            {blogs.map((blog, i)=>(
                <div className="blog" key={i}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <div className="blog-btn">
                        <button onClick={()=>removeBlog(i)} className="btn remove">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

function Row(props){
    const{label}=props;
    const rowStyle = {
        margin: '10px 0'
    };
    return(
        <div style={rowStyle}>
            <label>{label}<br/></label>
            {props.children}
            <br/>
        </div>
    )
}