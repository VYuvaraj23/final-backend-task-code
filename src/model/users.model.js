import mongoose from "./index.model.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    token: { type: String },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

export default mongoose.model("users", userSchema);
