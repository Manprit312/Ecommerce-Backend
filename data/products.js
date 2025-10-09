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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/swanledphotoframs_x92deh.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983055/swanlamp3_pslnka.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983055/swanlamp2_nzba2j.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983055/swanlamp4_h8bkwa.jpg"], // ← Add Cloudinary URL here
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759983235/crystalphoto_cvfpit.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983234/crystal2_kpzrgd.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983235/crystal4_lchpvp.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983234/crystal3_lpcoqh.jpg"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759983565/moonlamp2_rlxq9t.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983565/moonlamp3_oroold.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983565/moonlamp2_rlxq9t.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983564/moonlamp1_thdonq.webp"],
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
           images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984177/61rIqc5XqUL_gkzkba.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984178/61nc-2GDQTL_vwr0ff.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984182/61rIqc5XqUL._UF894_1000_QL80__y93m2r.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984183/61bVHCHDnoL._UF894_1000_QL80__kwlq82.jpg"],

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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759898926/samples/coffee.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759898914/samples/food/spices.jpg"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759983684/ledkattle1_vaj9tg.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983685/ledkattle3_zn3f5h.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983685/ledkattle4_sbhdr0.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983685/ledlamp2_gs8foi.webp"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759983823/romatic1_wjboro.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983823/romantic4_pag11z.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983823/romantic3_n0r8uf.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759983822/romantic2_fr6m2n.webp"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759898926/samples/coffee.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759898909/samples/food/pot-mussels.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759898914/samples/food/spices.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759898923/samples/breakfast.jpg"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984040/ledlampmin4_lxc0n7.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984036/ledlampmin3_vchwmr.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984035/ledlampmin2_boztrp.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984035/ledlampmin1_cmeuch.webp"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984112/CARRFA-3D-Cat-Lamp-Retro-Stained-Pet-Themed-LED-Table-Lamps-with-Warm-Ambient-Glow-Gifts-for-Bedroom-Living-Room-Dining-Room-Office-Home-Decoration_78f03734-c4cf-48ca-8d8b-84994df0e9a7.54f635da831bf7c4f50c5a11206f02fa_izqke6.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984112/CARRFA-3D-Labrador-Lamp-Retro-Stained-Pet-Themed-LED-Table-Lamps-Warm-Ambient-Glow-Gifts-Bedroom-Living-Room-Dining-Room-Office-Home-Decoration_52eb1749-c00d-4b79-806a-71085f4d52f7.c87fd3b022a95858990e53b90188aff6_kvame7.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984112/CARRFA-3D-Labrador-Lamp-Retro-Stained-Pet-Themed-LED-Table-Lamps-Warm-Ambient-Glow-Gifts-Bedroom-Living-Room-Dining-Room-Office-Home-Decoration_52eb1749-c00d-4b79-806a-71085f4d52f7.c87fd3b022a95858990e53b90188aff6_kvame7.jpg",
      'https://res.cloudinary.com/dnvhetnud/image/upload/v1759984116/71jVagV-X2L._UF894_1000_QL80__r6qfaw.jpg'
    ],
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
        images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984177/61rIqc5XqUL_gkzkba.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984178/61nc-2GDQTL_vwr0ff.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984182/61rIqc5XqUL._UF894_1000_QL80__y93m2r.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984183/61bVHCHDnoL._UF894_1000_QL80__kwlq82.jpg"],


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
     images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984304/71pIiBEi0oL._UF894_1000_QL80__oqqtlq.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984309/15515_HYG_3-in-1_MFi_Wireless_Charging_Stand_BLACK_010_d2ckya.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984306/51SANvSQGYL_meukag.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984306/51SANvSQGYL_meukag.jpg"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984356/81PmS6WAvvL_dnfcd1.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984357/H5f825f4f5f504abf8db7d0ef0e44d683O_f24zjs.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984360/51X2-HchI8L._UF894_1000_QL80__j1a0ul.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984361/Heart_Key_Chain_8fb0d055-0ba0-4d42-a742-04841f739b3a_gpgjqj.jpg"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984424/Frame-6--2-_ts50jw.webp","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984425/71IfbCZkSOL_m5zgxq.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984427/719u35wVWuL._UF350_350_QL80__csjdbs.jpg"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984522/SCUL0647_c6gvbg.png","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984528/Lumina_Pillar_Orb_Floor_Lamp__9_yosv6f.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984521/SCUL0650_ucudi0.png"],
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
    images: ["https://res.cloudinary.com/dnvhetnud/image/upload/v1759984574/Modern-Wallpaper-Murals-3D-Glow-Art-Blacklight-Mystery-Mural-Peel-Stick-Removable-Self-Adhesive-PVC-Wall-Stickers-Nursery-Kids-Bedroom-TV-Wall-Decor_c89048cd-e607-4b0a-ba6e-6397760157c2.1e7aabe910ff69ffa6dc42a9ef0e07f1_rx9xal.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984574/Modern-Wallpaper-Murals-3D-Glow-Art-Blacklight-Mystery-Mural-Peel-Stick-Removable-Self-Adhesive-PVC-Wall-Stickers-Nursery-Kids-Bedroom-TV-Wall-Decor_c89048cd-e607-4b0a-ba6e-6397760157c2.1e7aabe910ff69ffa6dc42a9ef0e07f1_rx9xal.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984575/818-XvEcFjL._UF1000_1000_QL80__iwngxo.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759984575/818-XvEcFjL._UF1000_1000_QL80__iwngxo.jpg"],
    inStock: true,
  },
  {
  id: 21,
  name: "Handmade Crochet Rose Purse",
  price: 29.99,
  categories: ["Crochet", "Fashion", "Gifts"],
  rating: 4.9,
  reviews: 120,
  description:
    "A delicate handmade crochet rose purse with floral design and green straps — perfect for casual outings or gifting.",
  specs: {
    material: "Cotton Yarn",
    features: ["Handmade", "Eco-Friendly", "Unique Floral Design"],
  },
  images: [
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurseblack_diat5e.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurse2_wugeqp.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurse_zzyofm.jpg"
  ],
  inStock: true,
  badge: "Handcrafted",
},
{
  id: 22,
  name: "Crochet Fingerless Gloves – Rose Design",
  price: 19.99,
  categories: ["Crochet", "Winter", "Accessories"],
  rating: 4.8,
  reviews: 85,
  description:
    "Beautiful handmade crochet gloves featuring a rose motif — cozy, stylish, and perfect for chilly weather.",
  specs: {
    material: "Wool Yarn",
    features: ["Soft Texture", "Flower Accent", "Fingerless Design"],
  },
  images: [
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetgluves_ltpxxf.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetgloves_fq66qo.jpg"
  ],
  inStock: true,
},
{
  id: 23,
  name: "Crochet White Winter Gloves",
  price: 18.99,
  categories: ["Crochet", "Winter", "Accessories"],
  rating: 4.7,
  reviews: 76,
  description:
    "Soft white crochet gloves with a minimal design, handcrafted for comfort and warmth.",
  specs: {
    material: "Cotton Yarn",
    features: ["Handmade", "Breathable", "Comfort Fit"],
  },
  images: [
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetgluves_ltpxxf.jpg"
  ],
  inStock: true,
},
{
  id: 24,
  name: "Crochet Flower Keychain",
  price: 9.99,
  categories: ["Crochet", "Gifts", "Accessories"],
  rating: 5.0,
  reviews: 65,
  description:
    "Cute and colorful crochet flower keychains — add a touch of handmade charm to your keys or bags.",
  specs: {
    material: "Cotton Yarn",
    features: ["Handcrafted", "Durable Keyring", "Gift Friendly"],
  },
  images: [
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetkeychain_wgejwh.jpg",
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901842/handmadecrochetkeychain2_ndiddz.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetkeychains_jgt2mr.jpg"
  ],
  inStock: true,
},
{
  id: 25,
  name: "Floral Crochet Drawstring Pouch",
  price: 24.99,
  categories: ["Crochet", "Fashion", "Gifts"],
  rating: 4.9,
  reviews: 98,
  description:
    "Elegant handmade crochet pouch with multi-color flower detailing — perfect for makeup, coins, or accessories.",
  specs: {
    material: "Cotton Yarn",
    features: ["Drawstring Closure", "Decorative Flowers", "Fully Handmade"],
  },
  images: [
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurse2_wugeqp.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurse_zzyofm.jpg"

  ],
  inStock: true,
},
{
  id: 26,
  name: "Black Crochet Shoulder Bag",
  price: 34.99,
  categories: ["Crochet", "Fashion", "Bags"],
  rating: 4.9,
  reviews: 112,
  description:
    "Trendy black crochet shoulder bag with yellow detailing — handcrafted for both style and function.",
  specs: {
    material: "Cotton Yarn",
    features: ["Spacious", "Handcrafted", "Lightweight"],
  },
  images: [
    "https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurseblack_diat5e.jpg","https://res.cloudinary.com/dnvhetnud/image/upload/v1759901843/handmadecrochetpurseblack_diat5e.jpg"
  ],
  inStock: true,
  badge: "New Arrival",
},

];
