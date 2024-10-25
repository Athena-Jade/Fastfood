import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="explore-menu" id="explore-menu">
        <h1>Discover our menus</h1>
        <p className="explore-menu-text">Choose your menu from the list</p>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return (
              <div
                className="explore-menu-list-item"
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.menu_name ? "All" : item.menu_name
                  )
                }
                key={index}
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt="menu"
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
      <ScrollTopButton />
    </>
  );
};

export default ExploreMenu;
