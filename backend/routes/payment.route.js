import express from 'express'
import { checkPayment, getKey, paymentVerification } from '../controller/payment.controller.js';


const router = express.Router()

// endpoints for checking payments 
router.post("/check", checkPayment)
router.get("/key", getKey)
router.post("/verify", paymentVerification)

export default router;
