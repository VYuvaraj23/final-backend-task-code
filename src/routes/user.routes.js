import express from "express";
import {
  createUser,
  forgotPassword,

  getIDByUser,
  resetPassword,
  signin,
} from "../controller/users.controller.js";
import payloadValidator from "../middleware/payloadValidator.middleware.js";
import {
  createUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  signinSchema,
} from "../validator/user.validator.js";
import authGuard from "../middleware/authGuard.middleware.js";

const router = express.Router();

router.post("/signup", payloadValidator(createUserSchema), createUser);
router.post("/signin", payloadValidator(signinSchema), signin);
router.get("/:id", authGuard, getIDByUser);
router.post(
  "/forgot-password",
  payloadValidator(forgetPasswordSchema),
  forgotPassword
);
router.put(
  "/reset-password",
  payloadValidator(resetPasswordSchema),
  authGuard,
  resetPassword
);

export default router;
