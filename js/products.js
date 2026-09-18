// Arjun Dairy Farm - Official Product Catalog Data
// Produced & Nurtured by Sandya Lingam (Sandya Mana Telugu Ammayi)
// Location: Mancherial Market, Near Water Tank, RP Road, Mancherial, Telangana

const PRODUCTS = [
  {
    id: "cow-milk",
    name: "Pure Desi Cow Milk (A2 Gir)",
    teluguName: "స్వచ్ఛమైన నాటు ఆవు పాలు",
    category: "milk",
    categoryLabel: "Fresh Milk",
    tag: "Farm Fresh Daily",
    isBestseller: true,
    description: "100% pure, raw, and unadulterated Desi Cow milk. Farm fresh delivered twice daily. Rich in A2 beta-casein, minerals, and natural sweetness.",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 142,
    variants: [
      { size: "500 ml", price: 40 },
      { size: "1 Litre", price: 75 },
      { size: "2 Litres", price: 145 }
    ],
    features: ["Grass-fed Desi Cows", "Zero Chemicals / Preservatives", "Delivered within 3 hours of milking", "Daily Morning & Evening"]
  },
  {
    id: "buffalo-milk",
    name: "Farm Fresh Buffalo Milk",
    teluguName: "స్వచ్ఛమైన గేదె పాలు",
    category: "milk",
    categoryLabel: "Fresh Milk",
    tag: "Thick & Creamy",
    isBestseller: true,
    description: "Rich, thick, and wholesome fresh buffalo milk. High fat content ideal for thick creamy curd (perugu), traditional filter coffee, and malai.",
    image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 198,
    variants: [
      { size: "500 ml", price: 45 },
      { size: "1 Litre", price: 85 },
      { size: "2 Litres", price: 165 }
    ],
    features: ["Thick natural malai", "High nutrition & calcium", "No hormone injections", "Best for curd & tea"]
  },
  {
    id: "bilona-cow-ghee",
    name: "Traditional Bilona Cow Ghee",
    teluguName: "సాంప్రదాయ బిలోనా ఆవు నెయ్యి",
    category: "ghee",
    categoryLabel: "Desi Ghee",
    tag: "Hand-Churned",
    isBestseller: true,
    description: "Handcrafted using the ancient Ayurvedic Bilona method — curd is churned with wooden churners and simmered slowly on mild heat. Golden granular texture with irresistible aroma.",
    image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 380,
    variants: [
      { size: "250 ml", price: 390 },
      { size: "500 ml", price: 750 },
      { size: "1 Litre", price: 1450 }
    ],
    features: ["Authentic Bilona churned", "Golden grainy 'Danedaar' texture", "Immunity booster", "Pan-India Courier Available"]
  },
  {
    id: "buffalo-ghee",
    name: "Pure Buffalo Desi Ghee",
    teluguName: "స్వచ్ఛమైన గేదె నెయ్యి",
    category: "ghee",
    categoryLabel: "Desi Ghee",
    tag: "Authentic Village Taste",
    isBestseller: false,
    description: "Pure, fragrant buffalo ghee made from fresh cultured cream. Snow-white granular texture with rich flavor, perfect for steaming hot rice, pappu, and sweets.",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 164,
    variants: [
      { size: "250 ml", price: 360 },
      { size: "500 ml", price: 700 },
      { size: "1 Litre", price: 1350 }
    ],
    features: ["Slow-boiled farm butter", "Rich nostalgic aroma", "No artificial essence", "Pan-India Courier Available"]
  },
  {
    id: "malai-paneer",
    name: "Fresh Farm Malai Paneer",
    teluguName: "తాజా మలై పన్నీర్",
    category: "sweets",
    categoryLabel: "Paneer & Sweets",
    tag: "Super Soft",
    isBestseller: true,
    description: "Crafted fresh every morning using 100% whole milk and natural lemon curdling. Ultra soft, spongy, and protein-packed with zero starch or artificial coagulants.",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 112,
    variants: [
      { size: "250 grams", price: 140 },
      { size: "500 grams", price: 260 },
      { size: "1 Kg", price: 500 }
    ],
    features: ["Made fresh daily", "No cornstarch or rubbery texture", "Melts in your mouth", "Local delivery only"]
  },
  {
    id: "pure-kova",
    name: "Pure Milk Kova (Palkova / Mawa)",
    teluguName: "స్వచ్ఛమైన పాల కోవా",
    category: "sweets",
    categoryLabel: "Paneer & Sweets",
    tag: "Traditional Treat",
    isBestseller: true,
    description: "Pure farm milk slow-cooked for hours in iron kadai until condensed into velvety, aromatic Kova with minimal organic sugar. Authentic Telugu festive sweet.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 225,
    variants: [
      { size: "250 grams", price: 190 },
      { size: "500 grams", price: 360 },
      { size: "1 Kg", price: 700 }
    ],
    features: ["100% farm milk reduction", "Traditional iron kadai slow cooked", "Preservative-free", "Pan-India Courier Available"]
  },
  {
    id: "kalakhand",
    name: "Farm Fresh Kalakhand",
    teluguName: "తాజా కళాఖండ్",
    category: "sweets",
    categoryLabel: "Paneer & Sweets",
    tag: "Festive Favorite",
    isBestseller: false,
    description: "Moist, soft, and granular sweet made from fresh paneer and condensed milk, garnished with cardamom and dry fruits.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 89,
    variants: [
      { size: "250 grams", price: 210 },
      { size: "500 grams", price: 400 },
      { size: "1 Kg", price: 780 }
    ],
    features: ["Granular texture", "Subtle cardamom aroma", "Freshly prepared every week", "Store pickup & courier"]
  },
  {
    id: "wild-honey",
    name: "Raw Wild Forest Honey",
    teluguName: "స్వచ్ఛమైన అడవి తేనె",
    category: "honey-snacks",
    categoryLabel: "Honey & Snacks",
    tag: "100% Natural",
    isBestseller: false,
    description: "Pure, unheated, and unfiltered raw honey sourced directly from local forests and farms. Packed with natural bee pollen, enzymes, and antioxidants.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 94,
    variants: [
      { size: "350 grams", price: 350 },
      { size: "700 grams", price: 650 }
    ],
    features: ["Unprocessed & unpasteurized", "Retains pollen & enzymes", "Zero added sugar or syrup", "Pan-India Courier Available"]
  },
  {
    id: "telugu-snacks",
    name: "Homemade Telugu Chekkalu & Murukulu",
    teluguName: "ఇంటి చెక్కలు & మురుకులు",
    category: "honey-snacks",
    categoryLabel: "Honey & Snacks",
    tag: "Traditional Crunch",
    isBestseller: false,
    description: "Crispy, traditional Telugu savories prepared using heirloom family recipes, fresh farm butter, cumin, sesame, and cold-pressed oil.",
    image: "https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 76,
    variants: [
      { size: "250 grams", price: 150 },
      { size: "500 grams", price: 280 }
    ],
    features: ["Cooked in cold-pressed oil", "Zero palm oil or adulterants", "Authentic Telangana village spice", "Fresh batch every week"]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS };
}
