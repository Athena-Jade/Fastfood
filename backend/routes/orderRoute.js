import express from "express";
import authMiddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrders, listOrders,updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();//créer un router pour order


//endpoints
orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder) //8:29:50
orderRouter.post("/userorders", authMiddleware, userOrders)//8:47:09
orderRouter.get("/list", listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;