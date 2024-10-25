import { createContext, useEffect, useState } from "react";
//  import { food_list } from "../assets/assets";
import axios from "axios"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});//1:33:05 creer le panier

  const url = "http://localhost:4000"; //url pour le backend

  const [token, setToken] = useState("");

  const [food_list, setFoodlist] = useState([]);//1:07:07

  //ajouter un article dans le panier 1:33:47
  const addToCart = async (itemId) => {// 7:31:12 ajouter async
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    //7:30:00 intégrer le panier rempli de l'user
    if (token) { // si le token est disponible
      await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
    }
  };


  //Retirer un article du panier 1:36:23  
  const removeFromCart = async(itemId) => {//ajouter async 7:33:08
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
    //7:33:18
    if (token) { //si on a le token de l'user, cela signifie que l'user est connecté
      await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
    }
  };


  //total article(s) dans le panier
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // 6:54:23 permet l'affichage des menus qui viennent du backend
  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodlist(response.data.data);
  };

  //7:35:38 créer function loadCartData  permet d'éviter le rafraîchissement 
  //de la page dès que j'ajoute un produit dans le panier sur la page accueil: la quantité reste affichée à l'écran
  const loadCartData = async(token)=>{
    const response = await axios.post(url +"/api/cart/get", {}, {headers:{token}})
    setCartItems(response.data.cartData)
  }


  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        
        await loadCartData(localStorage.getItem("token"))//7:37:34 
      }      
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,    
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
