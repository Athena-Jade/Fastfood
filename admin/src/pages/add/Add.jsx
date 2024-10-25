//lancer admin : cd admin puis npm run dev
import { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  // const url = "http://localhost:4000"
  const [image, setImage] = useState(false); //1)

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    //console.log(data);
  };

  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  const onSubmitHandler = async (event) => {
    event.preventDefault(); //permet d'éviter que la page se rafaîchi dès que je soumets le formulaire

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData); //backend et admin doivent être allumés pour échanger les données
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "salad"
      });
      setImage(false); //reset image afin que je puisse saisir un autre menu
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="add">
        <form onSubmit={onSubmitHandler} className="flex-col">
          <div className="add-img-upload flex-col">
            <p>Upload image</p>
            <label htmlFor="image">
              <img
                style={{ cursor: "pointer" }}
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="add image"
              />
            </label>
            <input
              onChange={(event) => setImage(event.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="type here"
            />
          </div>

          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="6"
              placeholder="write content here"
              required
            ></textarea>
          </div>

          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Product price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="20€"
              />
            </div>
          </div>

          <button className="add-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
