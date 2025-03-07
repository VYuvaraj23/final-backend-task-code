import nodemailer from "nodemailer";
import usersModel from "../model/users.model.js";
import { hashValue, createToken, hashCompare } from "../utils/auth.js";
import config from "../config/index.config.js";

const createUser = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });

    if (!user) {
      req.body.password = await hashValue(req.body.password);
      req.body.email = await req.body.email.toLowerCase();
      await usersModel.insertOne(req.body);
      res.status(201).send({
        message: "User Created Successfully!",
      });
      res.end();
    } else {
      res.status(400).send({
        message: `User with ${req.body.email} already exists!`,
      });
      res.end();
    }
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      message: error.message || "Internal Server Error",
      
    });
    res.end();
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersModel.findOne({ email });

    if (user) {
      if (await hashCompare(password, user.password)) {
        const token = await createToken(req.body);
        res.status(200).send({ message: "Login Successfully!", token });
        res.end();
      } else {
        res.status(400).send({ message: "Invalid Password" });
        res.end();
      }
    } else {
      res.status(400).send({
        message: `User with ${email} not register \nCreate new User !`,
      });
      res.end();
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};

const getIDByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usersModel.findOne({ _id: id });

    res.status(200).send({
      message: "Data Fetch Successfully",
      data,
    });
    res.end();
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersModel.findOne({ email });

    if (user) {
      const token = await createToken({ email });
      await usersModel.updateOne({ email }, { token });
      console.log("User data : ",user)

      const url = process.env.RESET_URL

      const sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.GMAIL,
          pass: config.PASS,
        },
      });

      const compose_mail = {
        from: config.GMAIL,
        to: email,
        subject: "Password Reset",
        text: `Click the link ton reset your password : ${url}${token} \n \n"Link valid 5 min" `,
      };

      sender.sendMail(compose_mail, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("mail send successfully ");
        }
      });

      res
        .status(200)
        .send({ message: "data fetch successfully", token });
    } else {
      res.status(400).send({ message: `User with ${email} invalid!` });
      res.end();
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    const { password } = req.body;
    console.log(typeof "token :",token)

    const user = await usersModel.findOne({ token });
    if (user) {
      const hashPassword = await hashValue(password);
      await usersModel.updateOne({ token }, { password: hashPassword });
      res.status(200).send({ message: "password reset successfully!", user });
      res.end();
    } else {
      res.status(400).send({ message: "Invalid Token" });
      res.end();
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
    res.end();
  }
};
export { createUser, signin, getIDByUser, forgotPassword, resetPassword };
