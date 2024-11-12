import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const initiatePayment = async (req, res) => {
    try {
        const options = {
            amount : req.body.amount,
            currency : req.body.currency,
            receipt : req.body.receipt,
            payment_capture : 1, // Auto-capture the payment
        }

        const response = await razorpay.orders.create(options);
        res.status(200).json({ order_id: response.id, currency: response.currency, amount: response.amount });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

export const getPayment = async (req, res) => {
    try {
        const {paymentId}= req.params;
        const payment = await razorpay.payments.fetch(paymentId);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json({
            status: payment.status,
            method: payment.method,
            currency: payment.currency,
            amount: payment.amount,
            created_at: payment.created_at,
            notes: payment.notes,
         })
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}