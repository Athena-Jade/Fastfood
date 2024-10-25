//essai 29 aout 2024
import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//LOGIN ADMIN
const loginAdmin = async (req, res) => {
    const { email, password } = req.body; // distructuring
    try {
      //es ce qu'un admin possède cet adresse email?
      const admin = await adminModel.findOne({ email });
      if (!admin) {
        //si pas d'admin à cet adresse email cela signifie que l'admin ne s'est pas enregistré sur mon site alors interdition accès pour lui
        return res.json({ success: false, message: "admin doesn't exist" });
      }
      const isMatch = await bcrypt.compare(password, admin.password); //comparaison des 2 mots de passe qui doivent être identiques
      if (!isMatch) {
        return res.json({ success: false, message: "invalid credentials" });
      }
      //créer le token si les 2 mots de passes sont identiques
      //crypter les 2 mots de passes et génrérer un token
      const token = createToken(admin._id); 
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "error" });
    }
  };


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  };

//REGISTER user
const registerAdmin = async (req, res) => {
    const { name, password, email } = req.body; //destructuring
    try {
      const exists = await adminModel.findOne({ email });
  
      if (exists) {
        //si email existe cela signifie que l'admin est déjà enregistré sur mon site
        return res.json({ success: false, message: "admin already exists" }); //alors réponse
      }
  
      if (!validator.isEmail(email)) {
        //validiting email format & strong password
        return res.json({ success: false, message: "please enter valid email" });
      }
  
      if (password.length < 8) {
        //password doit contenir 8 caractères
        return res.json({
          success: false,
          message: "please enter strong password! must have 8 characters",
        });
      }
  
      const salt = await bcrypt.genSalt(10); //hasher user password
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAdmin = new adminModel({
        //créer un nouveau user
        name: name,
        email: email,
        password: hashedPassword,
      });
  
      const admin = await newAdmin.save(); //sauvegarder l'user dans mongoDB
      // res.status(200).json(savedUser);
  
      const token = createToken(admin._id);
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "error",
      });
    }
};

export{registerAdmin,loginAdmin}