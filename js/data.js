/**
 * NexMart Product Catalog Data
 * Contains realistic products across 10 major categories with INR pricing, real images, specs & ratings.
 */

const PRODUCTS = [
  // --- ELECTRONICS & AUDIO ---
  {
    id: "prod-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "Electronics",
    description: "Industry-leading noise canceling with two processors and 8 microphones for unprecedented sound quality and crystal-clear hands-free calling.",
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.8,
    reviewCount: 3420,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Auto NC Optimizer automatically adjusts noise cancellation",
      "Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)",
      "Ultra-comfortable, lightweight design with soft fit leather",
      "Multipoint connection allows quick switching between devices"
    ],
    specifications: {
      "Model Name": "WH-1000XM5",
      "Color": "Black",
      "Headphone Type": "Over the Ear",
      "Connectivity": "Bluetooth 5.2",
      "Battery Life": "30 Hours",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },
  {
    id: "prod-2",
    name: "Apple AirPods Pro (2nd Generation) Type-C",
    brand: "Apple",
    category: "Electronics",
    description: "Up to 2x more Active Noise Cancellation than the previous generation. Spatial Audio with dynamic head tracking for immersive sound.",
    price: 21900,
    originalPrice: 24900,
    discount: 12,
    rating: 4.9,
    reviewCount: 5210,
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Apple H2 headphone chip for intelligent noise cancellation and sound",
      "MagSafe Charging Case (USB-C) with Speaker and Lanyard Loop",
      "Touch control lets you swipe to adjust volume",
      "Dust, sweat, and water resistant (IP54)"
    ],
    specifications: {
      "Model Name": "AirPods Pro 2nd Gen",
      "Color": "White",
      "Headphone Type": "In the Ear",
      "Charging Case": "USB-C MagSafe",
      "Warranty": "1 Year Apple Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },
  {
    id: "prod-3",
    name: "JBL Flip 6 Portable Bluetooth Speaker 20W",
    brand: "JBL",
    category: "Electronics",
    description: "Louder, more powerful sound with 2-way speaker system. IP67 waterproof and dustproof design for outdoor adventures.",
    price: 9999,
    originalPrice: 13999,
    discount: 28,
    rating: 4.6,
    reviewCount: 1890,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "20W RMS power output with deep bass response",
      "12 Hours of playtime under optimal audio settings",
      "IP67 Waterproof and Dustproof rate",
      "PartyBoost allows pairing multiple JBL speakers"
    ],
    specifications: {
      "Model Name": "JBL Flip 6",
      "Color": "Ocean Blue",
      "Power Output": "20W RMS",
      "Battery Capacity": "4800 mAh",
      "Warranty": "1 Year Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },

  // --- MOBILES & SMARTWATCHES ---
  {
    id: "prod-4",
    name: "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB)",
    brand: "Samsung",
    category: "Mobiles",
    description: "Meet Galaxy S24 Ultra with Galaxy AI. Live Translate, Note Assist, Photo Assist, and groundbreaking 200MP camera with Quad Tele System.",
    price: 129999,
    originalPrice: 144999,
    discount: 10,
    rating: 4.7,
    reviewCount: 1420,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Snapdragon 8 Gen 3 for Galaxy Processor",
      "6.8-inch QHD+ Dynamic AMOLED 2X 120Hz display",
      "200MP Rear Camera with Built-in S Pen",
      "Titanium frame design for extreme durability"
    ],
    specifications: {
      "Model": "Galaxy S24 Ultra",
      "RAM / Storage": "12GB / 256GB",
      "Display": "6.8 inch QHD+ AMOLED",
      "Battery": "5000 mAh with 45W Fast Charge",
      "OS": "Android 14, One UI 6.1"
    },
    availability: "In Stock",
    delivery: "Free Express Delivery"
  },
  {
    id: "prod-5",
    name: "Apple iPhone 15 Pro Max (256 GB, Natural Titanium)",
    brand: "Apple",
    category: "Mobiles",
    description: "Forged in titanium with revolutionary A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.",
    price: 148900,
    originalPrice: 159900,
    discount: 7,
    rating: 4.9,
    reviewCount: 4890,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Aerospace-grade titanium design with Super Retina XDR display",
      "A17 Pro chip brings unprecedented graphics performance",
      "48MP Main camera with 5x Telephoto optical zoom",
      "USB-C connector with USB 3 speed support"
    ],
    specifications: {
      "Model": "iPhone 15 Pro Max",
      "Storage": "256 GB",
      "Display": "6.7 inch Super Retina XDR",
      "Processor": "A17 Pro Chip",
      "Warranty": "1 Year Apple Warranty"
    },
    availability: "In Stock",
    delivery: "Free Express Delivery"
  },
  {
    id: "prod-6",
    name: "OnePlus 12 5G (16GB RAM, 512GB, Silky Black)",
    brand: "OnePlus",
    category: "Mobiles",
    description: "Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 5400 mAh battery with 100W SUPERVOOC charging.",
    price: 69999,
    originalPrice: 74999,
    discount: 6,
    rating: 4.6,
    reviewCount: 980,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Snapdragon 8 Gen 3 Processor",
      "2K 120 Hz ProXDR Display with Dolby Vision",
      "50MP Sony LYT-808 Camera with Hasselblad calibration",
      "100W Wired + 50W AIRVOOC Wireless Fast Charge"
    ],
    specifications: {
      "Model": "OnePlus 12",
      "RAM / Storage": "16GB / 512GB",
      "Battery": "5400 mAh",
      "Charging": "100W SUPERVOOC",
      "Warranty": "1 Year Brand Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },
  {
    id: "prod-7",
    name: "Apple Watch Series 9 GPS 45mm Midnight Aluminum",
    brand: "Apple",
    category: "Mobiles",
    description: "S9 SiP enables a super-bright display and a magical new double tap gesture to control your Apple Watch without touching the screen.",
    price: 41900,
    originalPrice: 44900,
    discount: 7,
    rating: 4.8,
    reviewCount: 1120,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "S9 SiP chip with 64-bit dual-core processor",
      "Double Tap gesture control",
      "Advanced health sensors for ECG, Blood Oxygen, and Sleep Tracking",
      "Water resistant to 50 meters"
    ],
    specifications: {
      "Case Size": "45mm",
      "Connectivity": "GPS",
      "Display": "Always-On Retina display up to 2000 nits",
      "Battery": "Up to 18 Hours"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },

  // --- FASHION & ACCESSORIES ---
  {
    id: "prod-8",
    name: "Levi's Men's 511 Slim Fit Stretch Denim Jeans",
    brand: "Levi's",
    category: "Fashion",
    description: "A modern slim with room to move. Crafted from premium stretch cotton denim for all-day comfort and long-lasting durability.",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.4,
    reviewCount: 6420,
    images: [
      "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "99% Cotton, 1% Elastane stretch denim",
      "Classic 5-pocket styling",
      "Sits below waist, slim fit from hip to ankle",
      "Machine washable"
    ],
    specifications: {
      "Fit": "Slim Fit",
      "Fabric": "Cotton Blend",
      "Wash Care": "Machine Wash Warm",
      "Country of Origin": "India"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 3 Days"
  },
  {
    id: "prod-9",
    name: "Nike Air Force 1 '07 Sneakers White",
    brand: "Nike",
    category: "Fashion",
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on crisp leather, bold colors and flash.",
    price: 7495,
    originalPrice: 9695,
    discount: 22,
    rating: 4.7,
    reviewCount: 8940,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Real and synthetic leather overlays on upper",
      "Nike Air cushioning for lightweight comfort",
      "Padded, low-cut collar looks sleek and feels great",
      "Perforations on toe for breathability"
    ],
    specifications: {
      "Color": "Triple White",
      "Sole Material": "Rubber",
      "Closure": "Lace-Up",
      "Style Code": "CW2288-111"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },
  {
    id: "prod-10",
    name: "Tommy Hilfiger Men's Leather Bi-Fold Wallet with RFID",
    brand: "Tommy Hilfiger",
    category: "Fashion",
    description: "Handcrafted from 100% genuine leather with RFID blocking technology to keep your cards safe from electronic theft.",
    price: 1899,
    originalPrice: 3499,
    discount: 45,
    rating: 4.5,
    reviewCount: 3100,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "100% Genuine Top-Grain Leather",
      "Built-in RFID blocking shield",
      "6 Card Slots, 2 Slip Pockets & 2 Currency Compartments",
      "Embossed Tommy Hilfiger flag logo on front"
    ],
    specifications: {
      "Material": "Genuine Leather",
      "Dimensions": "11 cm x 9 cm",
      "Color": "Dark Brown",
      "Warranty": "6 Months Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },
  {
    id: "prod-11",
    name: "Ray-Ban Aviator Classic Sunglasses (Gold Frame, Green Lens)",
    brand: "Ray-Ban",
    category: "Fashion",
    description: "Currently one of the most iconic sunglass models in the world. Originally designed for U.S. aviators in 1937.",
    price: 7890,
    originalPrice: 9890,
    discount: 20,
    rating: 4.6,
    reviewCount: 2150,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "100% UV Protection G-15 Glass Lenses",
      "Durable metal frame with polished gold finish",
      "Adjustable nose pads for comfortable custom fit",
      "Includes original Ray-Ban leather protective case"
    ],
    specifications: {
      "Frame Material": "Metal",
      "Lens Material": "Glass",
      "Lens Width": "58 mm",
      "Warranty": "2 Year Manufacturer Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },

  // --- HOME & KITCHEN ---
  {
    id: "prod-12",
    name: "Nespresso Vertuo Pop+ Coffee Machine by De'Longhi",
    brand: "Nespresso",
    category: "Home & Kitchen",
    description: "Compact and stylish espresso machine that brews 5 coffee cup sizes with a single touch using Centrifusion technology.",
    price: 14999,
    originalPrice: 18999,
    discount: 21,
    rating: 4.5,
    reviewCount: 850,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Brews Espresso, Double Espresso, Gran Lungo, Mug and Carafe",
      "Automatic capsule recognition via barcode scanning",
      "Fast 30-second heat-up time",
      "Made from 35% recycled plastic"
    ],
    specifications: {
      "Water Tank Capacity": "1.1 Liter",
      "Power": "1500 Watts",
      "Weight": "3.5 kg",
      "Warranty": "2 Year Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },
  {
    id: "prod-13",
    name: "Philips Digital Air Fryer HD9252/90 4.1L 1400W",
    brand: "Philips",
    category: "Home & Kitchen",
    description: "Fry with up to 90% less fat thanks to Rapid Air technology. Digital touch screen with 7 presets for easy cooking.",
    price: 7999,
    originalPrice: 11995,
    discount: 33,
    rating: 4.7,
    reviewCount: 4210,
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Rapid Air Technology for healthy frying, baking, grilling and roasting",
      "Touch screen with 7 preset cooking modes",
      "Keep Warm function keeps food warm for up to 30 mins",
      "Dishwasher safe quick-clean basket"
    ],
    specifications: {
      "Capacity": "4.1 Liters",
      "Wattage": "1400W",
      "Preset Modes": "7 Preset Programs",
      "Warranty": "2 Years Philips Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },
  {
    id: "prod-14",
    name: "Milton Thermosteel Flip Lid Vacuum Flask 1000ml",
    brand: "Milton",
    category: "Home & Kitchen",
    description: "Double wall stainless steel vacuum insulated bottle that keeps beverages hot or cold for up to 24 hours.",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.6,
    reviewCount: 12400,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "100% Rust-proof 304 food-grade stainless steel inside and outside",
      "Hot for 24 hours, cold for 24 hours insulation technology",
      "100% Leak-proof flip lid for smooth pouring",
      "Includes protective fabric jacket with shoulder strap"
    ],
    specifications: {
      "Capacity": "1000 ml",
      "Material": "Stainless Steel",
      "Insulation": "Vacuum Insulated Double Wall",
      "Warranty": "1 Year Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },

  // --- APPLIANCES ---
  {
    id: "prod-15",
    name: "LG 1.5 Ton 5 Star AI Dual Inverter Split AC 2024 Model",
    brand: "LG",
    category: "Appliances",
    description: "AI Dual Inverter Compressor predicts cool requirement and delivers precise cooling. HD Filter with Anti-Virus Protection.",
    price: 44490,
    originalPrice: 78990,
    discount: 43,
    rating: 4.5,
    reviewCount: 3120,
    images: [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "5 Star Energy Rating for ultra-low electricity consumption",
      "100% Copper Tubes with Ocean Black Protection against rust",
      "6-in-1 AI Convertible Cooling modes",
      "Low Gas Detection & Silent Operation"
    ],
    specifications: {
      "Capacity": "1.5 Ton",
      "Energy Rating": "5 Star",
      "Compressor": "Dual Inverter",
      "Warranty": "10 Years Compressor Warranty"
    },
    availability: "In Stock",
    delivery: "Free Installation & Express Delivery"
  },
  {
    id: "prod-16",
    name: "Samsung 43 Inch Crystal 4K Vivid Pro Ultra HD Smart TV",
    brand: "Samsung",
    category: "Appliances",
    description: "Breathtaking 4K UHD picture quality with Crystal Processor 4K, HDR10+, PurColor, and Q-Symphony sound synchronization.",
    price: 28990,
    originalPrice: 44900,
    discount: 35,
    rating: 4.6,
    reviewCount: 5640,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Crystal Processor 4K upscaling for lifelike resolution",
      "OTS Lite (Object Tracking Sound) for immersive audio",
      "Supports Netflix, Prime Video, Disney+ Hotstar, YouTube",
      "3 HDMI Ports and 1 USB Port"
    ],
    specifications: {
      "Screen Size": "43 Inches",
      "Resolution": "3840 x 2160 Pixels (4K)",
      "Sound Output": "20 Watts RMS",
      "Warranty": "1 Year Comprehensive + 1 Year Extra Panel"
    },
    availability: "In Stock",
    delivery: "Free Delivery & Tabletop Setup"
  },
  {
    id: "prod-17",
    name: "Whirlpool 240L Triple Door Frost Free Refrigerator",
    brand: "Whirlpool",
    category: "Appliances",
    description: "Protton 3-door structure prevents odor mixing and preserves freshness up to 2x longer with 6th Sense ActiveFresh Technology.",
    price: 25990,
    originalPrice: 33500,
    discount: 22,
    rating: 4.4,
    reviewCount: 2190,
    images: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "240 Liters total storage capacity",
      "3 Independent zones for fresh fruits, vegetables, and freezer",
      "Microblock Technology prevents up to 99% bacterial growth",
      "Consumes less energy than a CFL bulb"
    ],
    specifications: {
      "Capacity": "240 L",
      "Door Structure": "Triple Door",
      "Defrost System": "Frost Free",
      "Warranty": "1 Year Comprehensive, 10 Years Compressor"
    },
    availability: "In Stock",
    delivery: "Free Scheduled Delivery"
  },

  // --- BEAUTY & PERSONAL CARE ---
  {
    id: "prod-18",
    name: "Dyson Airwrap Multi-Styler Complete Long",
    brand: "Dyson",
    category: "Beauty",
    description: "Style with Coanda airflow instead of extreme heat. Curl, shape, smooth, and hide flyaways for re-engineered long hair styling.",
    price: 45900,
    originalPrice: 49900,
    discount: 8,
    rating: 4.9,
    reviewCount: 1650,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Dyson V9 digital motor spins at up to 110,000rpm",
      "Intelligent heat control measures airflow temperature over 40 times a second",
      "Includes 6 versatile re-engineered attachments",
      "Storage case in Prussian Blue and Copper"
    ],
    specifications: {
      "Airflow Speed": "13.5 l/s",
      "Wattage": "1300W",
      "Cable Length": "2.68 m",
      "Warranty": "2 Year Dyson Warranty"
    },
    availability: "In Stock",
    delivery: "Free Express Delivery"
  },
  {
    id: "prod-19",
    name: "Estée Lauder Advanced Night Repair Serum 50ml",
    brand: "Estée Lauder",
    category: "Beauty",
    description: "Deep-penetrating serum that significantly reduces the look of multiple signs of aging caused by environmental assaults of modern life.",
    price: 9500,
    originalPrice: 10500,
    discount: 9,
    rating: 4.8,
    reviewCount: 2890,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597261-833258657b45?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Patented Chronolux Power Signal Technology",
      "Delivers 72-hour hydration with Hyaluronic Acid",
      "Skin looks radiant and plumped with moisture",
      "Free of oil, synthetic fragrance, and parabens"
    ],
    specifications: {
      "Volume": "50 ml",
      "Skin Type": "All Skin Types",
      "Key Ingredient": "Hyaluronic Acid & Peptides",
      "Formulation": "Lightweight Serum"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },
  {
    id: "prod-20",
    name: "Philips Series 7000 Showerproof Body Groomer & Trimmer",
    brand: "Philips",
    category: "Beauty",
    description: "Dual-sided body groomer designed to comfortably trim or shave any length of hair on any body zone safely.",
    price: 3499,
    originalPrice: 4495,
    discount: 22,
    rating: 4.6,
    reviewCount: 4320,
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Dual-sided design: 4-way contour shaver and integrated trimmer",
      "100% Showerproof with ergonomic rubber grip",
      "80 minutes runtime from a 1-hour fast charge",
      "Skin comfort system with rounded tips"
    ],
    specifications: {
      "Runtime": "80 Minutes",
      "Charging Time": "1 Hour",
      "Waterproofing": "100% Showerproof IPX7",
      "Warranty": "2 Years Guarantee"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },

  // --- SPORTS & FITNESS ---
  {
    id: "prod-21",
    name: "Decathlon Domyos Rubber Hex Dumbbell 10kg Pair",
    brand: "Decathlon",
    category: "Sports",
    description: "Durable hexagon shaped rubber dumbbells designed for heavy strength training and cross-training at home.",
    price: 3299,
    originalPrice: 4500,
    discount: 27,
    rating: 4.7,
    reviewCount: 1540,
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Heavy duty rubber casing protects floors and reduces noise",
      "Knurled chrome steel handle provides secure grip",
      "Hexagonal anti-roll design",
      "Pair of 2 x 10kg dumbbells"
    ],
    specifications: {
      "Weight": "10kg x 2 (Total 20kg)",
      "Material": "Cast Iron & Rubber",
      "Grip Type": "Ergonomic Knurled Steel",
      "Color": "Matte Black"
    },
    availability: "In Stock",
    delivery: "Free Heavy Item Delivery"
  },
  {
    id: "prod-22",
    name: "Yonex Muscle Power 29 Light Badminton Racquet",
    brand: "Yonex",
    category: "Sports",
    description: "High tension isometric frame constructed with full graphite for explosive power smashing and rapid defense control.",
    price: 2490,
    originalPrice: 3890,
    discount: 36,
    rating: 4.5,
    reviewCount: 3870,
    images: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613918431703-8840eb424696?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Isometric head shape expands sweet spot by 7%",
      "Muscle Power frame locates string on rounded archways for zero friction",
      "Lightweight 4U (80-84 grams)",
      "Includes full padded Yonex thermal cover"
    ],
    specifications: {
      "Frame Material": "HM Graphite",
      "Flex": "Medium",
      "Weight / Grip": "4U (Ave.83g) G4",
      "String Tension": "24-30 lbs"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },

  // --- GROCERY & DAILY ESSENTIALS ---
  {
    id: "prod-23",
    name: "Tata Sampann Organic Unpolished Chana Dal 1kg",
    brand: "Tata",
    category: "Grocery",
    description: "100% Organic unpolished pulses sourced directly from certified organic farms, retaining natural protein and dietary fiber.",
    price: 165,
    originalPrice: 195,
    discount: 15,
    rating: 4.6,
    reviewCount: 9450,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "No artificial polishing with water, oil or leather",
      "Rich source of protein and essential minerals",
      "Strict 5-step quality check process",
      "Certified NPOP Organic Standard"
    ],
    specifications: {
      "Weight": "1 kg",
      "Form": "Whole Unpolished Pulse",
      "Diet Type": "Vegetarian",
      "Shelf Life": "6 Months"
    },
    availability: "In Stock",
    delivery: "Free Delivery Today with Fresh Pass"
  },
  {
    id: "prod-24",
    name: "Davidoff Cafe Rich Aroma Instant Coffee 100g Glass Jar",
    brand: "Davidoff",
    category: "Grocery",
    description: "Masterpiece coffee blend composed of 100% Arabica beans carefully selected from South America and East Africa.",
    price: 599,
    originalPrice: 790,
    discount: 24,
    rating: 4.8,
    reviewCount: 4120,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "100% Premium Arabica freeze-dried coffee granules",
      "Full-bodied taste with an elegant spicy aroma finish",
      "Aroma-sealed glass jar preserves freshness",
      "Quick and easy preparation in hot milk or water"
    ],
    specifications: {
      "Weight": "100 g",
      "Roast Level": "Medium Roast",
      "Caffeine Content": "Caffeinated",
      "Country of Origin": "Germany"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },

  // --- BOOKS & STATIONERY ---
  {
    id: "prod-25",
    name: "Atomic Habits by James Clear (Hardcover Edition)",
    brand: "Penguin Random House",
    category: "Books",
    description: "An easy & proven way to build good habits & break bad ones. The million-copy bestseller by world renowned habit expert James Clear.",
    price: 549,
    originalPrice: 799,
    discount: 31,
    rating: 4.9,
    reviewCount: 42100,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "#1 New York Times & International Bestseller",
      "Practical strategies for small daily changes leading to remarkable results",
      "Includes actionable frameworks and habit trackers",
      "Premium hardcover binding with ribbon bookmark"
    ],
    specifications: {
      "Author": "James Clear",
      "Format": "Hardcover",
      "Pages": "320 Pages",
      "Language": "English",
      "Publisher": "Random House Business"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },
  {
    id: "prod-26",
    name: "Moleskine Classic Notebook Hard Cover Large Plain Black",
    brand: "Moleskine",
    category: "Books",
    description: "The legendary notebook used by artists, writers, and thinkers for over two centuries. Features expandable inner pocket and elastic closure.",
    price: 1999,
    originalPrice: 2495,
    discount: 20,
    rating: 4.7,
    reviewCount: 2450,
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "70 gsm ivory-colored acid-free paper",
      "Hardcover with rounded corners and elastic closure band",
      "Lies flat, opens at 180 degrees",
      "Expandable back inner pocket for loose papers"
    ],
    specifications: {
      "Size": "Large (13 x 21 cm)",
      "Page Count": "240 Pages",
      "Paper Type": "Plain / Unlined",
      "Cover": "Hardcover Synthetic Leather"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  },

  // --- MORE TECH & LAPTOPS ---
  {
    id: "prod-27",
    name: "Apple MacBook Air 15-inch M3 Chip (8GB Unified RAM, 256GB SSD)",
    brand: "Apple",
    category: "Electronics",
    description: "Incredibly thin and fast 15-inch laptop powered by the ultra-capable M3 chip with up to 18 hours of battery life.",
    price: 134900,
    originalPrice: 144900,
    discount: 7,
    rating: 4.9,
    reviewCount: 1520,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Apple M3 8-core CPU and 10-core GPU",
      "15.3-inch Liquid Retina display with 500 nits brightness",
      "Silent fanless design with MagSafe 3 charging port",
      "1080p FaceTime HD camera with 3-mic array"
    ],
    specifications: {
      "Processor": "Apple M3 Chip",
      "RAM": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Display": "15.3-inch Liquid Retina",
      "Weight": "1.51 kg"
    },
    availability: "In Stock",
    delivery: "Free Express Delivery"
  },
  {
    id: "prod-28",
    name: "Dell XPS 13 9340 Intel Core Ultra 7 (16GB RAM, 512GB SSD)",
    brand: "Dell",
    category: "Electronics",
    description: "Crafted with CNC machined aluminum and Gorilla Glass 3. Powered by Intel Core Ultra processor with built-in AI acceleration.",
    price: 139990,
    originalPrice: 154990,
    discount: 10,
    rating: 4.7,
    reviewCount: 680,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Intel Core Ultra 7 155H processor with Intel Arc Graphics",
      "13.4-inch FHD+ InfinityEdge anti-glare display",
      "Zero-lattice keyboard with seamless glass haptic touchpad",
      "Wi-Fi 7 connectivity and Quad speakers"
    ],
    specifications: {
      "Processor": "Intel Core Ultra 7 155H",
      "RAM": "16GB LPDDR5X",
      "Storage": "512GB NVMe SSD",
      "OS": "Windows 11 Home + MS Office 2021"
    },
    availability: "In Stock",
    delivery: "Free Express Delivery"
  },
  {
    id: "prod-29",
    name: "Sony PlayStation 5 Console (Slim Disc Edition)",
    brand: "Sony",
    category: "Electronics",
    description: "Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers and 3D Audio.",
    price: 54990,
    originalPrice: 59990,
    discount: 8,
    rating: 4.9,
    reviewCount: 8900,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "1TB Custom NVMe SSD Storage",
      "Supports 4K 120Hz gaming with Ray Tracing technology",
      "Includes 1 DualSense Wireless Controller",
      "Backwards compatible with PS4 games"
    ],
    specifications: {
      "Model": "PS5 Slim Disc",
      "Storage": "1 TB SSD",
      "Resolution": "Up to 8K HDR",
      "Warranty": "1 Year Sony India Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery by Tomorrow"
  },
  {
    id: "prod-30",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker 5.7L",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    description: "America's most loved multi-cooker combines 7 appliances in 1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté Pan, Yogurt Maker and Warmer.",
    price: 8990,
    originalPrice: 12999,
    discount: 30,
    rating: 4.8,
    reviewCount: 15400,
    images: [
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "Cooks up to 70% faster than traditional methods",
      "13 One-Touch Smart Programs",
      "10+ Built-in Safety Features including Overheat Protection",
      "Food-grade 304 stainless steel inner pot with tri-ply bottom"
    ],
    specifications: {
      "Capacity": "5.7 Liters",
      "Wattage": "1000W",
      "Control Type": "One-Touch Digital Panel",
      "Warranty": "2 Years Warranty"
    },
    availability: "In Stock",
    delivery: "Free Delivery in 2 Days"
  }
];

// Product Categories list with iconography identifiers
const CATEGORIES = [
  { id: "cat-all", name: "All Categories", icon: "grid" },
  { id: "cat-electronics", name: "Electronics", icon: "headphones" },
  { id: "cat-mobiles", name: "Mobiles", icon: "smartphone" },
  { id: "cat-fashion", name: "Fashion", icon: "shopping-bag" },
  { id: "cat-home", name: "Home & Kitchen", icon: "home" },
  { id: "cat-appliances", name: "Appliances", icon: "tv" },
  { id: "cat-beauty", name: "Beauty", icon: "sparkles" },
  { id: "cat-sports", name: "Sports", icon: "activity" },
  { id: "cat-grocery", name: "Grocery", icon: "shopping-cart" },
  { id: "cat-books", name: "Books", icon: "book-open" }
];
