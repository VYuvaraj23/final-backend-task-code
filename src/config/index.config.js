import "dotenv/config";

const config = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  GMAIL: process.env.USER_MAIL,
  PASS: process.env.MAIL_PASSWORD,
};

export default config;
