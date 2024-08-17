import Razorpay from 'razorpay'

const checkPayment = async(req, res)=>{
    try {

        var instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
          });

        //   agar 100 se multiply nahi karenge to 120 rs aayega jo 12000 paise banta hai 
          var options = {
            amount: (req.body.price) * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };

        //   it takes some time and it returns promise so we need to add await keyword 
        const order = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        })
    }
}

const getKey = async(req, res)=>{
    res.status(200).json({
        success: true,
        key: process.env.KEY_ID
    })
}

const paymentVerification = async(req, res)=>{
    res.status(200).json({
        success: true,
        message: "payment successfully"
    })
}

export {checkPayment, getKey, paymentVerification}