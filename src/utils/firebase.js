// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// Database Structure:
/*
ridgway-eats/
├── activeOrders/
│   └── {orderId}/
│       ├── orderNumber: "BS001" or "GB001"
│       ├── customerName: "John Doe"
│       ├── customerPhone: "+19705551234"
│       ├── customerEmail: "john@example.com"
│       ├── items: [
│       │   {
│       │     id: "item_id",
│       │     name: "The Ranch Hand",
│       │     price: 12,
│       │     quantity: 1,
│       │     category: "breakfast",
│       │     modifications: ["extra cheese", "no onions"]
│       │   }
│       │ ]
│       ├── subtotal: 12.00
│       ├── tax: 0.96
│       ├── tip: 2.00
│       ├── total: 14.96
│       ├── paymentMethod: "apple_pay" | "google_pay" | "card"
│       ├── paymentIntentId: "pi_xxx"
│       ├── status: "confirmed" | "preparing" | "ready" | "picked_up"
│       ├── menuType: "breakfast" | "dinner"
│       ├── orderType: "pickup" | "dine_in"
│       ├── specialInstructions: "Ring twice"
│       ├── createdAt: timestamp
│       ├── estimatedPickupTime: timestamp
│       ├── actualPickupTime: timestamp
│       └── statusHistory: [
│           {
│             status: "confirmed",
│             timestamp: timestamp,
│             note: "Order received"
│           }
│         ]
│
├── completedOrders/
│   └── {orderId}/
│       └── ... (same structure + completedAt)
│
├── dailyStats/
│   └── {YYYY-MM-DD}/
│       ├── totalOrders: 45
│       ├── totalRevenue: 567.89
│       ├── breakfastOrders: 25
│       ├── dinnerOrders: 20
│       └── averageOrderValue: 12.62
│
└── orderSequence/
    ├── breakfast: 156  // Next order will be BS157
    └── dinner: 234     // Next order will be GB235
*/