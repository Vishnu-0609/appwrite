import React,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/Config'
import { Container, PostCard } from '../components'

function Allpost() {
    const [posts,setposts]=useState([]);

    useEffect(()=>{
      appwriteService.getPosts([]).then((posts)=>{
        if(posts)
        {
            setposts(posts.documents);
        }
      })
    },[])
      
    
    
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default Allpost
