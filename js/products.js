// Arjun Dairy Farm - Premium Product Catalog Data
// 100% Pure, Organic & Farm-Fresh Dairy Products

const PRODUCTS = [
  {
    id: "cow-milk",
    name: "Pure Desi Cow Milk (A2 Gir)",
    teluguName: "స్వచ్ఛమైన నాటు ఆవు పాలు",
    category: "milk",
    categoryLabel: "Fresh Milk",
    tag: "Farm Fresh Daily",
    badge: "100% Raw & Pure",
    isBestseller: true,
    description: "Raw, unpasteurized, and unadulterated Desi Cow milk delivered directly within 3 hours of morning & evening milking. Naturally rich in A2 beta-casein, calcium, and delicate natural sweetness.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 240,
    shelfLife: "Boil immediately; consume within 24-48 hours refrigerated",
    ingredients: "100% Pure Raw Desi Cow Milk (No water, no milk powder, no preservatives)",
    nutrition: {
      calories: "65 kcal / 100ml",
      protein: "3.4g",
      fat: "4.2% natural fat",
      calcium: "125 mg"
    },
    variants: [
      { size: "500 ml", price: 40 },
      { size: "1 Litre", price: 75 },
      { size: "2 Litres", price: 145 }
    ],
    features: [
      "Naturally grass-fed indigenous cows",
      "Zero oxytocin, antibiotics, or hormones",
      "Delivered in sanitized containers",
      "Forms thick golden malai (cream) on boiling"
    ]
  },
  {
    id: "buffalo-milk",
    name: "Farm Fresh Buffalo Milk",
    teluguName: "స్వచ్ఛమైన గేదె పాలు",
    category: "milk",
    categoryLabel: "Fresh Milk",
    tag: "Thick & Creamy",
    badge: "High Cream Malai",
    isBestseller: true,
    description: "Rich, dense, and full-cream buffalo milk collected from healthy Murrah buffaloes. The ultimate choice for thick set curd (perugu), traditional filter coffee, and rich homemade sweets.",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 310,
    shelfLife: "Boil immediately; keep refrigerated up to 48 hours",
    ingredients: "100% Whole Raw Buffalo Milk",
    nutrition: {
      calories: "98 kcal / 100ml",
      protein: "4.1g",
      fat: "7.0% natural butterfat",
      calcium: "190 mg"
    },
    variants: [
      { size: "500 ml", price: 45 },
      { size: "1 Litre", price: 85 },
      { size: "2 Litres", price: 165 }
    ],
    features: [
      "Natural thick malai formation",
      "Perfect for thick creamy curd & tea",
      "High natural calcium & phosphorus",
      "No artificial homogenization"
    ]
  },
  {
    id: "bilona-cow-ghee",
    name: "Traditional Bilona Desi Cow Ghee",
    teluguName: "సాంప్రదాయ బిలోనా ఆవు నెయ్యి",
    category: "ghee",
    categoryLabel: "Desi Ghee",
    tag: "Vedic Bilona Churned",
    badge: "Golden Danedaar",
    isBestseller: true,
    description: "Handcrafted using the ancient Ayurvedic 5-step Bilona method: Whole milk is cultured into curd, churned with wooden churners to extract makkhan (butter), and slow-simmered on mild fire into aromatic golden granular ghee.",
    image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 520,
    shelfLife: "12 Months (Store in a cool, dry place away from moisture)",
    ingredients: "100% Cultured Desi Cow Milk Butterfat",
    nutrition: {
      calories: "120 kcal / tbsp (14g)",
      protein: "0g (Lactose & Casein free)",
      fat: "14g healthy fatty acids (Omega-3 & CLA)",
      vitaminA: "Rich in Vitamin A, D, E & K"
    },
    variants: [
      { size: "250 ml", price: 390 },
      { size: "500 ml", price: 750 },
      { size: "1 Litre", price: 1450 }
    ],
    features: [
      "Ancient Vedic Bilona curd-churned process",
      "Granular (Danedaar) texture with divine aroma",
      "Easy to digest, supports gut health & immunity",
      "Safe for lactose-sensitive individuals",
      "Pan-India courier shipping available"
    ]
  },
  {
    id: "buffalo-ghee",
    name: "Pure Buffalo Desi Ghee",
    teluguName: "స్వచ్ఛమైన గేదె నెయ్యి",
    category: "ghee",
    categoryLabel: "Desi Ghee",
    tag: "Authentic Flavor",
    badge: "Snowy White Grain",
    isBestseller: false,
    description: "Traditional buffalo ghee made from cultured fresh farm cream. Exhibits snow-white granular grains with an irresistible rustic aroma that enhances rice, pappu, sambar, and biryani.",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 190,
    shelfLife: "12 Months in airtight glass container",
    ingredients: "100% Pure Cultured Buffalo Butterfat",
    nutrition: {
      calories: "125 kcal / tbsp",
      protein: "0g",
      fat: "14g",
      minerals: "Natural minerals & essential fatty acids"
    },
    variants: [
      { size: "250 ml", price: 360 },
      { size: "500 ml", price: 700 },
      { size: "1 Litre", price: 1350 }
    ],
    features: [
      "Traditional slow-fire boiling",
      "Rich rustic aroma & granular texture",
      "Zero chemicals, artificial essence, or preservatives",
      "Pan-India courier shipping available"
    ]
  },
  {
    id: "malai-paneer",
    name: "Fresh Farm Malai Paneer",
    teluguName: "తాజా మలై పన్నీర్",
    category: "paneer-sweets",
    categoryLabel: "Paneer & Sweets",
    tag: "Super Soft & Spongy",
    badge: "Zero Cornstarch",
    isBestseller: true,
    description: "Crafted fresh every single morning using 100% pure whole farm milk and curdled with natural lemon. Velvety soft, melt-in-mouth texture without any artificial stabilizers or rubbery texture.",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 180,
    shelfLife: "3 to 4 days refrigerated in cold water",
    ingredients: "100% Whole Farm Milk, Natural Lemon Juice",
    nutrition: {
      calories: "280 kcal / 100g",
      protein: "18.5g high-quality protein",
      fat: "22g healthy milk fat",
      calcium: "450 mg"
    },
    variants: [
      { size: "250 grams", price: 140 },
      { size: "500 grams", price: 260 },
      { size: "1 Kg", price: 500 }
    ],
    features: [
      "Made fresh every morning",
      "Zero starch, palm oil, or vegetable fat",
      "High protein for fitness & growing kids",
      "Absorbs spices wonderfully in curries"
    ]
  },
  {
    id: "pure-kova",
    name: "Pure Milk Kova (Palkova / Mawa)",
    teluguName: "స్వచ్ఛమైన పాల కోవా",
    category: "paneer-sweets",
    categoryLabel: "Paneer & Sweets",
    tag: "Wood-Fired Kadai",
    badge: "Melt In Mouth",
    isBestseller: true,
    description: "Traditional Telugu sweet made by simmering pure farm milk in heavy iron kadai for over 4 hours until it thickens into rich, caramelized, creamy kova with a touch of organic sugar.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewsCount: 340,
    shelfLife: "10-14 days refrigerated",
    ingredients: "Pure Whole Farm Milk, Organic Sugar, Cardamom",
    nutrition: {
      calories: "380 kcal / 100g",
      protein: "12g",
      fat: "19g",
      carbs: "38g"
    },
    variants: [
      { size: "250 grams", price: 190 },
      { size: "500 grams", price: 360 },
      { size: "1 Kg", price: 700 }
    ],
    features: [
      "100% farm milk reduction with zero artificial additives",
      "Slow-cooked in iron vessels for authentic taste",
      "Ideal for festivals, pujas, and gifting",
      "Pan-India courier shipping available"
    ]
  },
  {
    id: "kalakhand",
    name: "Farm Fresh Kalakhand",
    teluguName: "తాజా కళాఖండ్",
    category: "paneer-sweets",
    categoryLabel: "Paneer & Sweets",
    tag: "Festive Favorite",
    badge: "Juicy & Granular",
    isBestseller: false,
    description: "Moist, granular, and juicy milk fudge prepared using fresh malai paneer and thickened milk, subtly flavored with aromatic cardamom and garnished with slivered dry fruits.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 125,
    shelfLife: "7-10 days refrigerated",
    ingredients: "Fresh Paneer, Farm Milk, Sugar, Elaichi (Cardamom), Pistachios",
    nutrition: {
      calories: "340 kcal / 100g",
      protein: "11g",
      fat: "16g",
      calcium: "320 mg"
    },
    variants: [
      { size: "250 grams", price: 210 },
      { size: "500 grams", price: 400 },
      { size: "1 Kg", price: 780 }
    ],
    features: [
      "Granular melt-in-the-mouth texture",
      "Pure milk and paneer base",
      "No artificial flavor or food colors",
      "Courier shipping available"
    ]
  },
  {
    id: "wild-honey",
    name: "Raw Forest Wild Honey",
    teluguName: "స్వచ్ఛమైన అడవి తేనె",
    category: "honey-snacks",
    categoryLabel: "Honey & Snacks",
    tag: "100% Unfiltered Nectar",
    badge: "Raw & Pure",
    isBestseller: false,
    description: "Cold-extracted, unheated, and unfiltered raw honey gathered from wild forest flora. Naturally preserves active bee pollen, beneficial enzymes, and natural antibacterial properties.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 160,
    shelfLife: "24+ Months (Natural honey never spoils)",
    ingredients: "100% Raw Forest Honey (Zero sugar syrup, zero glucose)",
    nutrition: {
      calories: "64 kcal / tbsp (21g)",
      protein: "0.1g",
      carbs: "17g (natural fructose & glucose)",
      enzymes: "Active invertase & catalase"
    },
    variants: [
      { size: "350 grams", price: 350 },
      { size: "700 grams", price: 650 }
    ],
    features: [
      "Never heated above hive temperature",
      "Rich in natural bee pollen & propolis",
      "Zero added sugar, corn syrup, or preservatives",
      "Pan-India courier shipping available"
    ]
  },
  {
    id: "telugu-snacks",
    name: "Homemade Telugu Chekkalu & Murukulu",
    teluguName: "ఇంటి సాంప్రదాయ చెక్కలు & మురుకులు",
    category: "honey-snacks",
    categoryLabel: "Honey & Snacks",
    tag: "Authentic Crunch",
    badge: "Cold-Pressed Oil",
    isBestseller: false,
    description: "Crispy, savory traditional Telugu delicacies made with rice flour, chana dal, sesame seeds, fresh farm butter, and roasted cumin, fried gently in pure cold-pressed groundnut oil.",
    image: "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewsCount: 110,
    shelfLife: "45 Days in airtight container",
    ingredients: "Rice Flour, Farm Butter, Sesame, Cumin, Red Chili, Cold-Pressed Oil, Salt",
    nutrition: {
      calories: "140 kcal / 30g serving",
      protein: "3g",
      fat: "7g (Heart-healthy cold-pressed oil)",
      fiber: "2g"
    },
    variants: [
      { size: "250 grams", price: 150 },
      { size: "500 grams", price: 280 }
    ],
    features: [
      "Zero palm oil or reused frying oil",
      "Flavored with farm butter and roasted spices",
      "Super crisp, light, and addictive snack",
      "Fresh batch made weekly"
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS };
}
