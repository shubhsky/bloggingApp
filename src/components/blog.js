import {useReducer, useState, useEffect, useRef} from "react";
import {db} from "../fireBaseInit";
import { collection, addDoc } from "firebase/firestore"; 

function blogsReducer(blogs, action){
    switch(action.type){
        case "ADD":
            return [action.blog, ...blogs]
        case "REMOVE":
            return blogs.filter((blog,index)=>index!==action.index)
        default:
            return []
    }
}

export default function Blog(){

    
    const [formData,setFormData] = useState({title:'',content:''})
    const [blogs, dispatch] = useReducer(blogsReducer,[])
    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[])


    useEffect(()=>{
        if (blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = 'No Blogs'
        }
    },[blogs]) 

    async function handleSubmit(e){
        e.preventDefault();
        dispatch({type:'ADD', blog:{title:formData.title, content:formData.content}})

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "blogs"), {
            title: formData.title,
            content: formData.content,
            createAt: new Date()
        });
        console.log("Document written with ID: ", docRef.id);

        setFormData({title:'',content:''});
        titleRef.current.focus();
    }

    function removeBlog(i){
        dispatch({type:'REMOVE',index:i})
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
                                required
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
            <h2 className="blog-heading">Blogs</h2>
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