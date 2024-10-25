const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
//process.env.STRIPE_KEY
//console.log(STRIPE_KEY)

const stripe = require("stripe")(process.env.STRIPE_KEY); // Ensure the key is correct


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "success!",
    });
});

app.post("/payment/create", async (req, res) => {
    const total = parseInt(req.query.total);

    if (total > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });

        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    } else {
        res.status(403).json({
            message: "Total must be greater than 0",
        });
    }
});

app.listen(5000, (err) => {
    if (err) throw err;
    console.log("Server running on PORT :5000, http://localhost:5000");
});
