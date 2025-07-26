// Biscuit Shooter - Breakfast Menu Data

export const biscuitShooterMenu = {
  name: 'Biscuit Shooter',
  tagline: 'Sunrise Grub • High Country Vittles',
  hours: {
    start: '5:00 AM',
    end: '11:00 AM',
    startHour: 5,
    endHour: 11
  },
  colors: {
    primary: '#FFE135',
    secondary: '#FFD54F',
    accent: '#FFE082',
    glow: 'rgba(255,225,53,0.4)'
  },
  
  buildYourOwn: {
    title: 'Build Your Breakfast',
    bases: [
      {
        id: 'buttermilk_biscuit',
        name: 'Buttermilk Biscuit',
        price: 4,
        description: 'Fluffy, buttery, made from scratch',
        icon: '🥐'
      },
      {
        id: 'country_omelette',
        name: 'Country Omelette',
        price: 6,
        description: '3-egg omelette, cooked to order',
        icon: '🍳'
      },
      {
        id: 'scramble_bowl',
        name: 'Scramble Bowl',
        price: 6,
        description: 'Hearty scrambled eggs with crispy potatoes',
        icon: '🥘'
      },
      {
        id: 'kouign_amann',
        name: 'Kouign-Amann',
        price: 5,
        description: 'Sweet, flaky, caramelized pastry',
        icon: '🥮'
      }
    ],
    proteins: [
      { id: 'bacon', name: 'Applewood Bacon', price: 3, description: '3 strips' },
      { id: 'sausage', name: 'Country Sausage', price: 3, description: '2 patties' },
      { id: 'ham', name: 'Black Forest Ham', price: 3, description: 'Thick cut' },
      { id: 'fried_chicken', name: 'Fried Chicken', price: 4, description: 'Buttermilk breast' },
      { id: 'steak', name: 'Ribeye Steak', price: 6, description: '4oz, cooked medium' }
    ],
    addOns: [
      { id: 'egg', name: 'Fried Egg', price: 2, description: 'Over medium' },
      { id: 'cheese', name: 'Cheese', price: 1, description: 'Cheddar, Swiss, or Pepper Jack' },
      { id: 'gravy', name: 'Country Gravy', price: 2, description: 'Sausage or mushroom' },
      { id: 'avocado', name: 'Avocado', price: 2, description: 'Fresh sliced' },
      { id: 'hash_browns', name: 'Hash Browns', price: 3, description: 'Crispy golden' },
      { id: 'green_chili', name: 'Green Chili', price: 2, description: 'Hatch green chili sauce' },
      { id: 'hollandaise', name: 'Hollandaise', price: 2, description: 'Classic or chipotle' }
    ]
  },
  
  signatures: [
    {
      id: 'the-ranch-hand',
      name: 'The Ranch Hand',
      price: 12,
      description: 'Hearty biscuit sandwich with fried egg, smoked thin ribeye, sharp cheddar, and a slather of peppered gravy. Built to fuel the day.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-ranch-hand.png'
    },
    {
      id: 'the-velvet-revolver',
      name: 'The Velvet Revolver',
      price: 11,
      description: 'Smoky bacon, molten gouda, slow-cooked caramelized onions, and buttery avocado folded into a golden omelet. Fires smooth. Hits hard.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-velvet-revolver.png'
    },
    {
      id: 'the-wildflower',
      name: 'The Wildflower',
      price: 10,
      description: 'Fresh spinach, fire-roasted red peppers, tomato, and crumbled feta folded into farm-fresh eggs. Light, clean, and built for the trail.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-wildflower.png',
      vegetarian: true
    },
    {
      id: 'kouign-amann',
      name: 'Kouign-Amann',
      price: 5,
      description: 'Buttery, flaky pastry with a caramelized sugar crust and golden layers that melt in your mouth. No toppings needed. No crumbs left behind.',
      image: '/images/menu-items/biscuit-shooter-breakfast/kouign-amann.png',
      vegetarian: true
    },
    {
      id: 'the-honey-hitter',
      name: 'The Honey Hitter',
      price: 9,
      description: 'Buttermilk fried chicken, honey butter, and a biscuit that slaps. Sticky-finger good.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-honey-hitter.png',
      spicyLevel: 1
    },
    {
      id: 'the-iron-skillet',
      name: 'The Iron Skillet',
      price: 14,
      description: 'Farm eggs with crispy Yukon potatoes, sweet corn, smoky poblanos and sharp white cheddar. Topped with seared brisket and a hit of chipotle crema.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-iron-skillet.png',
      bestseller: true,
      spicyLevel: 2
    },
    {
      id: 'the-greenhorn',
      name: 'The Greenhorn',
      price: 11,
      description: 'Scrambled farm eggs with crispy Yukon potatoes, fire-roasted peppers, and fresh spinach. Topped with sliced avocado, bright salsa fresca, and crumbled queso fresco.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-greenhorn.png',
      vegetarian: true
    },
    {
      id: 'the-riverboat',
      name: 'The Riverboat',
      price: 7,
      description: 'An open biscuit riding a flood of peppered sausage gravy. Float into flavor.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-riverboat.png'
    },
    {
      id: 'the-stockyard',
      name: 'The Stockyard',
      price: 15,
      description: 'Smoked ribeye served with four eggs any style and a heap of crispy Yukon potatoes. Built for big appetites.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-stockyard.png'
    },
    {
      id: 'the-golden-gate',
      name: 'The Golden Gate',
      price: 9,
      description: 'Toasted sourdough piled high with creamy avocado, a sprinkle of everything seasoning, and a sunny-side egg on top. West Coast classic, done right.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-golden-gate.png',
      vegetarian: true
    },
    {
      id: 'the-coastline-scramble',
      name: 'The Coastline Scramble',
      price: 14,
      description: 'Fluffy eggs over crispy sweet potato hash with charred peppers, caramelized onions, and wilted greens. Finished with sliced avocado, queso fresco, and a drizzle of zesty lime crema.',
      image: '/images/menu-items/biscuit-shooter-breakfast/the-coastline-scramble.png',
      vegetarian: true
    }
  ],
  
  sides: [
    { id: 'biscuit', name: 'Extra Biscuit', price: 3 },
    { id: 'toast', name: 'Sourdough Toast', price: 2 },
    { id: 'fruit_cup', name: 'Fresh Fruit Cup', price: 4 },
    { id: 'yogurt_parfait', name: 'Greek Yogurt Parfait', price: 5 },
    { id: 'oatmeal', name: 'Steel Cut Oatmeal', price: 4 },
    { id: 'bacon_side', name: 'Side of Bacon', price: 4, description: '4 strips' },
    { id: 'sausage_side', name: 'Side of Sausage', price: 4, description: '3 patties' },
    { id: 'hash_browns', name: 'Hash Browns', price: 3 },
    { id: 'grits', name: 'Cheese Grits', price: 3 }
  ],
  
  beverages: [
    { id: 'coffee', name: 'High Country Coffee', price: 3, description: 'Bottomless' },
    { id: 'espresso', name: 'Espresso', price: 3 },
    { id: 'latte', name: 'Latte', price: 4 },
    { id: 'cappuccino', name: 'Cappuccino', price: 4 },
    { id: 'orange_juice', name: 'Fresh Orange Juice', price: 4 },
    { id: 'grapefruit_juice', name: 'Fresh Grapefruit Juice', price: 4 },
    { id: 'tea', name: 'Hot Tea Selection', price: 3 },
    { id: 'milk', name: 'Milk', price: 2, description: 'Whole, 2%, Oat' },
    { id: 'hot_chocolate', name: 'Hot Chocolate', price: 3 }
  ],
  
  // Add-ons for proper BuildYourOwnModal compatibility
  addOns: {
    proteins: [
      { id: 'extra_bacon', name: 'Extra Bacon', price: 3 },
      { id: 'extra_sausage', name: 'Extra Sausage', price: 3 },
      { id: 'extra_ham', name: 'Extra Ham', price: 3 },
      { id: 'extra_chicken', name: 'Extra Fried Chicken', price: 4 },
      { id: 'extra_steak', name: 'Extra Ribeye', price: 6 }
    ],
    sides: [
      { id: 'extra_hash', name: 'Extra Hash Browns', price: 3 },
      { id: 'extra_toast', name: 'Extra Toast', price: 2 },
      { id: 'extra_biscuit', name: 'Extra Biscuit', price: 3 }
    ],
    toppings: [
      { id: 'extra_cheese', name: 'Extra Cheese', price: 1 },
      { id: 'extra_gravy', name: 'Extra Gravy', price: 2 },
      { id: 'extra_egg', name: 'Extra Egg', price: 2 }
    ]
  }
};

// Helper function to check if breakfast menu is available
export const isBiscuitShooterOpen = () => {
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);
  return currentHour >= 5 && currentHour < 11;
};
