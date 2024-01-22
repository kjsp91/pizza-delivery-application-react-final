import './Cart.css' 

import { useNavigate } from 'react-router-dom';

//  import { useLocation } from 'react-router-dom';
// function Cart(props){
//   const location = useLocation()
// //   const {from} = location.state 
// //   console.log(from)
// console.log(location);

//     return(
//         <>
//         <div className="item">
//             <img src={props.pimage} alt="" />
//             <h2>{props.iname}</h2>
//             <p>{props.price}</p>
//         </div>
//         </>
//     )
// }
// export default Cart;

import React, { useEffect, useState } from 'react';

function Cart() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  let total = 0
  // const [count,setCount] = useState(0)
  useEffect(() => {
    // Retrieve items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setSelectedItems(storedItems);
  }, []);

  function removeItem(keys){
    // console.log(selectedItems[keys.index]);
    // console.log(keys.index)
    // console.log(selectedItems)
    const updatedItems = [...selectedItems]
    updatedItems.splice(keys.index,1);
    setSelectedItems(updatedItems)
    localStorage.setItem('selectedItems',JSON.stringify(updatedItems)) 
  } 
  function incr(item){
    console.log(item);
    if(item.count<10){
    item.count = item.count+1 
    setSelectedItems(prev=>[...prev])
    }
    // setCount(item.count);
  }
  function decr(item){
    if(item.count>1){
    item.count = item.count-1 
    setSelectedItems((prev=>[...prev]))
    }
    // setCount(item.count);
  }
  function totalFunc(item){
    // console.log(item.item)
    // console.log(parseInt(item.item.price))
    if (item.item.price.tprice===undefined) {
      total = total+(item.item.count)*parseInt(item.item.price)
    }
    else{
      total = total+(item.item.count)*(100+parseInt(item.item.price.tprice))
    }
  } 

  return (
    <div className='cart'>
      {selectedItems.map((item, index) => (
        <div>
        <div key={index} className="item">
          <img src={item.image} alt="" />
          <div className="block">
          <h3>{item.name}</h3> 
          <p>{item.description}</p>
          </div>
          <button onClick={()=>decr(item)}>-</button><p>{item.count}</p><button onClick={()=>incr(item)}>+</button>
          <p>&#x20B9;{(parseInt(item.price)||(100+item.price.tprice))*item.count}</p>
          <button className='trash' onClick={()=>removeItem({index})}><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        <hr />
        </div>
      ))}
      <div>
        {selectedItems.map(item=>(
          //console.log(item.count,item.price)
          <>
          {totalFunc({item})}
          
          </>
        ))}
      </div>
      <div className="total"><h1>&#x20B9;{total}</h1></div> 
      {total!==0 && <button className='order' onClick={()=>{navigate('/address',{state:{total,selectedItems}})}}>ORDER</button>}
      
    </div>
  );
}

export default Cart;