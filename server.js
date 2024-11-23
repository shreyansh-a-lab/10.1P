const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set your SendGrid API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const msg = {
    to: email,
    from: 'your-email@example.com', // Your verified sender
    subject: 'Welcome to DEV@Deakin Daily Insider',
    text: 'Thank you for subscribing to our newsletter!',
    html: '<strong>Thank you for subscribing to our newsletter!</strong>',
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
