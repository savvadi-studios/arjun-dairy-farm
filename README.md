# 🥛 Arjun Dairy Farm (అర్జున్ డెయిరీ ఫామ్)
### Official Website for Sandya Mana Telugu Ammayi (@SandyaLingam)

A modern, high-performance, fully responsive frontend website built for **Arjun Dairy Farm** — the dairy enterprise founded by Telugu content creator **Sandya Lingam** (*Sandya Mana Telugu Ammayi*, 1.05M+ YouTube Subscribers).

Designed & Engineered by **Savvadi Studios** (`savvadi.studios@gmail.com`).

---

## 🌟 Brand Highlights & Business Overview

- **Founder / Host**: Sandya Lingam
- **YouTube Channel**: [Sandya Mana Telugu Ammayi (@SandyaLingam)](https://youtube.com/@SandyaLingam) (1.05M+ Subscribers, 450+ Videos)
- **Business Address**: Mancherial Market, Near Water Tank, RP Road, Opposite Ginni Complex, Mancherial, Telangana — 504208
- **Daily Milking & Store Timings**: 
  - Morning Session: **6:00 AM – 8:30 AM**
  - Evening Session: **6:00 PM – 8:30 PM**
- **WhatsApp Orders & Hotline**: **+91 6281641447**
- **Official Inquiries**: `sandya.org@gmail.com`

---

## 🌾 Fresh Farm Products

1. **Pure Desi Cow Milk (A2 Gir)**: 100% pure, raw, and unadulterated milk delivered within hours of milking.
2. **Farm Fresh Buffalo Milk**: Thick, wholesome, and high in rich natural malai — perfect for traditional curd, coffee, and sweets.
3. **Traditional Bilona Cow Ghee**: Handcrafted using the Ayurvedic curd-churning (Bilona) method on wood fire. Granular golden texture with divine aroma.
4. **Pure Buffalo Desi Ghee**: Fragrant, snow-white granular ghee crafted from cultured farm butter.
5. **Fresh Farm Malai Paneer**: Soft, spongy, and melt-in-mouth paneer made using whole milk and natural lemon curdling.
6. **Pure Milk Kova (Palkova / Mawa)**: Traditional iron kadai slow-reduced milk sweet with subtle organic sweetness.
7. **Farm Fresh Kalakhand**: Juicy, granular, festive milk delicacy.
8. **Raw Wild Forest Honey**: 100% natural, unpasteurized honey rich in bee pollen and antioxidants.
9. **Homemade Telugu Snacks**: Crispy traditional Chekkalu & Murukulu prepared using farm butter and cold-pressed oil.

---

## 🚀 Key Website Features

- 📱 **100% Device Compatibility**:
  - Fully responsive across **Mobile phones** (iPhone, Samsung Galaxy, Pixel), **Tablets** (iPad Mini, iPad Air, Galaxy Tab), **Laptops**, and **Large 4K screens**.
  - Touch targets are minimum 48px, with smooth thumb-friendly mobile cart controls and a slide-out hamburger navigation drawer.
- 🛒 **Interactive Smart Cart**:
  - Select pack sizes/weights (e.g. 250g, 500g, 1L, 2L) with real-time price updates.
  - Persistent shopping cart saved via `localStorage`.
  - Delivery slot selection (Morning Batch, Evening Batch, Store Pickup, or Pan-India Courier).
- 💬 **Instant WhatsApp Order Dispatcher**:
  - One-click checkout generates a formatted order receipt with customer details and item breakdown directly to Sandya's WhatsApp (+91 6281641447).
- ⏰ **Live Store Hours Status**:
  - Automatically evaluates current Indian Standard Time (IST) against the 6:00–8:30 AM & PM batches to indicate whether the store is open for fresh milk collection or when the next milking batch begins.
- 🎥 **YouTube & Community Section**:
  - Showcase for Sandya's 1.05M+ subscriber milestone, embedded videos, and direct links to her daily farm vlogs and cooking channel.
- ⚡ **Zero Framework Overhead**:
  - Built with pure, semantic HTML5, modern CSS3 (Custom Properties, Flexbox, Grid), and vanilla ES6 JavaScript. Instantaneous sub-second load times without heavy bundles.

---

## 📂 Project Structure

```
arjun-dairy-farm/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for automatic Pages deployment
├── css/
│   └── styles.css            # Responsive design system & animations
├── js/
│   ├── products.js           # Complete product catalog data & variants
│   └── app.js                # Cart logic, WhatsApp generator, & store status
├── index.html                # Main semantic landing page
└── README.md                 # Project documentation
```

---

## 🌐 Deployment to GitHub Pages

1. Initialize repository and set author identity:
   ```bash
   git init
   git config user.name "Savvadi Studios"
   git config user.email "savvadi.studios@gmail.com"
   ```
2. Commit files:
   ```bash
   git add .
   git commit -m "Initial commit: Arjun Dairy Farm official responsive website"
   ```
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<USERNAME>/arjun-dairy-farm.git
   git branch -M main
   git push -u origin main
   ```
4. Enable GitHub Pages under **Repository Settings > Pages > Build and deployment > GitHub Actions**.

---

### Developed with ❤️ by Savvadi Studios
- **Developer Email**: `savvadi.studios@gmail.com`
