import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()//créer le router pour le panier

//endpoints
cartRouter.post("/add", authMiddleware, addToCart) //ajouter produit dans le panier
cartRouter.post("/remove", authMiddleware, removeFromCart) //retirer produit du panier
cartRouter.post("/get", authMiddleware, getCart) //accèder au panier de l'user


export default cartRouter
