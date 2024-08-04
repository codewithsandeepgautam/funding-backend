const UserSchema = require('../schemas/user.schema');
const nodemailer = require('nodemailer');
const PasswordService = require('../services/password.service');
let service = {};
service.emailVerification = emailVerification;
service.emailVerificationForgetPass = emailVerificationForgetPass;
service.saveUser = saveUser;
service.getUserData = getUserData;
service.verifyLogin = verifyLogin;
service.resetPassword = resetPassword;
async function getUserData() {
  try {
    const data = await UserSchema.find({email: email});
    return data.length > 0 ? data : [];
  } catch (err) {
    console.error("Error retrieving user data", err);
    throw new Error("Error retrieving user data");
  }
}
async function verifyLogin(email, password) {
  try {
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return Promise.reject({ error: "Account not found!" });
    }
    const response = await PasswordService.passwordDecryption(user.password);
    if (response.password === password) {
      return { loggedIn: true, data: user };
    } else {
      return Promise.reject({ error: "Incorrect Password" });
    }
  } catch (err) {
    console.error("Error in verifyLogin", err);
    return Promise.reject({ error: "Unable to login. Try again later!" });
  }
}
async function emailVerification(email) {
    try {
      const data = await UserSchema.find({ email: email });
      if (data && data.length > 0) {
        return Promise.reject({
          error: "Account already exists!",
          field: "email",
        });
      } else {
        const otp = await generateOtp(email);
        return otp;
      }
    } catch (err) {
      console.log("Error retrieving user data", err);
      return Promise.reject({ error: "Something went wrong. Try again later!" });
    }
  }

  async function emailVerificationForgetPass(email) {
    try {
      const user = await Users.findOne({ email: email });
  
      if (user) {
        const otp = await generateOtp(email);
        // console.log(otp, "otp.>>>");
        return otp;
      } else {
        return Promise.reject({
          error: "Account does not exist!",
          field: "email",
        });
      }
    } catch (err) {
      console.error("Error retrieving user data", err);
      return Promise.reject({ error: "Something went wrong. Try again later!" });
    }
  }
  async function generateOtp(email) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      const emailtemplate = `
      <html>
      <head>
          <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
          }
          .title {
              color: #fff;
              font-weight: bold;
              font-family: 'Arial Black', sans-serif;
              font-size: 24px;
              margin-bottom: 10px;
          }
          .container {
              max-width: 600px;
              margin: auto;
              background: #9a1c3f;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              text-align: center;
              color: #fff;
          }
          .otp-content {
              background-color: #e99e7a;
              color: #071e43;
              padding: 10px;
              border-radius: 5px;
              margin-top: 20px;
          }
      </style>
      </head>
      <body>
          <div class="container">
          <h1 class="title">OTP Verification</h1>
          <div class="otp-content">
              <strong>Your One Time is Password:</strong> ${otp}
          </div>
      </div>
      </body>
     </html>
      `;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sandeepgautam65413@gmail.com",
          pass: "rpvi vynh jyil uzip",
        },
      });
  
      const mailOptions = {
        from: "sandeepgautam65413@gmail.com",
        to: email,
        subject: "OTP Verification",
        html: emailtemplate,
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      return otp;
    } catch (error) {
      console.error("Error sending otp:", error);
      throw new Error("Error sending otp");
    }
  }

  async function saveUser(body) {
    try {
      const { username, email, phone, password} = body;
      const resp = await PasswordService.passwordEncryption(password);
      const data = {
        username: username,
        email: email,
        phone: phone,
        password: resp.password,
      };
      const newUser = new UserSchema(data);
      const user = await newUser.save();
      const userId = user._id;
      return { userId: userId };
    } catch (error) {
      console.error("Error saving user data:", error);
      throw new Error("Error saving user data");
    }
  }

  async function resetPassword(email, password) {
    try {
      const resp = await PasswordService.passwordEncryption(password);
      const updatePassword = await UserSchema.findOneAndUpdate(
        { email: email }, 
        { $set: { password: resp.password } },
        { new: true }
      );
      return updatePassword;
    } catch (error) {
      console.error("Error in resetPassword function:", error);
      throw new Error(error.message);
    }
  }


  
  module.exports = service;