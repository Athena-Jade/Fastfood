import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

import RatingStars from "../ratingStars/RatingStars";
//ouvrir dossier backend: cd backend  puis npm run server afin de voir le menu

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <>
      <div className="food-item">
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={url + "/images/" + image}
            alt=""
          />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="supprimer"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="ajouter"
              />
            </div>
          )}
        </div>

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <RatingStars noOfStars={5} />
          </div>
          <p className="food-item-desc">{description}</p>                                     
          <p className="food-item-price">{price}€</p>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
