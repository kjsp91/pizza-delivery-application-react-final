import './Reviews.css'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Stars from '../Stars/Stars';

function Reviews(){
    const [item,setItem] = useState([])
    useEffect(()=>{
        fetch('http://localhost:4800/')
        .then((response)=>response.json()).then((data)=>setItem(data)).catch((err)=>console.log(err))
    },[])
    // const handleDelete = (id)=>{
    //     fetch(`http://localhost:4800/delete/${id}`,{method:'DELETE'})
    //     .then((response)=>console.log(response.json))
    //     .then((data)=>{
    //         setItem((previtems)=>previtems.filter((item)=>item.id!==id))
    //         console.log(data)})
    //     .catch(err=>console.log(err))
    // }
    const handleDelete = (id) => {
        fetch(`http://localhost:4800/delete/${id}`, { method: 'DELETE' })
          .then((response) => {
            if (response.ok) {
                window.location.reload();
                console.log("Fetch")
                // return fetch('http://localhost:4800/');
            //   setItem((prevItems) => prevItems.filter((item) => item.id !== id));
            }
          })
          .catch((err) => console.log(err));
      };
    
    // const handleUpdate = (id,item)=>{
    //     console.log(id)
    //     console.log(item);
    //     Update(id,item);    
    // }
    
    return(
         
        <div className="parent">
            <h2 className="rhead">Share Your Happiness With A Review</h2>
            <Link to="/add">
            <button className='post'>POST</button></Link><br />
            {item.map((i,index)=>(
           <div key={index} className="child">
            <div className="review">
            <div className="one">
             <p className='filled'><Stars rating={i[3]}/></p> 
             <p className='description'>"{i[2]}"</p> 
             <h3>--{i[1]}</h3> 
             <button onClick={()=>handleDelete(i[0])}>DELETE</button>
             <Link to={`/update/${i[0]}`}>
             <button>UPDATE</button>
             </Link>
             </div>
             <div className="two">
             <img src={i[4]} alt="imagurl" /></div>
              <br />
             </div> </div>
            ))} 
        </div>
    )
}
export default Reviews;