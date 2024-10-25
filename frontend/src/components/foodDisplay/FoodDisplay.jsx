import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";

//ouvrir dossier backend: cd backend  puis npm run server afin de voir le menu
const FoodDisplay = ({ category }) => {
   const { food_list } = useContext(StoreContext);
  
  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you  
          <span style={{color:"tomato"}}>  {category }</span>                  
        </h2>
        <div className="food-display-list">
          {food_list.map((item, index) => { 
            if (category ==="All" || category===item.category) { //filtre la categorie du produit
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}                
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;
