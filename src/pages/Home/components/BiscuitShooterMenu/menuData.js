// Biscuit Shooter Menu Data
export const biscuitShooterMenu = {
  // Colors for consistent theming
  colors: {
    morningYellow: '#FFE135',
    sunriseOrange: '#FF9F40',
    skyBlue: '#87CEEB',
    earthBrown: '#8B4513'
  },

  // Build Your Own Breakfast
  buildYourOwn: {
    bases: [
      { id: 'biscuit', name: 'Biscuit', price: 4, description: 'Fluffy buttermilk biscuit' },
      { id: 'omelette', name: 'Omelette', price: 6, description: 'Three-egg French omelette' },
      { id: 'scramble_bowl', name: 'Scramble Bowl', price: 6, description: 'Hearty breakfast bowl' },
      { id: 'kouign_amann', name: 'Kouign-Amann', price: 5, description: 'Sweet, flaky caramelized pastry' }
    ],
    
    meats: [
      { id: 'bacon', name: 'Bacon', price: 2 },
      { id: 'beef_chorizo', name: 'Beef Chorizo', price: 3 },
      { id: 'fried_chicken', name: 'Fried Chicken', price: 4 },
      { id: 'sausage_patty', name: 'Sausage Patty', price: 4 },
      { id: 'sausage_links', name: 'Sausage Links', price: 4 },
      { id: 'smoked_ribeye', name: 'Smoked Ribeye', price: 5 },
      { id: 'smoked_beef_rib', name: 'Smoked Beef Rib', price: 5 },
      { id: 'ham', name: 'Ham', price: 3 },
      { id: 'brisket', name: 'Brisket', price: 5 }
    ],
    
    cheeses: [
      { id: 'cheddar', name: 'Cheddar', price: 1.50 },
      { id: 'gouda', name: 'Gouda', price: 1.50 },
      { id: 'pepper_jack', name: 'Pepper Jack', price: 1.50 },
      { id: 'feta', name: 'Feta', price: 1.50 },
      { id: 'queso_fresco', name: 'Queso Fresco', price: 1.50 },
      { id: 'sharp_white_cheddar', name: 'Sharp White Cheddar', price: 1.50 }
    ],
    
    eggStyles: [
      { id: 'scrambled', name: 'Scrambled', description: 'mixed in' },
      { id: 'fried', name: 'Fried', description: 'on top' },
      { id: 'over_easy', name: 'Over Easy', description: 'on top' },
      { id: 'sunny_side', name: 'Sunny Side', description: 'on top' }
    ],
    
    veggiesAndSides: [
      { id: 'crispy_potatoes', name: 'Crispy Potatoes', price: 2 },
      { id: 'sweet_potato_hash', name: 'Sweet Potato Hash', price: 2 },
      { id: 'grilled_red_peppers', name: 'Grilled Red Peppers', price: 1.50 },
      { id: 'jalapenos', name: 'Jalapeños', price: 1.50 },
      { id: 'onions', name: 'Onions', price: 1.50 },
      { id: 'avocado', name: 'Avocado', price: 2 },
      { id: 'pico_de_gallo', name: 'Pico de Gallo', price: 1.50 },
      { id: 'sour_cream', name: 'Sour Cream', price: 1 },
      { id: 'side_salsa', name: 'Side of Salsa', price: 1 },
      { id: 'wilted_greens', name: 'Wilted Greens', price: 1 },
      { id: 'tomato', name: 'Tomato', price: 1.50 },
      { id: 'fire_roasted_peppers', name: 'Fire-Roasted Peppers', price: 1.50 },
      { id: 'caramelized_onions', name: 'Caramelized Onions', price: 1.50 },
      { id: 'corn', name: 'Corn', price: 1 },
      { id: 'sourdough_toast', name: 'Sourdough Toast', price: 2 }
    ],
    
    finishingTouches: [
      { id: 'breakfast_gravy', name: 'Breakfast Gravy', price: 2 },
      { id: 'jelly', name: 'Jelly', price: 0.50, description: 'Grape or Lemon' },
      { id: 'honey_butter', name: 'Honey Butter', price: 1 },
      { id: 'chipotle_crema', name: 'Chipotle Crema', price: 1 },
      { id: 'everything_seasoning', name: 'Everything Seasoning', price: 1 },
      { id: 'zesty_lime_crema', name: 'Zesty Lime Crema', price: 1 }
    ]
  },

  // Signature Breakfasts
  signatureBreakfasts: [
    {
      id: 'the_ranch_hand',
      name: 'The Ranch Hand',
      price: 12,
      shortDesc: 'Biscuit, fried egg, smoked thin ribeye, cheddar, peppered gravy',
      description: 'Hearty biscuit sandwich with fried egg, smoked thin ribeye, sharp cheddar, and a slather of peppered gravy. Built to fuel the day.',
      flavor: 'Hearty · Rich · Satisfying',
      available: true
    },
    {
      id: 'the_velvet_revolver',
      name: 'The Velvet Revolver',
      price: 11,
      shortDesc: 'Omelet with bacon, gouda, caramelized onions, avocado',
      description: 'Smoky bacon, molten gouda, slow-cooked caramelized onions, and buttery avocado folded into a golden omelet. Fires smooth. Hits hard.',
      flavor: 'Smoky · Smooth · Decadent',
      available: true
    },
    {
      id: 'the_wildflower',
      name: 'The Wildflower',
      price: 10,
      shortDesc: 'Omelet with spinach, peppers, tomato, feta',
      description: 'Fresh spinach, fire-roasted red peppers, tomato, and crumbled feta folded into farm-fresh eggs. Light, clean, and built for the trail.',
      flavor: 'Fresh · Light · Vibrant',
      vegetarian: true,
      available: true
    },
    {
      id: 'kouign_amann',
      name: 'Kouign-Amann',
      price: 5,
      shortDesc: 'Classic flaky caramelized pastry',
      description: 'Buttery, flaky pastry with a caramelized sugar crust and golden layers that melt in your mouth. No toppings needed. No crumbs left behind.',
      flavor: 'Sweet · Buttery · Crisp',
      available: true
    },
    {
      id: 'the_honey_hitter',
      name: 'The Honey Hitter',
      price: 9,
      shortDesc: 'Biscuit with fried chicken and honey butter',
      description: 'Buttermilk fried chicken, honey butter, and a biscuit that slaps. Sticky-finger good.',
      flavor: 'Sweet · Savory · Crispy',
      available: true
    },
    {
      id: 'the_iron_skillet',
      name: 'The Iron Skillet',
      price: 12,
      shortDesc: 'Bowl with eggs, potatoes, corn, poblanos, cheddar, brisket, chipotle crema',
      description: 'Farm eggs with crispy Yukon potatoes, sweet corn, smoky poblanos and sharp white cheddar. Topped with seared brisket and a hit of chipotle crema.',
      flavor: 'Smoky · Spicy · Hearty',
      spicyLevel: 2,
      available: true
    },
    {
      id: 'the_greenhorn',
      name: 'The Greenhorn',
      price: 10,
      shortDesc: 'Scramble with potatoes, peppers, spinach, avocado, salsa fresca, queso fresco',
      description: 'Scrambled farm eggs with crispy Yukon potatoes, fire-roasted peppers, and fresh spinach. Topped with sliced avocado, bright salsa fresca, and crumbled queso fresco.',
      flavor: 'Fresh · Bright · Colorful',
      vegetarian: true,
      available: true
    },
    {
      id: 'the_riverboat',
      name: 'The Riverboat',
      price: 7,
      shortDesc: 'Biscuit with sausage gravy',
      description: 'An open biscuit riding a flood of peppered sausage gravy. Float into flavor.',
      flavor: 'Comforting · Classic · Rich',
      available: true
    },
    {
      id: 'the_stockyard',
      name: 'The Stockyard',
      price: 15,
      shortDesc: 'Smoked ribeye, four eggs any style, crispy potatoes',
      description: 'Smoked ribeye served with four eggs any style and a heap of crispy Yukon potatoes. Built for big appetites.',
      flavor: 'Bold · Massive · Protein-Packed',
      available: true
    },
    {
      id: 'the_golden_gate',
      name: 'The Golden Gate',
      price: 9,
      shortDesc: 'Sourdough with avocado, everything seasoning, sunny egg',
      description: 'Toasted sourdough piled high with creamy avocado, a sprinkle of everything seasoning, and a sunny-side egg on top. West Coast classic, done right.',
      flavor: 'Fresh · Trendy · Satisfying',
      vegetarian: true,
      available: true
    },
    {
      id: 'the_coastline_scramble',
      name: 'The Coastline Scramble',
      price: 11,
      shortDesc: 'Scramble with sweet potato hash, peppers, onions, greens, avocado, queso, lime crema',
      description: 'Fluffy eggs over crispy sweet potato hash with charred peppers, caramelized onions, and wilted greens. Finished with sliced avocado, queso fresco, and a drizzle of zesty lime crema.',
      flavor: 'Zesty · Colorful · Coastal',
      vegetarian: true,
      available: true
    }
  ],

  // Operating hours
  schedule: {
    start: { hour: 5, minute: 0 },    // 5:00 AM
    end: { hour: 11, minute: 0 }      // 11:00 AM
  }
};
