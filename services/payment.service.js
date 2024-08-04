const PaymentSchema = require('../schemas/payment.schema');
const Razorpay =  require('razorpay');
const crypto = require('crypto');
let service = {};
service.checkout = checkout;
service.paymentVerification = paymentVerification;
//create instance for razorpay
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });

async function checkout(amount) {
    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        return order;
    } catch (error) {
        console.log("Error creating order", error);
        throw new Error(error.message);
    }
}

async function paymentVerification({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Save payment details to the database
            await PaymentSchema.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.log("Error verifying payment", error);
        throw new Error(error.message);
    }
}


module.exports = service;