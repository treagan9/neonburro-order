export const glowBachiMenu = {
  colors: {
    banana: '#FFC107',
    fieryOrange: '#FF6B35',
    dragonRed: '#FF1744'
  },

  appetizers: [
    // Edamame group
    {
      id: 'salted_pods',
      name: 'Salted Pods',
      price: 4,
      description: 'Steamed edamame tossed in sea salt. Clean, classic, and always satisfying.',
      image: '/images/menu-items/salted-pods.png',
      available: true
    },
    {
      id: 'spicy_pods',
      name: 'Spicy Pods',
      price: 5,
      description: 'Edamame with garlic chili oil and togarashi. Bold heat and deep umami in every bite.',
      image: '/images/menu-items/spicy-pods.png',
      available: true,
      spicyLevel: 2
    },
    {
      id: 'glow_pods',
      name: 'Glow Pods',
      price: 5,
      description: 'Edamame glazed with miso butter and soy. Savory, smooth, and seriously snackable.',
      image: '/images/menu-items/glow-pods.png',
      available: true
    },
    
    // Lighter items
    {
      id: 'ember_rolls',
      name: 'Ember Rolls',
      price: 6,
      unit: '4 pieces',
      description: 'Crispy veggie spring rolls. Light crunch. Big flavor. Dipping essential.',
      image: '/images/menu-items/Ember-Rolls.png',
      available: true
    },
    {
      id: 'glowza_dumplings',
      name: 'Glowza Dumplings',
      price: 6,
      unit: 'three pieces',
      description: 'Three pan-fried chicken and veggie gyoza. Crisped to perfection. Comes with one GlowBachi sauce.',
      image: '/images/menu-items/glowza-dumplings.png',
      available: true
    },
    {
      id: 'onion_blaze_soup',
      name: 'Onion Blaze Soup',
      price: 6,
      description: 'Sweet onion broth with garlic soy and baked cheese top. Deep flavor. Melty finish. Pure comfort.',
      image: '/images/menu-items/onion-blaze-soup.png',
      available: true
    },
    
    // Seafood
    {
      id: 'tempura_pop',
      name: 'Tempura Pop',
      price: 8,
      unit: 'five pieces',
      description: 'Five pieces of crispy shrimp tempura. Golden and light, served with your choice of sauce.',
      image: '/images/menu-items/tempura-pop.png',
      available: true
    },
    {
      id: 'crispy_calamari',
      name: 'Crispy Calamari',
      price: 9,
      description: 'Flash-fried squid with citrus salt and shichimi. Crunchy, tender, and built for dipping.',
      image: '/images/menu-items/crispy-calamari.png',
      available: true
    },
    {
      id: 'bang_bang_boom',
      name: 'Bang Bang Boom',
      price: 12,
      unit: '8 pieces',
      description: 'Crispy rock shrimp tossed in creamy-spicy Bang sauce. Sweet heat that keeps you coming back.',
      image: '/images/menu-items/Bang-Bang-Boom.png',
      spicyLevel: 2,
      available: true
    },
    
    // Meat items
    {
      id: 'coal_sticks',
      name: 'Coal Sticks',
      price: 8,
      unit: '3 skewers',
      description: 'Grilled chicken skewers with teriyaki char. Sweet, smoky, gone in seconds.',
      image: '/images/menu-items/Coal-Sticks.png',
      available: true
    },
    {
      id: 'dragon_wings',
      name: 'Dragon Wings',
      price: 9,
      unit: 'six pieces',
      shortName: 'Dragon Wings',
      description: 'Japanese-style karaage wings. Crispy, juicy, addictive. Choose your GlowDrip sauce.',
      image: '/images/menu-items/Dragon-Wings.png',
      requiresSauce: true,
      available: true
    },
    {
      id: 'glow_wings',
      name: 'Pick Your Sauce Glow Wings',
      shortName: 'Glow Wings',
      price: 9,
      unit: 'six pieces',
      description: 'Six crispy wings tossed in your choice of GlowDrip sauce. Every wing hits different.',
      image: '/images/menu-items/Pick-Your-Sauce-Glow-Wings.png',
      requiresSauce: true,
      available: true
    },
    {
      id: 'smoked_wings',
      name: 'Smoked Wings',
      price: 9,
      unit: 'six pieces',
      description: 'Wood-smoked wings with deep flavor. Choose your GlowDrip sauce to finish.',
      image: '/images/menu-items/Pick-Your-Sauce-Wings.png',
      requiresSauce: true,
      available: true
    }
  ],

  buildYourOwn: {
    pricing: {
      small: 11,
      large: 14
    }
  },

  signatureBowls: [
    {
      id: 'glowbachi_bowl',
      name: 'The GlowBachi Bowl',
      smallPrice: 12,
      largePrice: 15,
      protein: 'Teriyaki Steak',
      description: 'Seared steak glazed in house teriyaki over hibachi rice. Grilled vegetables. Pure umami. The bowl that started it all.',
      image: '/images/menu-items/GlowBachi-Bowl.png',
      available: true
    },
    {
      id: 'aurora_bowl',
      name: 'Aurora Bowl',
      smallPrice: 11,
      largePrice: 14,
      protein: 'Ginger Chicken',
      description: 'Tender chicken with fresh ginger glaze over jasmine rice. Bright, aromatic, and clean. Morning light in a bowl.',
      image: '/images/menu-items/Aurora-Bowl.png',
      available: true
    },
    {
      id: 'smoke_signal',
      name: 'Smoke Signal',
      smallPrice: 13,
      largePrice: 16,
      protein: 'BBQ Ribeye',
      description: 'Smoky ribeye with Japanese BBQ glaze, fried garlic, and charred scallions over hibachi rice. Bold and unapologetic.',
      image: '/images/menu-items/Smoke-Signal.png',
      available: true
    },
    {
      id: 'afterglow',
      name: 'Afterglow',
      smallPrice: 14,
      largePrice: 17,
      protein: 'Salmon & Shrimp',
      description: 'Miso-glazed salmon and garlic shrimp over citrus rice. Ocean meets mountain. Light but satisfying.',
      image: '/images/menu-items/Afterglow.png',
      available: true
    },
    {
      id: 'driftwater',
      name: 'Driftwater',
      smallPrice: 14,
      largePrice: 17,
      protein: 'Spicy Tuna',
      description: 'Seared spicy tuna over sushi rice with cucumber, avocado, and wasabi aioli. Cool heat. West meets East.',
      image: '/images/menu-items/Driftwater.png',
      spicyLevel: 2,
      available: true
    },
    {
      id: 'bone_blaze',
      name: 'Bone Blaze',
      smallPrice: 15,
      largePrice: 18,
      protein: 'Korean Short Rib',
      description: 'Marinated short rib with gochujang glaze over kimchi fried rice. Sweet, spicy, unforgettable.',
      image: '/images/menu-items/Bone-Blaze.png',
      spicyLevel: 3,
      available: true
    },
    {
      id: 'veggie_glow_bowl',
      name: 'Veggie Glow Bowl',
      smallPrice: 11,
      largePrice: 14,
      protein: 'Seasonal Vegetables',
      description: 'Fried rice, grilled vegetables, edamame, avocado, choice of sauce. Charred. Fresh. Umami.',
      image: '/images/menu-items/veggie-glow-bowl.png',
      vegetarian: true,
      available: true
    }
  ],

  sauces: [
    'Teriyaki',
    'Spicy Mayo',
    'Bang Sauce',
    'Ginger Soy',
    'Wasabi Aioli',
    'Korean BBQ',
    'Miso Glaze',
    'Garlic Butter',
    'Sweet Chili',
    'Honey Sriracha'
  ],

  addOns: {
    proteins: [
      { id: 'extra_steak', name: 'Extra Steak', price: 5 },
      { id: 'extra_chicken', name: 'Extra Chicken', price: 4 },
      { id: 'extra_shrimp', name: 'Extra Shrimp', price: 5 },
      { id: 'extra_salmon', name: 'Extra Salmon', price: 6 },
      { id: 'extra_tofu', name: 'Extra Tofu', price: 3 },
      { id: 'fried_egg', name: 'Fried Egg', price: 2 }
    ],
    sides: [
      { id: 'extra_rice', name: 'Extra Rice', price: 3 },
      { id: 'extra_noodles', name: 'Extra Noodles', price: 3 },
      { id: 'kimchi', name: 'Kimchi', price: 3 },
      { id: 'miso_soup', name: 'Miso Soup', price: 4 },
      { id: 'edamame', name: 'Side Edamame', price: 4 }
    ],
    toppings: [
      { id: 'avocado', name: 'Avocado', price: 2 },
      { id: 'extra_sauce', name: 'Extra Sauce', price: 1 },
      { id: 'crispy_garlic', name: 'Crispy Garlic', price: 1 },
      { id: 'sesame_seeds', name: 'Sesame Seeds', price: 0.50 },
      { id: 'green_onions', name: 'Green Onions', price: 0.50 }
    ]
  }
};
