import React from "react";
import Items from "./Items";
import axios from 'axios'

const Productitem = () => {

  const checkHandler = async(price)=>{

    const {data: {key}} = await axios.get("http://localhost:5000/api/key")

    const {data: {order}} = await axios.post("http://localhost:5000/api/check", {
      price
    })
    // console.log(order.amount) //its better
    // console.log(order.id)

     // Open Razorpay Checkout
     const options = {
      key: key, // Replace with your Razorpay key_id
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'CodeByAdib',
      description: 'Test Transaction',
      order_id: order.id, // This is the order_id created in the backend
      callback_url: 'http://localhost:5000/api/verify', // Your success URL
      prefill: {
        name: 'CodeByAdib',
        email: 'codebyadib@gmail.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();

  }

  return (
    <div className="container d-flex justify-content-between mt-4">
      {Items.map((item) => {
        return (
          <div key={item.id} className="card" style={{width: "18rem"}}>
            <img src={item.img} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title" style={{fontWeight: "bolder"}}>{item.price} Rs</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary" onClick={()=>checkHandler(item.price)}>
                Buy Now
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Productitem;
