 export const products = [
  // 💡 Trending / Decor
  {
    id: 1,
    name: "Swan Crystal LED Photo Frame",
    price: 45.99,
    categories: ["Trending", "Decor", "Gifts", "LED"],
    rating: 4.9,
    reviews: 234,
    description:
      "Elegant swan-shaped crystal LED lamp with wooden photo frame base — perfect for gifting and home decor.",
    specs: {
      material: "Crystal Swan + Wooden Base",
      power: "USB Powered",
      dimensions: "28cm x 10cm x 23cm",
      features: ["LED Light", "Photo Frame", "Gift Ready"],
    },
    images: [""], // ← Add Cloudinary URL here
    inStock: true,
    badge: "Bestseller",
  },

  // 💞 Romantic
  {
    id: 2,
    name: "Crystal Heart Photo Frame",
    price: 42.99,
    categories: ["Romantic", "Gifts", "Decor"],
    rating: 4.9,
    reviews: 312,
    description:
      "Romantic heart-shaped crystal frame with LED backlighting. Perfect for couples to showcase memories.",
    specs: {
      material: "Crystal + Metal Base",
      power: "Battery Powered LED",
      features: ["LED Backlight", "Heart Design", "Romantic Gift"],
    },
    images: [""],
    inStock: true,
  },

  // 🎉 Festive
  {
    id: 3,
    name: "Moon LED Night Light",
    price: 32.99,
    categories: ["Festive", "Gifts", "LED"],
    rating: 4.6,
    reviews: 278,
    description:
      "3D printed moon lamp with multiple colors — perfect for festive celebrations and gifting.",
    specs: {
      material: "3D Printed PLA",
      power: "Rechargeable Battery",
      features: ["Touch Control", "16 Colors", "Portable"],
    },
    images: [""],
    inStock: true,
  },

  {
    id: 4,
    name: "Color Changing LED Gift Set",
    price: 49.99,
    categories: ["Festive", "Gifts", "Trending"],
    rating: 4.8,
    reviews: 250,
    description:
      "Festive-themed LED gift set including decorative lights and small accent pieces.",
    specs: {
      material: "Mixed Decorative Set",
      power: "USB Powered",
      features: ["Gift Ready", "Multi-color Lights", "Elegant Packaging"],
    },
    images: [""],
    inStock: true,
  },

  // 🏡 Home & Kitchen
  {
    id: 5,
    name: "Aroma LED Diffuser",
    price: 44.99,
    categories: ["Home & Kitchen", "Trending"],
    rating: 4.8,
    reviews: 400,
    description:
      "Combines soothing LED lights with an aroma diffuser — perfect for relaxation and home aesthetics.",
    specs: {
      capacity: "200ml",
      features: ["Aroma Therapy", "7 Color LED Lights", "Quiet Operation"],
    },
    images: [""],
    inStock: true,
  },
  {
    id: 6,
    name: "LED Glass Kettle",
    price: 34.99,
    categories: ["Home & Kitchen", "Electronics"],
    rating: 4.6,
    reviews: 189,
    description:
      "Transparent glass kettle with LED temperature indicator — a mix of utility and design.",
    specs: {
      capacity: "1.7L",
      power: "1500W",
      features: ["LED Heat Indicator", "Auto Shutoff", "Fast Boil"],
    },
    images: [""],
    inStock: true,
  },

  // 🧩 Collections
  {
    id: 7,
    name: "Romantic Gift Collection Set",
    price: 89.99,
    categories: ["Collections", "Gifts", "Romantic"],
    rating: 4.9,
    reviews: 210,
    description:
      "A special bundle of romantic LED decor and frames designed for gifting your loved ones.",
    specs: {
      features: ["Gift Box Packaging", "Mixed LED Products", "Elegant Design"],
    },
    images: [""],
    inStock: true,
  },
  {
    id: 8,
    name: "Minimalist Home Collection",
    price: 99.99,
    categories: ["Collections", "Home & Kitchen", "Decor"],
    rating: 4.8,
    reviews: 178,
    description:
      "Curated home collection featuring table lamps, decor frames, and ambient lights.",
    specs: {
      features: ["Home Decor Essentials", "LED + Wood Mix", "Soft Ambience"],
    },
    images: [""],
    inStock: true,
  },

  // 🏢 Office
  {
    id: 9,
    name: "Minimalist LED Desk Lamp",
    price: 34.99,
    categories: ["Office", "Electronics", "Decor"],
    rating: 4.7,
    reviews: 310,
    description:
      "Sleek LED desk lamp with adjustable arm and touch controls, ideal for productive workspaces.",
    specs: {
      material: "Aluminum + Plastic",
      power: "USB Powered",
      features: ["Adjustable Arm", "Touch Control", "Eye Protection"],
    },
    images: [""],
    inStock: true,
  },
  {
    id: 10,
    name: "Ambient Glow Office Decor Lamp",
    price: 36.99,
    categories: ["Office", "Decor"],
    rating: 4.8,
    reviews: 278,
    description:
      "Soft ambient LED desk light that enhances focus and adds warmth to office setups.",
    specs: {
      material: "Wood + Frosted Glass",
      power: "USB Powered",
      features: ["Ambient Lighting", "Minimalist Design", "Soft Glow"],
    },
    images: [""],
    inStock: true,
  },

  // ⚡ Electronics
  {
    id: 11,
    name: "Smart Bluetooth Speaker Lamp",
    price: 54.99,
    categories: ["Electronics", "Smart Devices", "Trending"],
    rating: 4.8,
    reviews: 320,
    description:
      "A multifunctional Bluetooth speaker with integrated LED lamp — enjoy music with ambiance lighting.",
    specs: {
      power: "Rechargeable Battery",
      connectivity: "Bluetooth 5.0",
      features: ["Music Sync Lights", "Touch Control", "Portable Design"],
    },
    images: [""],
    inStock: true,
  },
  {
    id: 12,
    name: "Wireless Charging LED Base",
    price: 39.99,
    categories: ["Electronics", "Office", "Smart Devices"],
    rating: 4.6,
    reviews: 190,
    description:
      "Charge your devices wirelessly with this elegant LED-lit base — combining utility and aesthetics.",
    specs: {
      power: "USB-C",
      output: "15W Fast Charge",
      features: ["LED Ring Light", "Qi Compatible", "Minimal Design"],
    },
    images: [""],
    inStock: true,
  },

  // 🎁 Gifts
  {
    id: 13,
    name: "Personalized LED Photo Crystal",
    price: 64.99,
    categories: ["Gifts", "Trending", "Decor"],
    rating: 5.0,
    reviews: 230,
    description:
      "Custom 3D crystal frame that lights up your memories with warm LED illumination.",
    specs: {
      material: "Engraved Crystal",
      features: ["Customizable", "LED Base", "Gift Box"],
    },
    images: [""],
    inStock: true,
    badge: "Gift Pick",
  },
  {
    id: 14,
    name: "Music Reactive LED Frame",
    price: 49.99,
    categories: ["Gifts", "Electronics", "Trending"],
    rating: 4.9,
    reviews: 210,
    description:
      "A fun, sound-reactive LED photo frame that dances to your favorite music — the perfect personalized gift.",
    specs: {
      features: ["Sound Reactive", "Photo Display", "Rechargeable"],
    },
    images: [""],
    inStock: true,
  },

  // 🏷️ Brands
  {
    id: 15,
    name: "Lumina Signature Lamp",
    price: 64.99,
    categories: ["Brands", "Luxury", "Decor"],
    rating: 4.9,
    reviews: 150,
    description:
      "Lumina’s best-selling LED lamp with a unique glow aura design for luxury interiors.",
    specs: {
      brand: "Lumina",
      power: "AC Powered",
      features: ["Aura Glow", "Smart Dimming", "Premium Build"],
    },
    images: [""],
    inStock: true,
  },
  {
    id: 16,
    name: "GlowArt Decorative Light",
    price: 48.99,
    categories: ["Brands", "Decor", "Home & Kitchen"],
    rating: 4.7,
    reviews: 212,
    description:
      "From GlowArt’s premium decor series — a modern LED piece that transforms your space instantly.",
    specs: {
      brand: "GlowArt",
      features: ["Artistic Light Design", "Low Power Use"],
    },
    images: [""],
    inStock: true,
  },
];
