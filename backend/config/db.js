import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vishalbhat21:fZDqf9abUtmzXu7d@cluster0.ijnh9pv.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
