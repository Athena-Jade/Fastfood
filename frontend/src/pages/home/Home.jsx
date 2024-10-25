import { useState } from "react";
import ExploreMenu from "../../components/exploreMenu/ExploreMenu";
import Header from "../../components/header/Header";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";
import AppDownload from "../../components/appDownload/AppDownload";

//ouvrir dossier backend: cd backend  puis npm run server afin de voir le menu

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
