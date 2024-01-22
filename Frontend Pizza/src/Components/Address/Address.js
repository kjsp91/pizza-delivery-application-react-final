import { useState } from 'react';
import './Address.css'
import { useLocation,useNavigate } from 'react-router-dom';
function Address(){
    const location = useLocation()
    console.log(location)
    const [address,setAddress] = useState({
        uname:'',
        addr : '',
        phno : 0
    })
    const navigate = useNavigate()
    return(
        <>
        <div className="address-form">
        <h1>Where Should The Pizza Go &#127829;&#127829;....</h1>
        <input type="text" name='uname' placeholder='Enter Name' onChange={(e)=>setAddress({...address,uname:e.target.value})} /> <br />
        <textarea name="addr"  cols="55" rows="7" placeholder='Enter Address' onChange={(e)=>setAddress({...address,addr:e.target.value})}></textarea> <br />
        <input type="tel" name='phno' placeholder='Enter Phone Number' onChange={(e)=>setAddress({...address,phno:e.target.value})} /> <br />
        <button onClick={()=>{navigate("/order",{state:{location,address}})}}><i class="fa fa-home" aria-hidden="true"></i>Save Address</button>
        </div>
        </>
    )
}
export default Address;
