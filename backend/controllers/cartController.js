import userModel from "../models/userModel.js";

//je crée les routes qui permettent à l'user d'ajouter, retirer et accèder au contenu de son panier

// créer addToCart => add items to user car
const addToCart = async (req, res) => {
  try {
    //let userData = await userModel.findOne({ _id: req.body.userId }); 
    let userData = await userModel.findById(req.body.userId); // 7:21:23 cette ligne fonctionne pareil que la 1ere  retrouver l'user
   
    let cartData = await userData.cartData; //le contenu du panier est dans variable cartData

    if (!cartData [req.body.itemId]) {
      //vérifier que le panier soit vide
      cartData[req.body.itemId] = 1;
    } //si vide alors créer une entrée
    else {
      cartData[req.body.itemId] += 1; //alors ajoute 1 produit
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// removeItem from user cart
const removeFromCart = async (req, res) => {;//7:20:39
  try {
    let userData = await userModel.findById(req.body.userId)//rechercher user d'après son id
    let cartData = await userData.cartData 
    if (cartData[req.body.itemId] >0) {//si cartData est >0
      cartData[req.body.itemId] -=1    //alors retire le produit
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData})//sauvegarder dans mongoDb
    res.json({success:true, message:"removed from cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
    
  }


}


//fetch User cart data voir le contenu du panier de l'user
const getCart = async (req, res) => {
  
  //7:26:15
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData

    res.json({success:true, cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
  }
};


export { addToCart, removeFromCart, getCart };
