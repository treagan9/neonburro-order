// Centralized menu data for GlowBachi and Biscuit Shooter
export const glowBachiMenu = {
  // Colors for consistent theming
  colors: {
    banana: '#FFE135',
    fieryOrange: '#FF6B35',
    neonTeal: '#00D9FF',
    darkRed: '#FF1744'
  },

  signatureBowls: [
    {
      id: 'glowbachi_bowl',
      name: 'GlowBachi Bowl',
      smallPrice: 14,
      largePrice: 19,
      image: '/images/menu-items/GlowBachi-Bowl.png',
      shortDesc: 'Smoked Chicken, Hibachi Vegetables, Choice of Base',
      flavor: 'Smoky · Sweet · Balanced',
      description: 'A classic mix of your chosen protein, grilled vegetables, and rice or noodles—drizzled with Lava Kiss and Sugar Char. A bold, sweet-savory finish that feels like a neon sunset on your tongue.',
      spicyLevel: 2,
      defaultSauces: ['Lava Kiss', 'Sugar Char'],
      available: true
    },
    {
      id: 'smoke_signal',
      name: 'Smoke Signal',
      smallPrice: 18,
      largePrice: 23,
      image: '/images/menu-items/Smoke-Signal.png',
      shortDesc: 'Smoked Ribeye, Hibachi Vegetables, White Rice',
      flavor: 'Buttery · Deep · Umami',
      description: 'Tender smoked ribeye layered over your base and flame-finished with Ashwood ginger sauce and Ghost Silk miso butter. Rich, bold, and quietly addictive.',
      spicyLevel: 1,
      defaultSauces: ['Ashwood', 'Ghost Silk'],
      available: true
    },
    {
      id: 'bone_blaze',
      name: 'Bone & Blaze',
      smallPrice: 16,
      largePrice: 21,
      image: '/images/menu-items/Bone-Blaze.png',
      shortDesc: 'Smoked Beef Rib, Hibachi Vegetables, Fried Rice',
      flavor: 'Sticky · Charred · Primal',
      description: 'Smoked beef rib glazed in Redshift chili fire and Sugar Char, served over your favorite base. This bowl hits with layered intensity and meat-lover heat.',
      spicyLevel: 4,
      defaultSauces: ['Redshift', 'Sugar Char'],
      available: true
    },
    {
      id: 'driftwater',
      name: 'Driftwater',
      smallPrice: 14,
      largePrice: 19,
      image: '/images/menu-items/Driftwater.png',
      shortDesc: 'Teppanyaki Shrimp, Hibachi Vegetables, Brown Rice',
      flavor: 'Citrusy · Crisp · Coastal',
      description: 'Teppanyaki shrimp tossed in citrusy Ice Veil and spicy First Light, with grilled vegetables and your choice of base. A clean, ocean-kissed bowl with a glowing finish.',
      spicyLevel: 2,
      defaultSauces: ['Ice Veil', 'First Light'],
      available: true
    },
    {
      id: 'afterglow',
      name: 'Afterglow',
      smallPrice: 13,
      largePrice: 18,
      image: '/images/menu-items/Afterglow.png',
      shortDesc: 'Smoked Chicken, Hibachi Vegetables, Yakisoba Noodles',
      flavor: 'Comforting · Herbal · Familiar',
      description: 'Smoked chicken paired with Sugar Char and Stone Bloom herb sauce over your choice of base. Feels like a backyard BBQ reimagined with finesse.',
      spicyLevel: 1,
      defaultSauces: ['Sugar Char', 'Stone Bloom'],
      available: true
    },
    {
      id: 'aurora_bowl',
      name: 'Aurora Bowl',
      smallPrice: 14,
      largePrice: 19,
      image: '/images/menu-items/Aurora-Bowl.png',
      shortDesc: 'Smoked Salmon, Hibachi Vegetables, White Rice',
      flavor: 'Cool · Bright · Refined',
      description: 'Delicate smoked salmon with Ice Veil yuzu ponzu and Stone Bloom herb drizzle, layered with grilled vegetables. Refreshing and rich — like a breeze under neon skies.',
      spicyLevel: 0,
      defaultSauces: ['Ice Veil', 'Stone Bloom'],
      available: true
    }
  ],

  appetizers: [
    {
      id: 'ember_rolls',
      name: 'Ember Rolls',
      price: 6,
      unit: '2 pieces',
      image: '/images/menu-items/Ember-Rolls.png',
      flavor: 'Savory · Crispy · Familiar',
      description: 'Golden-fried eggrolls stuffed with seasoned beef and vegetables.',
      available: true
    },
    {
      id: 'dragon_wings',
      name: 'Dragon Wings',
      price: 10,
      unit: '6 pieces',
      image: '/images/menu-items/Dragon-Wings.png',
      flavor: 'Juicy · Zesty · Golden',
      description: 'Japanese-style karaage chicken wings with lemon-garlic butter.',
      available: true
    },
    {
      id: 'coal_sticks',
      name: 'Coal Sticks',
      price: 8,
      unit: '2 skewers',
      image: '/images/menu-items/Coal-Sticks.png',
      flavor: 'Charred · Peppery · Bold',
      description: 'Grilled steak skewers with peppers and onions.',
      available: true
    },
    {
      id: 'bang_bang_boom',
      name: 'Bang Bang Boom',
      price: 12,
      unit: '8 pieces',
      image: '/images/menu-items/Bang-Bang-Boom.png',
      flavor: 'Spicy · Creamy · Crisp',
      description: 'Crispy fried shrimp in Lava Kiss sauce.',
      spicyLevel: 3,
      available: true
    },
    {
      id: 'glow_wings',
      name: 'Glow Wings',
      price: 9,
      unit: '6 pieces',
      image: '/images/menu-items/Pick-Your-Sauce-Wings.png',
      flavor: 'Crispy · Customizable · Addictive',
      description: 'Choose your sauce. 1 flavor per 6 wings.',
      requiresSauce: true,
      available: true
    },
    {
      id: 'smoked_wings',
      name: 'Smoked Wings',
      price: 9,
      unit: '6 pieces',
      image: '/images/menu-items/Pick-Your-Sauce-Wings.png',
      flavor: 'Smoky · Tender · Sauced',
      description: 'Wood-smoked wings. Choose your sauce.',
      requiresSauce: true,
      available: true
    }
  ],

  buildYourOwn: {
    pricing: {
      small: 13,
      large: 18
    },
    bases: [
      { id: 'white_rice', name: 'White Rice', included: true },
      { id: 'brown_rice', name: 'Brown Rice', included: true },
      { id: 'fried_rice', name: 'Fried Rice', upcharge: 1 },
      { id: 'yakisoba', name: 'Yakisoba Noodles', included: true },
      { id: 'udon', name: 'Udon', included: true },
      { id: 'ramen', name: 'Ramen', included: true }
    ],
    proteins: [
      { id: 'smoked_chicken', name: 'Smoked Chicken', included: true },
      { id: 'teppanyaki_chicken', name: 'Teppanyaki Chicken', included: true },
      { id: 'teppanyaki_shrimp', name: 'Teppanyaki Shrimp', included: true },
      { id: 'teppanyaki_salmon', name: 'Teppanyaki Salmon', included: true },
      { id: 'teppanyaki_beef', name: 'Teppanyaki Beef (Sirloin)', upcharge: 1 },
      { id: 'smoked_beef_rib', name: 'Smoked Beef Rib', upcharge: 2 },
      { id: 'smoked_ribeye', name: 'Smoked Ribeye', upcharge: 3 }
    ]
  },

  sauces: [
    { id: 'lava_kiss', name: 'Lava Kiss', description: 'Creamy, spicy, smoky', retailPrice: 7 },
    { id: 'ashwood', name: 'Ashwood', description: 'Zesty ginger-soy', retailPrice: 7 },
    { id: 'sugar_char', name: 'Sugar Char', description: 'Sweet teriyaki glaze', retailPrice: 7 },
    { id: 'first_light', name: 'First Light', description: 'Chili-lime garlic', retailPrice: 7 },
    { id: 'stone_bloom', name: 'Stone Bloom', description: 'Cilantro lime herb', retailPrice: 7 },
    { id: 'redshift', name: 'Redshift', description: 'Gochujang fire', retailPrice: 7 },
    { id: 'ghost_silk', name: 'Ghost Silk', description: 'Garlic butter miso', retailPrice: 7 },
    { id: 'ice_veil', name: 'Ice Veil', description: 'Yuzu ponzu citrus', retailPrice: 7 },
    { id: 'static_haze', name: 'Static Haze', description: 'Wasabi ranch', retailPrice: 7 }
  ],

  addOns: {
    proteins: [
      { id: 'extra_chicken', name: 'Extra Chicken', price: 4, description: '4 oz smoked or teppanyaki' },
      { id: 'extra_shrimp', name: 'Extra Shrimp', price: 5, description: '4 oz teppanyaki style' },
      { id: 'extra_salmon', name: 'Extra Salmon', price: 5, description: '4 oz smoked' },
      { id: 'extra_beef', name: 'Extra Teppanyaki Beef', price: 5, description: '4 oz grilled' },
      { id: 'extra_rib', name: 'Extra Smoked Beef Rib', price: 6, description: 'Fall-apart tender' },
      { id: 'extra_ribeye', name: 'Extra Smoked Ribeye', price: 6, description: '4 oz sliced' }
    ],
    sides: [
      { id: 'extra_base', name: 'Extra Noodles or Rice', price: 3, description: 'Double your base' },
      { id: 'grilled_veg', name: 'Side Grilled Veggies', price: 3, description: 'Hibachi style' },
      { id: 'chicken_rice', name: 'Smoked Chicken Fried Rice', price: 5, description: 'Side portion' },
      { id: 'white_rice', name: 'White Rice', price: 2, description: 'Steamed' },
      { id: 'brown_rice', name: 'Brown Rice', price: 2, description: 'Steamed' },
      { id: 'fried_rice', name: 'Fried Rice', price: 3, description: 'No protein' },
      { id: 'tofu_bites', name: 'Crispy Tofu Bites', price: 5, description: '5 pieces' },
      { id: 'slaw', name: 'Signature Slaw', price: 3, description: 'Yuzu vinaigrette' }
    ],
    toppings: [
      { id: 'fried_egg', name: 'Fried Egg', price: 2, description: 'Over medium' },
      { id: 'pickled_ginger', name: 'Pickled Ginger', price: 0.75 },
      { id: 'crispy_garlic', name: 'Crispy Garlic', price: 0.75 },
      { id: 'chili_crunch', name: 'Chili Crunch', price: 0.75 },
      { id: 'extra_sauce', name: 'Extra Sauce', price: 1, description: 'Any GlowDrip sauce' },
      { id: 'garlic_butter', name: 'Garlic Butter', price: 1, description: '2oz melted' }
    ]
  },

  // Operating hours for menu availability
  schedule: {
    breakfast: { start: 4, end: 11 },     // 4:00 AM - 11:00 AM
    lunch: { start: 12.5, end: 21 }      // 12:30 PM - 9:00 PM
  }
};

// Export for future breakfast menu
export const biscuitShooterMenu = {
  // We'll build this out with full data
  schedule: {
    start: 4,    // 4:00 AM
    end: 11      // 11:00 AM
  }
};
