//pour lancer le backend  terminal => cd backend puis npm run server
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//LOGIN user
const loginUser = async (req, res) => {
  const { email, password } = req.body; // distructuring
  try {
    //es ce qu'un user possède cet adresse email?
    const user = await userModel.findOne({ email });
    if (!user) {
      //si pas de user à cet adresse email cela signifie que l'user ne s'est pas enregistré sur mon site alors interdition accès pour lui
      return res.json({ success: false, message: "user doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password); //comparaison des 2 mots de passe qui doivent être identiques
    if (!isMatch) {
      return res.json({ success: false, message: "invalid credentials" });
    }
    //créer le token si les 2 mots de passes sont identiques
    //crypter les 2 mots de passes et génrérer un token
    const token = createToken(user._id); 
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
const registerUser = async (req, res) => {
  const { name, password, email } = req.body; //destructuring
  try {
    const exists = await userModel.findOne({ email });

    if (exists) {
      //si email existe cela signifie que l'user est déjà enregistré sur mon site
      return res.json({ success: false, message: "user already exists" }); //alors réponse
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

    const newUser = new userModel({
      //créer un nouveau user
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save(); //sauvegarder l'user dans mongoDB
    // res.status(200).json(savedUser);

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

export { loginUser, registerUser };
