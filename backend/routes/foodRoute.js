import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

//créer le router afin de faire méthodes: GET POST DELETE PUT
const foodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// les photos des produits qui seront stockés dans le dossier uploads
foodRouter.post("/add", upload.single("image"), addFood);

//voir la liste de tous les produits
foodRouter.get("/list", listFood);

// supprimer produit 
//  il utilise la methode Post au lieu de DELETE.
// si je prends DELETE ça fonctionne en backend avec Thunder client Mais en admin non !!!
foodRouter.post("/remove", removeFood);

export default foodRouter;
