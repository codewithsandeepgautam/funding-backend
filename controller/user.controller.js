const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const PasswordService = require('../services/password.service');
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserService.getUserData(email)
    .then((result) => {
      if (result.length > 0) {
        UserService.verifyLogin(email, password)
          .then(async (response) => { 
            try {
              const userData = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                phone: response.data.phone,
                password:response.data.password,
              };
              res.status(200).send(userData);
            } catch (error) {
              res.status(400).send(error);
            }
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      } else {
        res.status(404).send({ error: "Account not found!" });
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.post('/', async (req, res) =>{
  const {email} = req.body;
  UserService.getUserData(email)
  .then((response) =>{
    res.status(200).send(response);
  })
  .catch(err =>{
    console.log(err , "Error getting users");
  })
})
router.post("/register", async (req, res) => {
  const {username , email, phone, password } = req.body;
  try { 
    const emailVerificationResponse = await UserService.emailVerification(
      email
    );
    const passwordEncryptionResponse = await PasswordService.passwordEncryption(
      password
    );
    const data = {
      username: username,
      email: email,
      password: passwordEncryptionResponse.password,
      phone: phone,
      otp: emailVerificationResponse,
    };
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

router.post("/save", function (req, res) {
    UserService.saveUser(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
  
  // send otp
  router.get("/sendotp", function (req, res) {
    const { email, otp } = req.body;
    UserService.emailVerification(email, otp)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  router.post('/sendotp', (req, res) => {
    const { email } = req.body;
    // console.log(email);
    UserService.emailVerificationForgetPass(email)
      .then((otp) => {
        res.status(200).send({ otp });
  
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  router.put('/resetpassword', (req, res) => {
  const { email, password } = req.body;
  
  UserService.resetPassword(email, password)
    .then(resetPass => {
      res.status(200).json({ message: 'Data updated successfully', resetPass });
    })
    .catch(error => {
      console.error("Error updating user data:", error);
      res.status(400).json({ message: error.message });
    });
});


module.exports = router;