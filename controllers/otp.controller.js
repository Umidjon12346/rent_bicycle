const { addMinute } = require("../helpers/add_minutes");
const  errorHandler  = require("../helpers/error.handler");
const otpGenerator = require("otp-generator");
const config = require("config");
const uuid = require("uuid");
const { encode } = require("../helpers/crypt");

const mailService = require("../services/mail.service");
const Client = require("../models/client.model");
const OTP = require("../models/otp.model");
const moment = require("moment"); // moment kutubxonasini import qilish


const createOtp = async (email) => {
  // OTP yaratish
  const otp = otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  // Vaqtni hozirgi vaqtdan 5 daqiqa keyinga sozlash
  const expirationTime = moment().add(5, "minutes").toDate();

  // Yangi OTP ni yaratish
  const newOtp = await OTP.create({
    id: uuid.v4(),
    otp,
    expiresAt: expirationTime, // expiresAt ni ishlatish
    email,
    verified: false,
  });

  return otp; // Yaratilgan OTP ni qaytarish
};



const verifyOtp = async (req, res) => {
  try {
    const { verification_key, email, otp } = req.body;
    const now = new Date();

    if (!verification_key || !email || !otp) {
      return res
        .status(400)
        .send({ Status: "Failure", message: "Malumotlar to'liq emas" });
    }

    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);

    if (details.email !== email) {
      return res
        .status(400)
        .send({ Status: "Failure", message: "Email mos kelmadi" });
    }

    const otpResult = await OTP.findOne({ where: { id: details.otp_id } });

    if (!otpResult) {
      return res
        .status(400)
        .send({ Status: "Failure", message: "OTP topilmadi" });
    }

    if (otpResult.verified) {
      return res
        .status(400)
        .send({ Status: "Failure", message: "OTP allaqachon ishlatilgan" });
    }

    if (otpResult.expiration_time < now) {
      return res
        .status(400)
        .send({ Status: "Failure", message: "OTP muddati tugagan" });
    }

    if (otpResult.otp !== otp) {
      return res
        .status(400)
        .send({ Status: "Failure", message: "Noto'g'ri OTP" });
    }

    // Belgilash: ishlatilgan
    otpResult.verified = true;
    await otpResult.save();

    let user = await Client.findOne({ where: { email } });
    let is_new;

    if (!user) {
      user = await Client.create({
        email,
        is_active: true,
      });
      is_new = true;
    } else {
      is_new = false;
    }

    return res.status(200).send({
      Status: "Success",
      user_id: user.id,
      is_new_user: is_new,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
    createOtp,verifyOtp
}