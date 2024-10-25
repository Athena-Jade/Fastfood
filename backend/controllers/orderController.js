import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//7:50:49
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend 7:45:32
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; //7:59:41
 
  try {
    //7:51:44 créer une nouvelle commande
    const newOrder = new orderModel({ // d'après orderModel.js
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save(); //sauvegarder la commande dans mongoDb
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); //dès que l'user a passé sa commande, il faudra effacer son cartData (panier)

    //créer ligne paiement 7:54:28
    const line_items = req.body.items.map((item) => ({
      //7:54:34 clear payment using stripe
      price_data: {
        currency: "eur", //euros
        product_data: {
          name: item.name,
        },
        unit_amount: item.price *100,  
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "delivery charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });


    //créer session 7:58:21
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId = ${newOrder._id}`, //8:01:10 si paiement réussi alors redirection à cet url
      cancel_url: `${frontend_url}/verify?success=false&orderId = ${newOrder._id}` //en cas probleme paiement
    });
    
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};


// 8:28:58:créer function verifyOrder permet de savoir si le paiement s'est bien déroulé ou pas
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body; // récuper orderId success 8:30:13
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId); //si paiement mal déroulé alors supprimer la commande
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};




//user orders for frontend 8:46:10 c'est la route afficher toutes les commandes de l'user
const userOrders = async(req,res)=>{
  try { //8:47:46 récup toutes les commandes d'un user
    const orders = await orderModel.find({userId:req.body.userId})    
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
  }     
}



//listing orders for admin panel
//9:17:44 créer function permettant d'afficher toutes les commandes de l'user
const listOrders = async(req, res)=>{ 
  try { //9:19:23
    const orders = await orderModel.find({})
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:error})
  }
}


//9:42:44 api for updating order status
const updateStatus = async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
    res.json({success:true, message:"status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
  }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus  };
