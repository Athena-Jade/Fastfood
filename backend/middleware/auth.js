import jwt from "jsonwebtoken"; //permet d'identifier l'user dès qu'il s'enregistre sur mon site

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers; //récup token de l'user
  if (!token) {//verifier que l'user ne possède pas de token
    return res.json({ success: false, message: "not authorized, login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);//si l'user possède un token
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
