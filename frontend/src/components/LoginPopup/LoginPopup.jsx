import { useContext, useState } from "react";

import "./LoginPopup.css";
import { assets } from ".././../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  {/** 6:24:24 créer variable data pour stocker name, email, password  */}
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //6:25:11 créer function onChangeHandler afin de récupérer les données 
  //de l'user lorsqu'il tape son name, email et password 
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
    //6:26:37 permet de voir les lettres que je tape dans les formulairs login et register
  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  //6:31:39 
  const onLogin = async (event) => {
    event.preventDefault(); //eviter que la page se rafraîchie
    let newUrl = url;
    if (currState === "Login") {
      //si l'user se connecte sur le site
      newUrl += "/api/user/login";
     
    } else {
      newUrl += "/api/user/register"; //si l'user n'est pas connecté, il est renvoyé à register
    }
    //call  api et register user, login user dans mongoDb 
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token); //enregistrer le token de l'user
      setShowLogin(false); //cacher login page
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <div className="login-popup">
        {/**6:32:15 onSubmit */}
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="cross icon"
            />
          </div>
          <div className="login-popup-inputs">
            {currState === "Login" ? (
              <></>
            ) : (
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="your name"
                required
              />
            )}

            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="your password"
              required
            />
          </div>
           {/**6:32:33 type submit */}
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>by continuing, I agree to the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>
              create a new account?
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
