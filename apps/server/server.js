const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // <- Não é o webhook secret aqui!

const endpointSecret = process.env.STRIPE_END_POINT_SECRET; // <- Deve ser o webhook secret (começa com "whsec_")

const app = express();

// ✅ Use raw parser APENAS para o webhook
app.post("/api/stripe/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Erro no webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("event.type: ", event.type)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const stripeCustomerId = session.customer;
    const userEmail = session.customer_email;

    console.log("Compra confirmada para:", userEmail);

    // Update user in the database (pseudo-code)
// db.updateUser(stripeCustomerId, userEmail);

if (!event.type) {
    return res.status(400).send('Missing event type');
}

if (event.type !== 'checkout.session.completed') {
    console.log('Unhandled event type:', event.type);
    return res.status(200).send('Event type not handled');
}
  }

  res.json({ received: true });
});

// ✅ Use express.json() DEPOIS do webhook para as demais rotas
app.use(express.json());
app.use("/api", router);

// 🔐 Verifique se está usando a STRIPE_SECRET_KEY correta no stripe()
// e a STRIPE_END_POINT_SECRET correta no webhook

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});