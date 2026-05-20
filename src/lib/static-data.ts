// Static data for Schedule I Wiki
// This file contains all the data needed for the wiki, extracted from Fandom Wiki

export interface Drug {
  name: string;
  slug: string;
  value: string;
  effect: string;
  unlockRank: string;
  description: string;
  productionProcess: string[];
  ingredients: { name: string; rank: string }[];
  bestMixes: MixRecipe[];
}

export interface MixRecipe {
  drug: string;
  ingredients: string[];
  ingredientCost: string;
  askingPrice: string;
  profit: string;
  multiplier: string;
  effects: string[];
}

export interface Ingredient {
  name: string;
  slug: string;
  price: string;
  reputationRequirement: string;
  description: string;
  baseEffect: string;
  effectReplacements: { from: string; to: string }[];
}

export interface Property {
  name: string;
  slug: string;
  price: string;
  location: string;
  size: string;
  loadingBays: string;
  employeeLimit: string;
  note: string;
}

export interface Achievement {
  name: string;
  slug: string;
  description: string;
  howToComplete: string;
}

// Helper function to create slugs
function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Drug data
export const drugs: Drug[] = [
  {
    name: 'OG Kush',
    slug: 'og-kush',
    value: '$38',
    effect: 'Calming',
    unlockRank: 'Street Rat I',
    description: 'The first available marijuana strain, unlocked right at the start of Schedule I.',
    productionProcess: ['Seed → Plant → Harvest'],
    ingredients: [{ name: 'OG Kush Seed', rank: 'Street Rat I' }],
    bestMixes: [
      {
        drug: 'OG Kush',
        ingredients: ['Mouth Wash'],
        ingredientCost: '$4',
        askingPrice: '$64',
        profit: '$60',
        multiplier: 'x0.84',
        effects: ['Anti-Gravity', 'Balding']
      },
      {
        drug: 'OG Kush',
        ingredients: ['Cuke', 'Mega Bean'],
        ingredientCost: '$9',
        askingPrice: '$84',
        profit: '$75',
        multiplier: 'x1.4',
        effects: ['Glowing', 'Cyclopean', 'Foggy']
      },
      {
        drug: 'OG Kush',
        ingredients: ['Cuke', 'Viagor', 'Mega Bean'],
        ingredientCost: '$13',
        askingPrice: '$100',
        profit: '$87',
        multiplier: 'x1.86',
        effects: ['Glowing', 'Cyclopean', 'Tropic Thunder', 'Foggy']
      },
      {
        drug: 'OG Kush',
        ingredients: ['Viagor', 'Mega Bean', 'Banana', 'Cuke'],
        ingredientCost: '$15',
        askingPrice: '$111',
        profit: '$96',
        multiplier: 'x2.16',
        effects: ['Energizing', 'Thought-Provoking', 'Tropic Thunder', 'Glowing', 'Cyclopean']
      }
    ]
  },
  {
    name: 'Sour Diesel',
    slug: 'sour-diesel',
    value: '$40',
    effect: 'Refreshing',
    unlockRank: 'Street Rat IV',
    description: 'A marijuana strain unlocked at Street Rat IV rank.',
    productionProcess: ['Seed → Plant → Harvest'],
    ingredients: [{ name: 'Sour Diesel Seed', rank: 'Street Rat IV' }],
    bestMixes: []
  },
  {
    name: 'Green Crack',
    slug: 'green-crack',
    value: '$43',
    effect: 'Energizing',
    unlockRank: 'Hoodlum II',
    description: 'A marijuana strain unlocked at Hoodlum II rank.',
    productionProcess: ['Seed → Plant → Harvest'],
    ingredients: [{ name: 'Green Crack Seed', rank: 'Hoodlum II' }],
    bestMixes: []
  },
  {
    name: 'Granddaddy Purple',
    slug: 'granddaddy-purple',
    value: '$44',
    effect: 'Sedating',
    unlockRank: 'Hoodlum IV',
    description: 'A marijuana strain unlocked at Hoodlum IV rank.',
    productionProcess: ['Seed → Plant → Harvest'],
    ingredients: [{ name: 'Granddaddy Purple Seed', rank: 'Hoodlum IV' }],
    bestMixes: []
  },
  {
    name: 'Methamphetamine',
    slug: 'methamphetamine',
    value: '$70',
    effect: 'None',
    unlockRank: 'Hoodlum I',
    description: 'The second drug in the game. Requires Chemistry Station, Lab Oven, Acid and Phosphorus.',
    productionProcess: [
      'Acid + Phosphorus + Pseudo → Chemistry Station',
      'Liquid Meth → Lab Oven'
    ],
    ingredients: [
      { name: 'Acid', rank: 'Hoodlum I' },
      { name: 'Phosphorus', rank: 'Hoodlum I' },
      { name: 'Low-Quality Pseudo', rank: 'Hoodlum I' },
      { name: 'Pseudo', rank: 'Hustler III' },
      { name: 'High-Quality Pseudo', rank: 'Bagman V' },
      { name: 'Liquid Meth', rank: 'Hoodlum I' }
    ],
    bestMixes: []
  },
  {
    name: 'Shrooms',
    slug: 'shrooms',
    value: '$100',
    effect: 'None',
    unlockRank: 'Hustler I',
    description: 'Magic Mushrooms introduced in Christmas 2025 update. Requires cool environment.',
    productionProcess: [
      'Spore Syringe + Grain Bag → Mushroom Spawn Station',
      'Shroom Spawn + Mushroom Substrate → Mushroom Bed'
    ],
    ingredients: [
      { name: 'Spore Syringe', rank: 'Hustler I' },
      { name: 'Grain Bag', rank: 'Hustler I' },
      { name: 'Mushroom Substrate', rank: 'Hustler I' },
      { name: 'Shroom Spawn', rank: 'Hustler I' }
    ],
    bestMixes: []
  },
  {
    name: 'Cocaine',
    slug: 'cocaine',
    value: '$150',
    effect: 'None',
    unlockRank: 'Enforcer I',
    description: 'The most valuable drug with the longest production process.',
    productionProcess: [
      'Coca Seed → Plant → Coca Leaf',
      'Coca Leaf + Gasoline → Cocaine Base',
      'Cocaine Base → Cook → Cocaine'
    ],
    ingredients: [
      { name: 'Coca Seed', rank: 'Enforcer I' },
      { name: 'Coca Leaf', rank: 'Enforcer I' },
      { name: 'Cocaine Base', rank: 'Enforcer I' }
    ],
    bestMixes: []
  }
];

// Ingredient data
export const ingredients: Ingredient[] = [
  {
    name: 'Cuke',
    slug: 'cuke',
    price: '$2',
    reputationRequirement: 'Street Rat I',
    description: 'A refreshing can of Cuke that leaves you feeling energized. It\'s heaven in a can.',
    baseEffect: 'Energizing',
    effectReplacements: [
      { from: 'Euphoric', to: 'Laxative' },
      { from: 'Foggy', to: 'Cyclopean' },
      { from: 'Gingeritis', to: 'Thought-Provoking' },
      { from: 'Munchies', to: 'Athletic' },
      { from: 'Slippery', to: 'Munchies' },
      { from: 'Sneaky', to: 'Paranoia' },
      { from: 'Toxic', to: 'Euphoric' }
    ]
  },
  {
    name: 'Banana',
    slug: 'banana',
    price: '$2',
    reputationRequirement: 'Street Rat I',
    description: 'Elongated yellow fruit, rich in potassium.',
    baseEffect: 'Gingeritis',
    effectReplacements: [
      { from: 'Calming', to: 'Sneaky' },
      { from: 'Cyclopean', to: 'Thought-Provoking' },
      { from: 'Disorienting', to: 'Focused' },
      { from: 'Energizing', to: 'Thought-Provoking' },
      { from: 'Focused', to: 'Seizure-Inducing' },
      { from: 'Long Faced', to: 'Refreshing' },
      { from: 'Paranoia', to: 'Jennerising' },
      { from: 'Smelly', to: 'Anti-Gravity' },
      { from: 'Toxic', to: 'Smelly' }
    ]
  },
  {
    name: 'Paracetamol',
    slug: 'paracetamol',
    price: '$3',
    reputationRequirement: 'Street Rat I',
    description: 'Mild over-the-counter painkiller.',
    baseEffect: 'Sneaky',
    effectReplacements: [
      { from: 'Calming', to: 'Slippery' },
      { from: 'Electrifying', to: 'Athletic' },
      { from: 'Energizing', to: 'Paranoia' },
      { from: 'Focused', to: 'Gingeritis' },
      { from: 'Foggy', to: 'Calming' },
      { from: 'Glowing', to: 'Toxic' },
      { from: 'Munchies', to: 'Anti-Gravity' },
      { from: 'Paranoia', to: 'Balding' },
      { from: 'Spicy', to: 'Bright-Eyed' },
      { from: 'Toxic', to: 'Tropic Thunder' }
    ]
  },
  {
    name: 'Donut',
    slug: 'donut',
    price: '$3',
    reputationRequirement: 'Street Rat I',
    description: 'Yummy strawberry frosted donut.',
    baseEffect: 'Calorie-Dense',
    effectReplacements: [
      { from: 'Anti-Gravity', to: 'Slippery' },
      { from: 'Balding', to: 'Sneaky' },
      { from: 'Calorie-Dense', to: 'Explosive' },
      { from: 'Focused', to: 'Euphoric' },
      { from: 'Jennerising', to: 'Gingeritis' },
      { from: 'Munchies', to: 'Calming' },
      { from: 'Shrinking', to: 'Energizing' }
    ]
  },
  {
    name: 'Viagor',
    slug: 'viagor',
    price: '$4',
    reputationRequirement: 'Hoodlum II',
    description: 'Medication that is used to get you chubbed-up.',
    baseEffect: 'Tropic Thunder',
    effectReplacements: [
      { from: 'Athletic', to: 'Sneaky' },
      { from: 'Disorienting', to: 'Toxic' },
      { from: 'Euphoric', to: 'Bright-Eyed' },
      { from: 'Laxative', to: 'Calming' },
      { from: 'Shrinking', to: 'Gingeritis' }
    ]
  },
  {
    name: 'Mouth Wash',
    slug: 'mouth-wash',
    price: '$4',
    reputationRequirement: 'Hoodlum III',
    description: 'Antiseptic mouth wash for a minty fresh breath.',
    baseEffect: 'Balding',
    effectReplacements: [
      { from: 'Calming', to: 'Anti-Gravity' },
      { from: 'Calorie-Dense', to: 'Sneaky' },
      { from: 'Explosive', to: 'Sedating' },
      { from: 'Focused', to: 'Jennerising' }
    ]
  },
  {
    name: 'Flu Medicine',
    slug: 'flu-medicine',
    price: '$5',
    reputationRequirement: 'Hoodlum IV',
    description: 'Pain reliever and Mild sedative used to alleviate flu symptoms.',
    baseEffect: 'Sedating',
    effectReplacements: [
      { from: 'Athletic', to: 'Munchies' },
      { from: 'Calming', to: 'Bright-Eyed' },
      { from: 'Cyclopean', to: 'Foggy' },
      { from: 'Electrifying', to: 'Refreshing' },
      { from: 'Euphoric', to: 'Toxic' },
      { from: 'Focused', to: 'Calming' },
      { from: 'Laxative', to: 'Euphoric' },
      { from: 'Munchies', to: 'Slippery' },
      { from: 'Shrinking', to: 'Paranoia' },
      { from: 'Thought-Provoking', to: 'Gingeritis' }
    ]
  },
  {
    name: 'Gasoline',
    slug: 'gasoline',
    price: '$5',
    reputationRequirement: 'Hoodlum V',
    description: 'A jerry can full of gasoline.',
    baseEffect: 'Toxic',
    effectReplacements: [
      { from: 'Disorienting', to: 'Glowing' },
      { from: 'Electrifying', to: 'Disorienting' },
      { from: 'Energizing', to: 'Euphoric' },
      { from: 'Euphoric', to: 'Spicy' },
      { from: 'Gingeritis', to: 'Smelly' },
      { from: 'Jennerising', to: 'Sneaky' },
      { from: 'Laxative', to: 'Foggy' },
      { from: 'Munchies', to: 'Sedating' },
      { from: 'Paranoia', to: 'Calming' },
      { from: 'Shrinking', to: 'Focused' },
      { from: 'Sneaky', to: 'Tropic Thunder' }
    ]
  },
  {
    name: 'Energy Drink',
    slug: 'energy-drink',
    price: '$5',
    reputationRequirement: 'Hoodlum V',
    description: 'A can of energy drink.',
    baseEffect: 'Athletic',
    effectReplacements: [
      { from: 'Balding', to: 'Anti-Gravity' },
      { from: 'Calming', to: 'Energizing' },
      { from: 'Focused', to: 'Shrinking' },
      { from: 'Foggy', to: 'Laxative' },
      { from: 'Glowing', to: 'Disorienting' },
      { from: 'Munchies', to: 'Athletic' },
      { from: 'Slippery', to: 'Munchies' },
      { from: 'Sneaky', to: 'Calming' }
    ]
  },
  {
    name: 'Mega Bean',
    slug: 'mega-bean',
    price: '$7',
    reputationRequirement: 'Hustler II',
    description: 'A large magical bean.',
    baseEffect: 'Foggy',
    effectReplacements: [
      { from: 'Athletic', to: 'Laxative' },
      { from: 'Calming', to: 'Glowing' },
      { from: 'Energizing', to: 'Cyclopean' },
      { from: 'Focused', to: 'Disorienting' },
      { from: 'Jennerising', to: 'Paranoia' },
      { from: 'Munchies', to: 'Sedating' },
      { from: 'Slippery', to: 'Toxic' },
      { from: 'Sneaky', to: 'Glowing' }
    ]
  },
  {
    name: 'Horse Semen',
    slug: 'horse-semen',
    price: '$9',
    reputationRequirement: 'Hustler III',
    description: 'A bottle of horse semen.',
    baseEffect: 'Long Faced',
    effectReplacements: [
      { from: 'Anti-Gravity', to: 'Calming' },
      { from: 'Calming', to: 'Gingeritis' },
      { from: 'Electrifying', to: 'Euphoric' },
      { from: 'Foggy', to: 'Tropic Thunder' },
      { from: 'Glowing', to: 'Refreshing' }
    ]
  },
  {
    name: 'Battery',
    slug: 'battery',
    price: '$10',
    reputationRequirement: 'Hustler IV',
    description: 'A car battery.',
    baseEffect: 'Electrifying',
    effectReplacements: [
      { from: 'Calming', to: 'Bright-Eyed' },
      { from: 'Euphoric', to: 'Zombifying' },
      { from: 'Laxative', to: 'Calming' },
      { from: 'Munchies', to: 'Tropic Thunder' },
      { from: 'Slippery', to: 'Euphoric' }
    ]
  },
  {
    name: 'Iodine',
    slug: 'iodine',
    price: '$11',
    reputationRequirement: 'Bagman I',
    description: 'A bottle of iodine.',
    baseEffect: 'Jennerising',
    effectReplacements: [
      { from: 'Calming', to: 'Balding' },
      { from: 'Euphoric', to: 'Focused' },
      { from: 'Foggy', to: 'Paranoia' },
      { from: 'Munchies', to: 'Anti-Gravity' },
      { from: 'Sneaky', to: 'Gingeritis' }
    ]
  },
  {
    name: 'Addy',
    slug: 'addy',
    price: '$12',
    reputationRequirement: 'Bagman II',
    description: 'Adderall medication.',
    baseEffect: 'Thought-Provoking',
    effectReplacements: [
      { from: 'Electrifying', to: 'Euphoric' },
      { from: 'Foggy', to: 'Energizing' },
      { from: 'Glowing', to: 'Refreshing' },
      { from: 'Sedating', to: 'Gingeritis' }
    ]
  },
  {
    name: 'Chili',
    slug: 'chili',
    price: '$13',
    reputationRequirement: 'Bagman III',
    description: 'A hot chili pepper.',
    baseEffect: 'Spicy',
    effectReplacements: [
      { from: 'Anti-Gravity', to: 'Tropic Thunder' },
      { from: 'Athletic', to: 'Euphoric' },
      { from: 'Calming', to: 'Bright-Eyed' },
      { from: 'Focused', to: 'Refreshing' },
      { from: 'Gingeritis', to: 'Energizing' },
      { from: 'Munchies', to: 'Toxic' },
      { from: 'Sneaky', to: 'Glowing' }
    ]
  },
  {
    name: 'Motor Oil',
    slug: 'motor-oil',
    price: '$14',
    reputationRequirement: 'Bagman IV',
    description: 'A bottle of motor oil.',
    baseEffect: 'Slippery',
    effectReplacements: [
      { from: 'Calming', to: 'Anti-Gravity' },
      { from: 'Energizing', to: 'Munchies' },
      { from: 'Euphoric', to: 'Sedating' },
      { from: 'Focused', to: 'Calming' },
      { from: 'Foggy', to: 'Toxic' },
      { from: 'Munchies', to: 'Schizophrenic' },
      { from: 'Paranoia', to: 'Anti-Gravity' }
    ]
  },
  {
    name: 'Warheads',
    slug: 'warheads',
    price: '$20',
    reputationRequirement: 'Enforcer I',
    description: 'Sour candy.',
    baseEffect: 'Bright-Eyed',
    effectReplacements: [
      { from: 'Calming', to: 'Refreshing' },
      { from: 'Energizing', to: 'Euphoric' },
      { from: 'Foggy', to: 'Glowing' },
      { from: 'Gingeritis', to: 'Thought-Provoking' },
      { from: 'Munchies', to: 'Tropic Thunder' }
    ]
  },
  {
    name: 'Phencyclidine',
    slug: 'phencyclidine',
    price: '$25',
    reputationRequirement: 'Enforcer II',
    description: 'PCP drug.',
    baseEffect: 'Glowing',
    effectReplacements: [
      { from: 'Athletic', to: 'Euphoric' },
      { from: 'Calming', to: 'Foggy' },
      { from: 'Energizing', to: 'Zombifying' },
      { from: 'Focused', to: 'Euphoric' },
      { from: 'Laxative', to: 'Foggy' },
      { from: 'Munchies', to: 'Toxic' },
      { from: 'Sneaky', to: 'Paranoia' }
    ]
  },
  {
    name: 'Viagra',
    slug: 'viagra',
    price: '$30',
    reputationRequirement: 'Enforcer III',
    description: 'Viagra medication.',
    baseEffect: 'Tropic Thunder',
    effectReplacements: [
      { from: 'Athletic', to: 'Sneaky' },
      { from: 'Disorienting', to: 'Toxic' },
      { from: 'Euphoric', to: 'Bright-Eyed' },
      { from: 'Laxative', to: 'Calming' },
      { from: 'Shrinking', to: 'Gingeritis' }
    ]
  }
];

// Property data
export const properties: Property[] = [
  {
    name: 'RV',
    slug: 'rv',
    price: 'Free',
    location: 'Woods, South-West',
    size: '32 tiles',
    loadingBays: '0',
    employeeLimit: '0',
    note: 'The RV is only temporary and will become inaccessible after collecting the 3 cash dead drops at the beginning of the game.'
  },
  {
    name: 'Maintenance Office',
    slug: 'maintenance-office',
    price: 'Free',
    location: 'The Sewers',
    size: '179 tiles',
    loadingBays: '0',
    employeeLimit: '0',
    note: 'This property can grow Shrooms without an AC Unit.'
  },
  {
    name: 'Sweatshop',
    slug: 'sweatshop',
    price: '$600',
    location: 'Northtown',
    size: '120 tiles',
    loadingBays: '0',
    employeeLimit: '0',
    note: 'First purchasable property.'
  },
  {
    name: 'Barn',
    slug: 'barn',
    price: '$3,000',
    location: 'Westville',
    size: '200 tiles',
    loadingBays: '1',
    employeeLimit: '0',
    note: 'Good mid-game property with loading bay.'
  },
  {
    name: 'Bungalow',
    slug: 'bungalow',
    price: '$6,000',
    location: 'Northtown',
    size: '150 tiles',
    loadingBays: '1',
    employeeLimit: '0',
    note: 'Residential property with loading bay.'
  },
  {
    name: 'Docks Warehouse',
    slug: 'docks-warehouse',
    price: '$15,000',
    location: 'Docks',
    size: '300 tiles',
    loadingBays: '2',
    employeeLimit: '4',
    note: 'Large warehouse with employee capacity.'
  },
  {
    name: 'Manor',
    slug: 'manor',
    price: '$50,000',
    location: 'Uptown',
    size: '500 tiles',
    loadingBays: '3',
    employeeLimit: '8',
    note: 'End-game property with maximum capacity.'
  }
];

// Achievement data
export const achievements: Achievement[] = [
  {
    name: 'Welcome to Hyland Point',
    slug: 'welcome-to-hyland-point',
    description: 'Encounter an unexpected setback.',
    howToComplete: 'Complete the "Welcome to Hyland Point" tasks in your journal.'
  },
  {
    name: 'Master Chef',
    slug: 'master-chef',
    description: 'Manufacture a product worth at least $100.',
    howToComplete: 'Finish mixing a Product that\'s worth a minimum of $100.'
  },
  {
    name: 'Dodgy Dealing',
    slug: 'dodgy-dealing',
    description: 'Recruit your first dealer.',
    howToComplete: 'Recruit a dealer for the first time. Benji is the first dealer you\'ll be able to hire. Keep selling your products, and you\'ll eventually get a call from Uncle Nelson about hiring Benji. You can find him in Motel Room 2, and he costs $500 to hire.'
  },
  {
    name: 'Left in the Dust',
    slug: 'left-in-the-dust',
    description: 'Complete the prologue.',
    howToComplete: 'Finish the game\'s prologue.'
  },
  {
    name: 'The Long Arm of the Law',
    slug: 'the-long-arm-of-the-law',
    description: 'Get arrested.',
    howToComplete: 'Get arrested by the Police for whatever shady things you may or may not be doing.'
  },
  {
    name: 'Indian Dealer',
    slug: 'indian-dealer',
    description: 'Sell something to a customer, then pickpocket it back.',
    howToComplete: 'After selling your goods to a customer, you need to play the Pickpocketing mini-game to steal the item back from them.'
  },
  {
    name: 'Rolling in Style',
    slug: 'rolling-in-style',
    description: 'Purchase a golden skateboard.',
    howToComplete: 'Buy yourself a Golden Skateboard from Shred Shack near the Hardware store for $1,500.'
  },
  {
    name: 'Businessman',
    slug: 'businessman',
    description: 'Attain a net worth of $100,000.',
    howToComplete: 'Have cash and inventory worth a total of $100,000.'
  },
  {
    name: 'Upstanding Citizen',
    slug: 'upstanding-citizen',
    description: 'Dispose of 500 pieces of trash at the Cash for Trash machines.',
    howToComplete: 'While playing, head to any of the Cash for Trash machines in the game and throw away a total of 500 pieces of trash.'
  },
  {
    name: 'Bigwig',
    slug: 'bigwig',
    description: 'Attain a net worth of $1,000,000.',
    howToComplete: 'Have cash and inventory worth a total of $1,000,000.'
  },
  {
    name: 'Magnate',
    slug: 'magnate',
    description: 'Attain a net worth of $10,000,000.',
    howToComplete: 'Have cash and inventory worth a total of $10,000,000.'
  },
  {
    name: 'Urban Artist',
    slug: 'urban-artist',
    description: 'Graffiti 25 surfaces in a single save.',
    howToComplete: 'Buy 25 graffiti cans from the gas mart for $250 total, Start graffitiing everywhere.'
  },
  {
    name: 'Finishing the Job',
    slug: 'finishing-the-job',
    description: 'Taking down the cartel.',
    howToComplete: 'To take down the cartel, you must choose to go hostile with the cartel and unlock Uptown. After unlocking the Uptown region and progressing to the next day, you will get a quest named "Finishing the Job". For this quest to start, you will have to talk to Uncle Nelson at a payphone. Uncle Nelson will tell you to get RDX from Billy Kramer, Talk to Sam Thompson to dig a tunnel under the Hyland Manor, and give the RDX to Stan Carney so he could turn the RDX into a bomb. To get the RDX, you must give 20x Moderate quality cocaine to Billy in packaged form. After that, you can pay Sam 10,000 dollars in cash to dig a tunnel overnight. Then, you must talk to Stan so you could obtain the final item you need, which is the bomb. Stan will tell you to kill the person who keeps stealing supplies from his shipping container. The person, named "Stranger" in game, will come out of the building with weed graffiti located in Docks at night. Once you kill him, Stan will turn the RDX into a bomb. After obtaining the bomb and getting Sam to dig a tunnel under the manor, you can now go into the tunnel to rig the bomb. After the bomb blows up the manor, you get this achievement.'
  }
];

// Helper functions
export function getDrug(slug: string): Drug | undefined {
  return drugs.find(d => d.slug === slug);
}

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find(i => i.slug === slug);
}

export function getProperty(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug);
}

export function getAchievement(slug: string): Achievement | undefined {
  return achievements.find(a => a.slug === slug);
}
