import { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css'
import { Link, useLocation } from 'react-router-dom';
function Order(){
    const location = useLocation();
    console.log(location)
    const userInfo = location.state.address;
    const foodInfo = location.state.location.state.selectedItems;
    const totalAmount = location.state.location.state.total;
    const [foodItems,setFooditems] = useState([])
    useEffect(()=>{
        const fItems = []
        for(let i=0;i<foodInfo.length;i++){
            fItems.push(foodInfo[i].name+" - "+foodInfo[i].count)
        }
        console.log(fItems)
        setPostitem({...postItems,orderitems:fItems})
        const newfItems = fItems.map((j)=>( 
            <div>
                {j}
                <br/>
            </div>
        ))
        setFooditems(newfItems)
    },[])   
    const [postItems,setPostitem] = useState({ 
        cname : userInfo.uname,
        deliveryaddr : userInfo.addr,
        phno : userInfo.phno,
        orderitems :'',
        amount : totalAmount
    }) 
    const postOrder = async()=>{
        try{
            console.log(postItems)
            await axios.post('http://localhost:4800/order',postItems);
            console.log("Data Inserted")
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        {/* <h2 className='conform'>Confirm the order for your delicious Pizza &#127829;</h2> */}
        <h2 className='conform'>Confirm the order for your Pizza arrival &#127829;<b>&#128757;</b></h2>
        <div className='ttable'>
         <table>
            <tr><td><h3>Customer Name</h3></td><td><p>{userInfo.uname}</p></td></tr>
            <tr><td><h3>Delivery Address</h3></td><td><p>{userInfo.addr}</p></td></tr>
            <tr><td><h3>Phone Number</h3></td><td><p>{userInfo.phno}</p></td></tr>
            <tr><td><h3>Ordered Items</h3></td><td><p>{foodItems}</p></td></tr>
            <tr><td><h3>Amount</h3></td><td><p>&#x20B9;{totalAmount}</p></td></tr>
         </table>
         <Link to="/ordersuccess">
        <button onClick={postOrder}>Conform Order</button>
        </Link></div>
        </>
    )
} 
export default Order;