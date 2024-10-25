import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";


const Verify = () => {
  //trouver le paramètre avec useSearchParams 8:35:54
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  // console.log(success, orderId);


  //8:37:17 récup backend url
  const{url} = useContext(StoreContext)
  const navigate = useNavigate() //8:41:56

  const verifyPayment = async () =>{//8:40:13
    const response = await axios.post(url+"/api/order/verify", {success, orderId})
    if (response.data.success) {
      navigate("/myorders")
    }
    else{
      navigate("/")
    }
  }
  
  //8:42:35 useEffect
  useEffect(()=>{
    verifyPayment()
  },[])

  return (
    <div className="verify">
      <div className="spinner"></div>      
    </div>
  );
};

export default Verify;
