import { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/admin_assets/assets";

const Orders = ({ url }) => {
  //9:22:28
  const [orders, setOrders] = useState([]); //9:22:00

  const fetchAllOrders = async () => {
    //récuperer toutes les commandes de l'user qui se trouvent dans mongodb et l'afficher ici
    const response = await axios.get(url + "/api/order/list"); //appel api
    if (response.data.success) {
      setOrders(response.data.data);
      // console.log(response.data.data);
    } else {
      toast.error("error");
    }
  };

  //9:49:12 status handler
  const statusHandler = async (event, orderId) => {
    // console.log(event, orderId);
    const response = await axios.post(url + "/api/order/status", {//call api
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="order add">
        <h3>order page</h3>
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  {order.address.street + ", "} <br />
                  {order.address.city + " " + order.address.zipcode +" " +order.address.state}                                                                              
                </div>

                <p className="order-item-phone">{order.address.phone}</p>
              </div>

              <p>total items: {order.items.length}</p>
              <p>
                montant total <b>{order.amount}€</b>{" "}
              </p>

              <select onChange={(event) => statusHandler(event, order._id)}value={order.status}>                                             
                <option value="Food processing">food processing</option>
                <option value="Out for delivery">out for delivery</option> {/**en livraison */}               
                <option value="Delivered">Delivered</option> {/** livré */}               
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
