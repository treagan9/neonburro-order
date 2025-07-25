// GlowBachi - Complete Menu Data
// A Neon Tokyo x Old West Hibachi Experience

export const glowBachiMenu = {
  name: 'GlowBachi',
  tagline: '山の光 • Mountain Light Hibachi',
  hours: {
    start: '12:30 PM',
    end: '9:00 PM',
    startHour: 12.5,
    endHour: 21
  },
  colors: {
    primary: '#FFC107',
    secondary: '#FF6B35',
    accent: '#FF1744',
    glow: 'rgba(255,193,7,0.4)'
  },
  
  appetizers: [
    // Edamame Section
    {
      id: 'salted_pods',
      name: 'Salted Pods',
      price: 4,
      description: 'Steamed edamame tossed in sea salt. Simple, clean, and always satisfying.',
      image: '/images/menu-items/salted-pods.png',
      category: 'edamame',
      vegetarian: true,
      glutenFree: true
    },
    {
      id: 'spicy_pods',
      name: 'Spicy Pods',
      price: 5,
      description: 'Edamame with garlic chili oil and togarashi. A fiery kick for the bold snacker.',
      image: '/images/menu-items/spicy-pods.png',
      spicyLevel: 2,
      category: 'edamame',
      vegetarian: true,
      glutenFree: true
    },
    {
      id: 'glow_pods',
      name: 'Glow Pods',
      price: 5,
      description: 'Edamame glazed in miso butter and soy. Savory and smooth — our signature twist.',
      image: '/images/menu-items/glow-pods.png',
      category: 'edamame',
      vegetarian: true
    },
    
    // Seafood
    {
      id: 'tempura_pop',
      name: 'Tempura Pop',
      price: 8,
      unit: '5 pieces',
      description: 'Five crispy shrimp tempura. Light and golden. Comes with one GlowDrip sauce.',
      image: '/images/menu-items/tempura-pop.png',
      category: 'seafood',
      requiresSauce: true
    },
    {
      id: 'crispy_calamari',
      name: 'Crispy Calamari',
      price: 9,
      description: 'Flash-fried squid with citrus salt and shichimi pepper. Light, crispy, and craveable.',
      image: '/images/menu-items/crispy-calamari.png',
      category: 'seafood'
    },
    
    // Light Starters
    {
      id: 'glowza_dumplings',
      name: 'Glowza Dumplings',
      price: 6,
      unit: '3 pieces',
      description: 'Three pan-fried chicken & veggie gyoza. Crisp-bottomed and flavorful. Comes with one GlowDrip sauce.',
      image: '/images/menu-items/glowza-dumplings.png',
      category: 'light',
      requiresSauce: true
    },
    {
      id: 'onion_blaze_soup',
      name: 'Onion Blaze Soup',
      price: 6,
      description: 'Garlic-soy onion broth topped with melted cheese. A bold East-West fusion classic.',
      image: '/images/menu-items/onion-blaze-soup.png',
      category: 'light'
    },
    {
      id: 'ember_rolls',
      name: 'Ember Rolls',
      price: 8,
      unit: '2 pieces',
      description: 'Two charred rice paper rolls filled with smoky beef and veggies. Served with Ashwood sauce.',
      image: '/images/menu-items/Ember-Rolls.png',
      category: 'light'
    },
    {
      id: 'firecorn',
      name: 'Firecorn',
      price: 4,
      description: 'Charred street corn with chili, lime crema, and togarashi. A Tokyo street fair in a cup.',
      image: '/images/menu-items/firecorn.png',
      category: 'light',
      vegetarian: true,
      spicyLevel: 1
    },
    {
      id: 'neon_fries',
      name: 'Neon Fries',
      price: 6,
      description: 'Crispy garlic butter fries topped with Lava Kiss, Ghost Silk, and fried garlic chips.',
      image: '/images/menu-items/neon-fries.png',
      category: 'light',
      vegetarian: true
    },
    
    // Wings
    {
      id: 'dragon_wings',
      name: 'Dragon Wings',
      price: 9,
      unit: '6 pieces',
      largePrice: 17,
      largeUnit: '12 pieces',
      description: 'Crispy chicken wings tossed in Lava Kiss and red chili glaze. Bold heat and sticky sweet.',
      image: '/images/menu-items/Dragon-Wings.png',
      category: 'wings',
      spicyLevel: 2
    },
    {
      id: 'smoked_wings',
      name: 'Smoked Wings',
      price: 9,
      unit: '6 pieces',
      largePrice: 17,
      largeUnit: '12 pieces',
      description: 'House-smoked chicken wings, charred and finished with your choice of GlowDrip sauce.',
      image: '/images/menu-items/Pick-Your-Sauce-Wings.png',
      requiresSauce: true,
      category: 'wings'
    },
    {
      id: 'glow_wings',
      name: 'Glow Wings',
      price: 9,
      unit: '6 pieces',
      largePrice: 17,
      largeUnit: '12 pieces',
      description: 'Crispy wings with your pick of any 2 GlowDrip sauces. Mix and match your heat.',
      image: '/images/menu-items/Pick-Your-Sauce-Glow-Wings.png',
      requiresSauce: true,
      sauceCount: 2,
      category: 'wings'
    }
  ],
  
  signatureBowls: [
    {
      id: 'glowbachi_bowl',
      name: 'The GlowBachi Bowl',
      smallPrice: 12,
      largePrice: 15,
      protein: 'Smoked Teriyaki Steak',
      description: 'Smoked teriyaki steak over fried rice with grilled vegetables. Pure umami. The bowl that started it all.',
      image: '/images/menu-items/GlowBachi-Bowl.png',
      bestseller: true
    },
    {
      id: 'aurora_bowl',
      name: 'Aurora Bowl',
      smallPrice: 11,
      largePrice: 14,
      protein: 'Teppanyaki Chicken',
      description: 'Teppanyaki chicken with fresh ginger glaze over fried rice with grilled vegetables. Bright, aromatic, and clean.',
      image: '/images/menu-items/Aurora-Bowl.png'
    },
    {
      id: 'smoke_signal',
      name: 'Smoke Signal',
      smallPrice: 13,
      largePrice: 16,
      protein: 'Smoked Ribeye',
      description: 'Smoked ribeye with Japanese BBQ glaze, fried garlic, and charred scallions over fried rice. Bold and unapologetic.',
      image: '/images/menu-items/Smoke-Signal.png'
    },
    {
      id: 'afterglow',
      name: 'Afterglow',
      smallPrice: 14,
      largePrice: 17,
      protein: 'Salmon & Shrimp',
      description: 'Teppanyaki salmon and garlic shrimp with miso glaze over fried rice and grilled vegetables. Ocean meets mountain.',
      image: '/images/menu-items/Afterglow.png'
    },
    {
      id: 'driftwater',
      name: 'Driftwater',
      smallPrice: 14,
      largePrice: 17,
      protein: 'Crispy Spicy Tuna',
      description: 'Crispy spicy tuna over sushi rice with cucumber, avocado, wasabi aioli, and grilled vegetables. Cool heat.',
      image: '/images/menu-items/Driftwater.png',
      spicyLevel: 2
    },
    {
      id: 'bone_blaze',
      name: 'Bone Blaze',
      smallPrice: 15,
      largePrice: 18,
      protein: 'Smoked Beef Short Rib',
      description: 'Smoked beef short rib with gochujang glaze over kimchi fried rice and grilled vegetables. Sweet, spicy, unforgettable.',
      image: '/images/menu-items/Bone-Blaze.png',
      spicyLevel: 3
    },
    {
      id: 'veggie_glow_bowl',
      name: 'Veggie Glow Bowl',
      smallPrice: 11,
      largePrice: 14,
      protein: 'Seasonal Vegetables',
      description: 'Crispy rice, grilled vegetables, edamame, avocado, and your choice of sauce. Charred. Fresh. Umami.',
      image: '/images/menu-items/veggie-glow-bowl.png',
      vegetarian: true
    },
    {
      id: 'ember_rush',
      name: 'Ember Rush',
      price: 14,
      protein: 'Teppanyaki Chicken',
      description: 'Teppanyaki chicken, fried rice, avocado, edamame, Lava Kiss, and scallion threads.',
      flavor: 'Smoky · Bright · Bold',
      image: '/images/menu-items/ember-rush.png'
    },
    {
      id: 'black_star',
      name: 'Black Star',
      price: 16,
      protein: 'Smoked Steak',
      description: 'Smoked steak, crispy garlic rice, grilled onion, pickled radish, Ghost Silk sauce.',
      flavor: 'Charred · Umami · Deep',
      image: '/images/menu-items/black-star.png'
    },
    {
      id: 'sun_drifter',
      name: 'Sun Drifter',
      price: 13,
      protein: 'Shrimp Tempura',
      description: 'Shrimp tempura, rice, fire-roasted corn, slaw, Sugar Char drizzle.',
      flavor: 'Sweet · Crunchy · Coastal',
      image: '/images/menu-items/sun-drifter.png'
    },
    {
      id: 'jade_vein',
      name: 'Jade Vein',
      price: 12,
      protein: 'Tofu',
      description: 'Tofu, crispy rice, grilled greens, wilted spinach, Stone Bloom.',
      flavor: 'Clean · Herbal · Earthy',
      image: '/images/menu-items/jade-vein.png',
      vegetarian: true
    }
  ],
  
  buildYourOwn: {
    title: 'Build Your Bowl',
    pricing: {
      small: 11,
      large: 14
    },
    bases: [
      { id: 'fried_rice', name: 'Fried Rice', included: true },
      { id: 'jasmine_rice', name: 'Jasmine Rice', included: true },
      { id: 'sushi_rice', name: 'Sushi Rice', included: true },
      { id: 'white_rice', name: 'White Rice', included: true },
      { id: 'crispy_rice', name: 'Crispy Rice', upcharge: 1 },
      { id: 'garlic_noodles', name: 'Garlic Noodles', upcharge: 2 }
    ],
    proteins: [
      { id: 'teppanyaki_chicken', name: 'Teppanyaki Chicken', included: true },
      { id: 'garlic_shrimp', name: 'Garlic Shrimp', included: true },
      { id: 'crispy_tofu', name: 'Crispy Tofu', included: true, vegetarian: true },
      { id: 'teppanyaki_salmon', name: 'Teppanyaki Salmon', upcharge: 2 },
      { id: 'smoked_ribeye', name: 'Smoked Ribeye', upcharge: 3 },
      { id: 'smoked_beef_rib', name: 'Smoked Beef Rib', upcharge: 4 },
      { id: 'smoked_brisket', name: 'Smoked Brisket', upcharge: 3 },
      { id: 'spicy_tuna', name: 'Spicy Tuna', upcharge: 3 }
    ],
    vegetables: [
      'Grilled Vegetables', 'Fire-Roasted Corn', 'Edamame', 
      'Avocado', 'Pickled Radish', 'Scallion Threads'
    ],
    sauces: 'Choose any GlowDrip sauce'
  },
  
  sauces: [
    {
      id: 'lava_kiss',
      name: 'Lava Kiss',
      description: 'Creamy spicy house sauce',
      details: 'Sriracha, mayo, garlic, lemon',
      personality: 'Neon Fox – Flirty, spicy, confident',
      image: '/images/menu-items/glow-bachi-sauces/lava-kiss.png',
      spicyLevel: 2,
      retailPrice: 7
    },
    {
      id: 'ashwood',
      name: 'Ashwood',
      description: 'Rich ginger-soy depth',
      details: 'Soy sauce, ginger, sesame oil, garlic',
      personality: 'Neon Bear – Stoic, smoky, grounded',
      image: '/images/menu-items/glow-bachi-sauces/ashwood.png',
      retailPrice: 7
    },
    {
      id: 'sugar_char',
      name: 'Sugar Char',
      description: 'Thick teriyaki glaze',
      details: 'Soy, brown sugar, mirin, toasted sesame',
      personality: 'Neon Raccoon – Sneaky, sweet, sticky',
      image: '/images/menu-items/glow-bachi-sauces/sugar-char.png',
      retailPrice: 7
    },
    {
      id: 'first_light',
      name: 'First Light',
      description: 'Chili-lime citrus zing',
      details: 'Fresh lime, chili flakes, garlic, rice vinegar',
      personality: 'Neon Rooster – Bright, bold, zesty',
      image: '/images/menu-items/glow-bachi-sauces/first-light.png',
      spicyLevel: 1,
      retailPrice: 7
    },
    {
      id: 'stone_bloom',
      name: 'Stone Bloom',
      description: 'Bright cilantro-mint herb',
      details: 'Cilantro, mint, lime, jalapeño, olive oil',
      personality: 'Neon Lizard – Fresh, herbal, lifted',
      image: '/images/menu-items/glow-bachi-sauces/stone-bloom.png',
      retailPrice: 7
    },
    {
      id: 'redshift',
      name: 'Redshift',
      description: 'Sweet & spicy gochujang glaze',
      details: 'Gochujang, garlic, soy, honey',
      personality: 'Neon Dragon – Fermented, bold, cosmic',
      image: '/images/menu-items/glow-bachi-sauces/redshift.png',
      spicyLevel: 3,
      retailPrice: 7
    },
    {
      id: 'ghost_silk',
      name: 'Ghost Silk',
      description: 'Miso garlic butter',
      details: 'White miso, garlic, butter, soy',
      personality: 'Neon Owl – Savory, buttery, deep',
      image: '/images/menu-items/glow-bachi-sauces/ghost-silk.png',
      retailPrice: 7
    },
    {
      id: 'ice_veil',
      name: 'Ice Veil',
      description: 'Yuzu ponzu tang',
      details: 'Yuzu juice, soy, rice vinegar, dashi',
      personality: 'Neon Crane – Crisp, citrusy, clean',
      image: '/images/menu-items/glow-bachi-sauces/ice-veil.png',
      retailPrice: 7
    },
    {
      id: 'static_haze',
      name: 'Static Haze',
      description: 'Wasabi ranch',
      details: 'Wasabi, buttermilk, herbs, rice vinegar',
      personality: 'Neon Ram – Herby, hot, wild',
      image: '/images/menu-items/glow-bachi-sauces/static-haze.png',
      spicyLevel: 2,
      retailPrice: 7
    }
  ],
  
  addOns: {
    proteins: [
      { id: 'smoked_ribeye', name: 'Smoked Ribeye', price: 7 },
      { id: 'smoked_beef_rib', name: 'Smoked Beef Rib', price: 8 },
      { id: 'smoked_brisket', name: 'Smoked Brisket', price: 7 },
      { id: 'teppanyaki_chicken', name: 'Teppanyaki Chicken', price: 6 },
      { id: 'teppanyaki_salmon', name: 'Teppanyaki Salmon', price: 7 },
      { id: 'teppanyaki_glow_shrimp', name: 'Teppanyaki Glow Shrimp', price: 7 },
      { id: 'garlic_shrimp', name: 'Garlic Shrimp', price: 6 },
      { id: 'spicy_tuna', name: 'Spicy Tuna', price: 7 },
      { id: 'crispy_tofu', name: 'Crispy Tofu', price: 5 },
      { id: 'chicken_wings_3', name: 'Chicken Wings (3)', price: 5 }
    ],
    sides: [
      { id: 'fried_rice', name: 'Fried Rice', price: 3 },
      { id: 'jasmine_rice', name: 'Jasmine Rice', price: 3 },
      { id: 'sushi_rice', name: 'Sushi Rice', price: 3 },
      { id: 'white_rice', name: 'White Rice', price: 2 },
      { id: 'crispy_rice', name: 'Crispy Rice', price: 3 },
      { id: 'garlic_noodles', name: 'Garlic Noodles', price: 4 },
      { id: 'grilled_vegetables', name: 'Grilled Vegetables', price: 4 },
      { id: 'fire_roasted_corn', name: 'Fire-Roasted Corn', price: 3 },
      { id: 'house_slaw', name: 'House Slaw', price: 2 }
    ],
    toppings: [
      { id: 'avocado', name: 'Avocado', price: 2 },
      { id: 'pickled_radish', name: 'Pickled Radish', price: 1.50 },
      { id: 'scallion_threads', name: 'Scallion Threads', price: 1 },
      { id: 'crispy_garlic', name: 'Crispy Garlic', price: 1 },
      { id: 'chili_crunch', name: 'Chili Crunch', price: 1 },
      { id: 'miso_butter', name: 'Miso Butter', price: 1 },
      { id: 'edamame', name: 'Edamame', price: 2 },
      { id: 'fried_garlic_chips', name: 'Fried Garlic Chips', price: 1 },
      { id: 'lime_crema', name: 'Lime Crema', price: 1 },
      { id: 'all_sauces', name: 'All 9 GlowDrip Sauces', price: 1.25 }
    ]
  },
  
  sauceInfo: {
    included: 'Choose 1 included with bowls or apps.',
    additional: 'Additional sauces +$1 each.'
  }
};

// Helper function
export const isGlowBachiOpen = () => {
  const now = new Date();
  const currentHour = now.getHours() + (now.getMinutes() / 60);
  return currentHour >= 12.5 && currentHour < 21;
};
