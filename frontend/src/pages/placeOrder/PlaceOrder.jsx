import { useContext, useEffect, useState,  } from "react";
import{useNavigate}from "react-router-dom"
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext); //8:05:02 ajouter token, food_list, cartItems, url

  //8:05:24 créer variable data pour récup données de l'user lorsqu'il renseignera ces champs
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  //8:07:08 créer function onChangeHandler pour taper sur input et récuperer ce que je tape
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value }));
           //previous data
  };

  // 8:14:34 créer function placeOrder pour valider le formulaire et redirect payment
  const placeOrder = async (event) => {
    event.preventDefault(); //8:15:41 evite que la page se rafraichie dès que je soumets le formulaire
   
    let orderItems = []; // bien structurer et déclarer orderItems 8:16:08
    food_list.map((item) => {
      if (cartItems[item._id] > 0) { //es ce que le panier contient un produit avec cet id?
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }       
    });
    //  console.log(orderItems);
     


    //creer orderData variable 8:20:28
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2 
    };

    //envoyer la commande dans mongoDB
    let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}});         
    if (response.data.success) { //si vrai 
      const {session_url} = response.data;// on prend session_url
      window.location.replace(session_url); //envoyer l'user dans session_url 8:22:55
    } else {
      alert("Error");
    }
  };

  //8:12:25 je vérifie avec useEffect que je peux taper sur l'input récupérer ce que je tape sur clavier
  //  useEffect(()=>{
  //    console.log(data);
  //  },[data])

 const navigate = useNavigate() //9:12:46

  //9:12:10
 useEffect(()=>{//si l'user est déconnecté, il sera redirigé vers cart (panier)
  if (!token) {
    navigate('/cart')
  }
  else if(getTotalCartAmount() === 0){ //si cart (panier) vide alors redirect à cart
    navigate('/cart')
  }  
 },[token])


  return (
    <form onSubmit={placeOrder} className="place-order">
      {/** 8:15:29  onSubmit={placeOrder} placeOrder est la function*/}
      <div className="place-order-left">
        <p className="title">Delivery information</p>

        <div className="multi-fields">
          {/**8:08:37   ajouter name, onChange={onChangeHandler} puis value */}
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="firstname"
          />

          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="lastname"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="email"
        />

        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="city"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="state"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>{getTotalCartAmount()} €</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Delivery free</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2} .00€</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} .00€</b>
            </div>
            <button>proceed to payment</button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>If you have promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button type="submit">Submit</button>{" "}
                {/**8:15:13 relier le bouton type="submit" */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
