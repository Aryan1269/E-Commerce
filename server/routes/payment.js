const express = require("express");
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51Q26YMLRZTkAVsy1qtc55W339dkl0nk7kumxI9u3xOPeh3sfxJXtIjk6VjixcAUhGlaLdFviho0hpphPPtZOg1Co00eSCJLlqd"
);

router.post("/create-checkout-session", async (req, res) => {
  const { price } = req.body; // Assume items is an array of product objects
  console.log(price, "price");

  try {
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Product Name", // Replace with actual product name
          },
          unit_amount: price * 100, // Convert to cents
        },
        quantity: 1, // Adjust quantity as needed
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/sucess`, // Redirect URL after successful payment
      cancel_url: `http://localhost:5173/cancel`, // Redirect URL if payment is canceled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;