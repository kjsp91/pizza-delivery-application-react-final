import './Update.css'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Update(){
    const param = useParams()                             
    console.log(param)
    const navigate = useNavigate()
    const[uItem,setUitem] = useState([])
    const[updateItem,setUpdateitem] = useState({
        id:parseInt(param.id),
        name:'',
        dcpn:'',
        rating:'',
        imgurl:''
    })
    useEffect(()=>{ 
        fetch('http://localhost:4800/')
        .then((response)=>response.json()).then((data)=>
        {
            // console.log(data)
            const ui = data.filter((i)=>i[0] === parseInt(param.id))
            setUitem(ui)
            setUpdateitem({
                name:ui[0][1],
                dcpn:ui[0][2], 
                rating:ui[0][3],
                imgurl:ui[0][4]
            })
            console.log(updateItem)
        }).catch((err)=>console.log(err))
    },[param.id]) 

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUpdateitem((previtems)=>({
            ...previtems,
            [name]:value
        }))
        console.log(updateItem)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch(`http://localhost:4800/update/${parseInt(param.id)}`,{
            method : 'PUT',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updateItem)
        }).then((response)=>response.json()).then((data)=>{
            console.log(data)
            navigate("/review")
        }).catch((err)=>console.log(err))
    }

    return( 
        <>
        {uItem.length>0 && ( 
         <form onSubmit={handleSubmit}> 
            <input type="text" name="name" value={updateItem.name} onChange={handleChange} /> <br />
            <textarea name="dcpn" cols="54" rows="6" value={updateItem.dcpn} onChange={handleChange}></textarea> <br />
            <input type="text" name="rating" value={updateItem.rating} onChange={handleChange}/> <br />
            <input type="text" name="imgurl" value={updateItem.imgurl} onChange={handleChange}/> <br />
            <button type="submit">UPDATE</button>
         </form>)}
        </>
    ) 
}
export default Update;



