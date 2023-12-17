import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { ELASTIC_EMAIL_FROM, ELASTIC_API_KEY } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: ELASTIC_EMAIL_FROM,
    pass: ELASTIC_API_KEY,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: ELASTIC_EMAIL_FROM };
  return transport.sendMail(email);
  return true;
};

export default sendEmail;
