import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("DB not connected");
    console.error(err);
  });

export default mongoose;
