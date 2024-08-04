const CryptoJS = require("crypto-js");
const algorithm = 'abc-111-def';
const Users = require("../schemas/user.schema");

let service = {};
service.passwordEncryption = passwordEncryption;
service.passwordDecryption = passwordDecryption;
service.verifyPassword = verifyPassword;
service.updatePassword = updatePassword;
service.passwordValidation = passwordValidation;

function passwordValidation(password, confirmPassword) {
    if (password.length < 6) {
        return Promise.reject({error: 'Password should be atleast 6 characters!'});
    }else if(confirmPassword !== password){
        return Promise.reject({error: 'Confirm Password must match Password!'});
    }else{
        return {matched: true};
    }
}

function passwordEncryption(password) {
    const encryptedData = CryptoJS.AES.encrypt(password, algorithm).toString();
    return {password: encryptedData};
}

function passwordDecryption(encryptedData){
    const bytes  = CryptoJS.AES.decrypt(encryptedData, algorithm);
    const password = bytes.toString(CryptoJS.enc.Utf8);
    return {password: password};
}

async function verifyPassword(email, pass){
    try {
        const user = await Users.find({ email: email});
        passwordDecryption(user[0].password).then(async response => {
            if (response.password === pass){
                return true;
            }else{
                return Promise.reject({error: 'Incorrect Old Password'});
            }
        }).catch(error => {
            return Promise.reject({error: 'Something went wrong. Try again later!'});  
        })
    } catch (err) {
        return Promise.reject({error: 'Something went wrong. Try again later!'});
    }
}

async function updatePassword(email, newPass){
    try {
        passwordEncryption(newPass).then(resp => {
            let data = {
                password: resp.password
            }
            Users.findOneAndUpdate({ email: email }, data, { new: true }).then(user => {
                return {updated: true};
            }).catch(err => {
                return Promise.reject({error: 'Unable to update password!'});
            });
        }).catch(error => {
            return Promise.reject({error: 'Something went wrong. Try again later!'});
        })
    } catch (e) {
        console.error('Error saving user data');
        return Promise.reject(e);
    }
}

module.exports = service;