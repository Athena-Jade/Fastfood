//pour lancer le backend  terminal => cd backend puis npm run server

import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://athenajade72:upHKsOYpazbP3iAJ@cluster0.xidctr2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("db connected"));
};
