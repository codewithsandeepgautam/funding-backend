const express = require('express');
const router = express.Router();
const PaymentService = require('../services/payment.service');
router.post('/checkout', (req, res) => {
    const { amount } = req.body;
    PaymentService.checkout(amount)
        .then(response => {
            res.status(200).json({
                success: true,
                order: response
            });
        })
        .catch(error => {
            console.error("Error creating order:", error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
});

router.post('/paymentverify', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    PaymentService.paymentVerification({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
        .then(response => {
            if (response.success) {
                console.log(response);
                res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
            } else {
                res.status(400).json({
                    success: false,
                });
            }
        })
        .catch(error => {
            console.error("Error verifying payment:", error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        });
});
module.exports = router;
