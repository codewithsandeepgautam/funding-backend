const Contact = require('../schemas/contact.schema');
const nodemailer = require("nodemailer");

let contact = {};

contact.createContact = createContact;
contact.getContacts = getContacts;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sandeepgautam65413@gmail.com",
    pass: "rpvi vynh jyil uzip",
  },
});

async function createContact(name, email, subject, message) {
  try {
    const newContact = await Contact.create({ name, email, subject, message });

    let mailOptions = {
      from: "sandeepgautam65413@gmail.com",
      to: email,
      subject: subject,
      text: message, 
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error(error.message); // Throw error if sending email fails
      } else {
        console.log("Email sent successfully!");
      }
    });

    return newContact;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getContacts(){
  try{
    const contacts = await Contact.find();
    return contacts;
  }
  catch(err){
    console.log("Error getting contacts");
    throw new Error(err.message);
  }
}

module.exports = contact;
