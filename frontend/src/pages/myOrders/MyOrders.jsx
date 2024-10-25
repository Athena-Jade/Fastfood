import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

// ce fichier affiche toutes les commandes que l'user a commandé et payé
const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]); //8:53:50

  const fetchOrders = async () => { //appel api pour afficher toutes les commandes de l'user   
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    // console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {  //si token dipo    
      fetchOrders(); //alors appel fetchOrders
    }
  }, [token]);

  return (
    <>
      <div className="my-orders">
        <h2>My orders</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <>
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity
                      }
                      else{
                        return item.name + " x " + item.quantity +","
                      }
                    })}
                  </p>
                  <p>
                    {order.amount} €
                  </p>
                  <p>total items: {order.items.length}</p>
                  <p>
                    <span>&#x25cf;</span>
                     <b>{order.status}</b>                                                                                             
                  </p>
                  <button onClick={fetchOrders}>track order</button> {/**track order signifie suivre la commande */}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
