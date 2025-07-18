require('dotenv').config(); // Load environment variables
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const axios = require('axios'); // To make HTTP requests
const morgan = require('morgan'); // For logging
const app = express();
const crypto = require('crypto')

// Middleware
app.use(express.static('public'));
// app.use(express.json());
app.use(morgan('combined')); // Log HTTP requests


// CORS: Restrict origins to the client URL
const allowedOrigins = [
  'https://thespanishenabler.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed from origin: ${origin}`));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

// Rate Limiting: Prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Security Headers
app.use(helmet());

// Use express.json() for all routes except the /webhook route
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // Skip JSON parsing for /webhook
  } else {
    express.json()(req, res, next); // Apply express.json() for all other routes
  }
});

// Ensure Environment Variables Are Set
if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.CLIENT_URL ||
  !process.env.STRIPE_WEBHOOK_SECRET
) {
  console.error(
    'Required environment variables must be set (STRIPE_SECRET_KEY, CLIENT_URL, STRIPE_WEBHOOK_SECRET).'
  );
  process.exit(1); // Exit if required environment variables are missing
}

// Mailchimp Newsletter Endpoint
app.post('/subscribe', async (req, res) => {
  const { name, email, tag } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const dataCenter = apiKey.split('-')[1]; // Extract data center from API key
  const mailchimpUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

  try {
    await axios.post(
      mailchimpUrl,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
        tags: [tag], // Tag dynamically passed from frontend
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString(
            'base64'
          )}`,
        },
      }
    );
    res.status(200).json({ message: 'Subscription successful!' });
  } catch (error) {
    console.error(`Mailchimp error: ${error.response?.data || error.message}`);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// Mailchimp Newsletter Endpoint for Expressions Page
app.post('/subscribe-expressions', async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid name or email address.' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const dataCenter = apiKey.split('-')[1]; // Extract data center from API key
  const listId = process.env.MAILCHIMP_LIST_ID; // SAME LIST
  const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  const putUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

  try {
    await axios.put(
      putUrl,
      {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
        tags: ['expressions-lead'], // Important: add a unique tag for this campaign
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
      }
    );
    res.status(200).json({ message: 'Subscription to Expressions successful!' });
  } catch (error) {
    console.error(`Mailchimp error (expressions): ${error.response?.data || error.message}`);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// Mailchimp Newsletter Endpoint for Verbs Page
app.post('/subscribe-verbs', async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid name or email address.' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const dataCenter = apiKey.split('-')[1];
  const listId = process.env.MAILCHIMP_LIST_ID;
  const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  const putUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

  try {
    await axios.put(
      putUrl,
      {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
        tags: ['verbs-lead'], // 🏷️ Key tag for targeting Verbs campaign
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
      }
    );
    res.status(200).json({ message: 'Subscription to Verbs successful!' });
  } catch (error) {
    console.error(`Mailchimp error (verbs): ${error.response?.data || error.message}`);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// Mailchimp Newsletter Endpoint for Mistakes Page
app.post('/subscribe-mistakes', async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid name or email address.' });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const dataCenter = apiKey.split('-')[1];
  const listId = process.env.MAILCHIMP_LIST_ID;

  const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  const putUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;


  try {
    await axios.put(
      putUrl,
      {
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
        tags: ['mistakes-lead'], // 🏷️ Key tag for targeting Mistakes campaign
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
      }
    );
    res.status(200).json({ message: 'Subscription to Mistakes successful!' });
  } catch (error) {
    console.error(`Mailchimp error (mistakes): ${error.response?.data || error.message}`);
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
      return res
        .status(400)
        .json({ error: 'Invalid course name or price.' });
    }

    // Determine the appropriate cancel URL based on the origin page
    let cancelUrl = `${process.env.CLIENT_URL}#courses`;
    if (originPage === 'Group')
      cancelUrl = `${process.env.CLIENT_URL}/courses/Group`;
    if (originPage === 'oneonone')
      cancelUrl = `${process.env.CLIENT_URL}/courses/OneonOne`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
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
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    console.log('Request received at /webhook');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    const sig = req.headers['stripe-signature'];
    if (!sig) {
      console.error('No stripe-signature header provided');
      return res
        .status(400)
        .send('Webhook Error: No stripe-signature header value was provided.');
    }

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          console.log(`Payment succeeded for session: ${session.id}`);
          // Perform post-payment actions here (e.g., update the database)
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

// Port and Listen
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
