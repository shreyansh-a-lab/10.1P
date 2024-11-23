import React, { useState } from 'react';
import './NewsletterSignup.css';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        const error = await response.json();
        setMessage(error.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setMessage('Thank you for subscribing!');
    }
  };

  return (
    <div className="newsletter-signup">
      <h2>Sign Up for Our Daily Insider</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default NewsletterSignup;
