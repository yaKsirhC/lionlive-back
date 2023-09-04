// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";

// const app = express();
// const stripe = require("stripe")(process.env.STRIPE);

// const prices = {
//   weekly: "price_1NmeojFYsjkW9mcTFzTh8mYo",
//   monthly: "price_1NmepPFYsjkW9mcTGd2WvKiE",
// };

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.post("/checkout", async (req, res) => {
//   try {
//     const { plan, auth } = req.body;
//     console.log(auth);
//     if (!plan) return res.sendStatus(400);
//     const success_url = process.env.BASE_URL + "/success?{CHECKOUT_SESSION_ID}&auth=" + auth;
//     const cancel_url = process.env.BASE_URL;
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           // @ts-ignore
//           price: prices[plan],
//           quantity: 1,
//         },
//       ],
//       success_url,
//       cancel_url,
//     });
//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// app.get("/success", async (req, res) => {
//   try {
//     const query = req.query;
//     if (Object.keys(query).length <= 0) return res.redirect("/");
//     const checkoutSession = await stripe.checkout.sessions.retrieve(Object.keys(query)[0]);
//     if (!checkoutSession) return res.redirect("/");
//     const customerId = checkoutSession.customer;
//     const subscription = checkoutSession.subscription;
//     const customer = await stripe.customers.retrieve(customerId);
//     const clientAuth = query.auth;
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// app.listen(5040, () => {
//   console.log("listening on 5040");
// });
