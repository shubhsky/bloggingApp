import {useState, useEffect, useRef} from "react";
import {db} from "../fireBaseInit";
import { collection, doc, setDoc, getDocs} from "firebase/firestore"; 



export default function Blog(){

    
    const [formData,setFormData] = useState({title:'',content:''})
    const [blogs, setBlogs] = useState([])
    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[])

    useEffect(()=>{
        async function fetchData(){
            const snapShot = await getDocs(collection(db,'blogs'));
            console.log(snapShot)
            const blogs = snapShot.docs.map((blog)=>{
                return{
                    id:blog.id,
                    ...blog.data()
                }
            })
            console.log(blogs);
            setBlogs(blogs);
        }
        fetchData();
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

        // We are setting up the blogs that should not ideally be happen
        // setBlogs([{title:formData.title, content:formData.content},...blogs]);

        // Add a new document with a generated id.

        const docRef = doc(collection(db,'blogs'))

        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createAt: new Date()
        });

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
                    <hr/>
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