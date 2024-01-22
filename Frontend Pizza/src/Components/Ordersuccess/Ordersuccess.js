import './Ordersuccess.css'
import { Link } from 'react-router-dom';
function Ordersuccess(){
    return(
        <>
        <div className="success">
        <h1>&#10004;</h1>
        <h2>Order Success &#127881;&#10024;</h2>
        <p>Your Pizza Will Be Arrived In Few Minutes</p>
        <p>Until browse for your next order</p>
        <Link to="/">
        <button>Browse More</button>
        </Link>
        </div>
        </>
    )
}
export default Ordersuccess;