import { decodeToken } from "../utils/auth.js";
const authGuard = (req, res, next) => {
  // console.log("token : ",req.headers.authorization)
  let token = req?.headers?.authorization?.split(" ")[1];

  if (token) {
    let payload = decodeToken(token);

    if (Math.floor(+new Date() / 1000) <= payload.exp) next();
    else {
      res.status(401).send({ message: "Session Expired!" });
      res.end();
    }
  } else {
    res.status(401).send({ message: "Token Not Found" });
    res.end();
  }
};

export default authGuard;
