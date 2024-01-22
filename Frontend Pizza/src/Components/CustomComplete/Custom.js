import Toppings from '../../Toppings'
import './Custom.css'
import Customize from '../Customize/Customize'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Custom(){
  const [selectedTopping,setSelectedToppings] = useState([]);
  const [tprice,setTprice] = useState(0)
  const [toname,setTname] = useState([])
  const [flag,setFlag] = useState(false)
  const customItem = {
    image :'https://napolipizzalv.com/wp-content/uploads/2019/10/DSC_0924-min.png', 
    name : 'Custom Pizza',
    description : 'This is the flavourful pizza overloaded with the Toppings '+toname,
    price : {tprice},
    count : 1

  }
  const func = ()=>{
    const existItems = JSON.parse(localStorage.getItem('selectedItems'))||0
    const updateItems = [...existItems,customItem]
    localStorage.setItem('selectedItems',JSON.stringify(updateItems))
  }
  function selectedItems(topp,price,tname){
    setFlag(true)
    console.log(topp)
    console.log(price)
    setSelectedToppings([...selectedTopping,topp])
    setTprice(tprice+price)
    setTname([...toname,tname])
  }
    return(
        <>
        <h1>Customize Your Own Pizza</h1>
        <div className="head">
        {Toppings.map((i)=><Customize key={i.id} id = {i.id} image = {i.image} pname = {i.pname} price = {i.price} addFunc={selectedItems}/>)}
        </div>
        <div className="foot">
          {selectedTopping.map((t,index)=>(
            <img src={t} alt="selected toppings" key={index} />
          ))}
        </div>
        <Link to="/cart" onClick={func}>
        {flag && <button className='addb'>Add these Toppings</button>}
        </Link>
        </>         
    )
}

export default Custom;

