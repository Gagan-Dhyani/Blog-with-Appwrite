import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import PostForm from '../post-form/PostForm'
import appwriteService from "../../appwrite/config"
import { useParams } from 'react-router-dom'

function EditPost() {
    const [post,setPosts]=useState()
    const navigate=useNavigate()
    const {slug}=useParams()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate("/")
        }
    },[navigate,slug])
  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost
