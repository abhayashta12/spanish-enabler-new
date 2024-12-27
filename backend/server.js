require('dotenv').config(); // Load environment variables
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const axios = require('axios'); // To make HTTP requests
const morgan = require('morgan'); // For logging
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('combined')); // Log HTTP requests

// CORS: Restrict origins to the client URL
app.use(cors(
    {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}
));

// Rate Limiting: Prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Security Headers
app.use(helmet());

// Ensure Environment Variables Are Set
if (!process.env.STRIPE_SECRET_KEY || !process.env.CLIENT_URL || !process.env.STRIPE_WEBHOOK_SECRET) {
  console.error("Required environment variables must be set (STRIPE_SECRET_KEY, CLIENT_URL, STRIPE_WEBHOOK_SECRET).");
  process.exit(1); // Exit if required environment variables are missing
}

// Mailchimp Newsletter Endpoint
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const dataCenter = apiKey.split('-')[1]; // Extract data center from API key
  const mailchimpUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

  try {
    const response = await axios.post(
      mailchimpUrl,
      {
        email_address: email,
        status: 'subscribed',
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
      }
    );
    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error(`Mailchimp error: ${error.response?.data || error.message}`);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// Endpoint for retrieving checkout session details
app.get('/retrieve-checkout-session/:sessionId', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required.' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json({
      courseName: session.metadata.courseName || 'Unknown Course',
    });
  } catch (e) {
    console.error(`Error retrieving checkout session: ${e.message}`);
    res.status(500).json({ error: 'Failed to retrieve session details.' });
  }
});

// POST endpoint for creating a checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { courseName, price, originPage } = req.body;

    // Validate inputs
    if (!courseName || !price || isNaN(price)) {
      return res.status(400).json({ error: 'Invalid course name or price.' });
    }

    // Determine the appropriate cancel URL based on the origin page
    let cancelUrl = `${process.env.CLIENT_URL}#courses`;
    if (originPage === 'Group') cancelUrl = `${process.env.CLIENT_URL}/courses/Group`;
    if (originPage === 'oneonone') cancelUrl = `${process.env.CLIENT_URL}/courses/OneonOne`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: 'example@domain.com',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseName,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: { courseName },
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error(`Error creating checkout session: ${e.message}`);
    res.status(500).json({ error: 'Failed to create checkout session.' });
  }
});

// Webhook Endpoint for Stripe Events
app.post('/webhook', cors(), express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Set this in .env
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log(`Payment succeeded for session: ${session.id}`);
        // Perform post-payment actions here (e.g., update the database)
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Port and Listen
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
