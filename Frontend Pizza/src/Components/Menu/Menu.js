import './Menu.css'

// function Menu(props){
//     return(
//     <div className="card">
//         <img src={props.image} alt="pizza" />
//         <h2>{props.name}</h2>
//         <p>{props.dcpn}</p>
//         <h3>{props.price}</h3>
//         <button>ORDER</button>
//     </div>
//     )
// } 
// export default Menu; 


import React from 'react';
import { Link } from 'react-router-dom';

function Menu(props) {
  const itemDetails = {
    image: props.image,
    name: props.name,
    description: props.dcpn,
    price: props.price,
    count:1
  };

  const handleOrderClick = () => {
    const existingItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    
    const updatedItems = [...existingItems, itemDetails];

    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="card">
      <img src={props.image} alt="pizza" />
      <h2>{props.name}</h2>
      <p>{props.dcpn}</p>
      <h3>{props.price}</h3>
      <Link className='links' to="/cart" onClick={handleOrderClick}>
        <button>ORDER</button>
      </Link>
    </div>
  );
}

export default Menu;

