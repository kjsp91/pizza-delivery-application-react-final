import { Link } from 'react-router-dom'
import './Create.css'
import { useState } from 'react'

function Create(){
    const [newItem,setNewitem] = useState({name:'',dcpn:'',rating:'',imgurl:''})
    const handleClick = ()=>{
        fetch('http://localhost:4800/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newItem)
         }).then((response)=>console.log(response))
    }  
       
    return(
        <>
        <div className='reviewdesign'>
        <div className='detail'>
            <img src="https://images7.alphacoders.com/596/596343.jpg" alt="pizza" />
            {/* <img src="https://thumbs.dreamstime.com/b/share-your-experience-text-wooden-sign-hanging-rope-black-background-148422990.jpg" alt="pizza" /> */}
        </div>
        <div className='form'>
            <h2>Share your experience with us</h2>
            <input type="text" name="name" placeholder='NAME' onChange={(e)=>setNewitem({...newItem,name:e.target.value})} /><br/>
            <input type="text" name="dcpn" placeholder='REVIEW' onChange={(e)=>setNewitem({...newItem,dcpn:e.target.value})} /><br/>
            <input type="text" name="rating" placeholder='RATING OUT OF 5' onChange={(e)=>setNewitem({...newItem,rating:e.target.value})} /><br/>
            <input type="text" name="imgurl" placeholder='IMAGE URL' onChange={(e)=>setNewitem({...newItem,imgurl:e.target.value})} /><br/>
            <Link className='buttonhandle' to="/review"><button onClick={handleClick}>POST</button></Link>
            
        </div>
        </div>
        </>
    )
}
export default Create