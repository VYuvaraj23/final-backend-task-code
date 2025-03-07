import mongoose from "mongoose";
import config from "../config/index.config.js";

main().catch((err) => console.log("MongoDB Connection Failed", err));

async function main() {
  await mongoose.connect(config.MONGO_URI);
  console.log("MongoDB Connected Successfully!");
}

export default mongoose;
