//le panier de l'user

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, url, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}€</p>
                    <p>{cartItems[item._id]}</p> {/*quantité */}
                    <p>{item.price * cartItems[item._id]}€</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      <FaTrash style={{ color: "tomato", cursor: "pointer" }} />
                    </p>
                  </div>
                  <hr />
                </>
              );
            }
          })}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>subtotal</p>
                <p>{getTotalCartAmount()} €</p>
              </div>

              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2} €</p>
              </div>

              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}€
                </b>
              </div>
            </div>

            <button onClick={() => navigate("/order")}>
              proceed to check out
            </button>

            <div className="cart-promocode">
              <div>
                <p>If you have promo code, enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
