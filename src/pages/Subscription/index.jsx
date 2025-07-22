import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SubscriptionHero from './components/SubscriptionHero';
import SubscriptionOptions from './components/SubscriptionOptions';
import SubscriptionSuccess from './components/SubscriptionSuccess';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Subscription = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  const handleSubscriptionSuccess = (data) => {
    setSubscriptionData(data);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // Optionally redirect or perform other actions
    // window.location.href = '/members/';
  };

  return (
    <Box bg="dark.black" minH="100vh">
      <SubscriptionHero />
      
      <Elements stripe={stripePromise}>
        <SubscriptionOptions onSuccess={handleSubscriptionSuccess} />
      </Elements>

      <SubscriptionSuccess 
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        subscriptionData={subscriptionData}
      />
    </Box>
  );
};

export default Subscription;