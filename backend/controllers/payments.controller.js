import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Initiate payment endpoint
export const initiatePayment = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;

        // Validate request data
        if (!amount || !receipt) {
            return res.status(400).json({
                success: false,
                message: 'Amount and receipt are required',
            });
        }

        // Ensure the amount is a positive integer
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be a positive number',
            });
        }

        const options = {
            amount: amount * 100, // Convert amount to paise (1 INR = 100 paise)
            currency,
            receipt,
            payment_capture: 1, // Auto-capture the payment
        };

        // Create order on Razorpay
        const order = await razorpay.orders.create(options);

        // Check if order was created successfully
        if (!order || !order.id) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create Razorpay order',
            });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error initiating payment',
            error: error.message,
        });
    }
};

// Verify payment endpoint
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Validate request data
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required for verification',
            });
        }

        // Generate signature using HMAC with SHA256
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // Compare generated signature with Razorpay signature
        if (generated_signature === razorpay_signature) {
            res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed',
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message,
        });
    }
};
