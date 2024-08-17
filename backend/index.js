import express from 'express'
import paymentRouter from './routes/payment.route.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server is working"
    })
})

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())

app.use("/api", paymentRouter)

app.listen(PORT, ()=>{
    console.log(`server is listening on http://localhost:${PORT}`)
})