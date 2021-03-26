import Stripe from 'stripe';

// stripeClient is what we use to fetch our products
const stripeClient = Stripe(process.env.STRIPE_SECRET_KEY);

export default stripeClient;
