export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 999,
    rating: 4.8,
    description: "Experience the power of Titanium, the A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system.",
    tags: ["phone", "apple", "ios", "camera", "premium", "mobile", "gadget"],
    specs: {
      "Brand": "Apple",
      "Screen": "6.1 inches Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Storage": "128GB / 256GB / 512GB"
    },
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Samsung Galaxy A54 5G",
    category: "Electronics",
    price: 399,
    rating: 4.4,
    description: "A gorgeous Super AMOLED 120Hz display, multi-day battery life, and high-resolution camera make this the perfect daily driver at an affordable price.",
    tags: ["phone", "samsung", "android", "budget", "battery", "mobile", "affordable"],
    specs: {
      "Brand": "Samsung",
      "Screen": "6.4 inches Super AMOLED",
      "Battery": "5000 mAh",
      "Storage": "128GB"
    },
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Google Pixel 7a",
    category: "Electronics",
    price: 449,
    rating: 4.5,
    description: "Powered by the Google Tensor G2 chip, the Pixel 7a delivers incredible photos, seamless clean Android performance, and top-tier security features.",
    tags: ["phone", "google", "android", "camera", "budget", "mobile", "smart"],
    specs: {
      "Brand": "Google",
      "Processor": "Google Tensor G2",
      "Camera": "64 MP main camera",
      "Screen": "6.1 inches OLED 90Hz"
    },
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "MacBook Air M2",
    category: "Electronics",
    price: 1099,
    rating: 4.9,
    description: "Strikingly thin design with up to 18 hours of battery life, a stunning Liquid Retina display, and silent, fanless operation fueled by the M2 chip.",
    tags: ["laptop", "apple", "macos", "premium", "work", "portable", "computer"],
    specs: {
      "Brand": "Apple",
      "Processor": "Apple M2 8-core",
      "Battery Life": "Up to 18 hours",
      "Weight": "2.7 lbs"
    },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Lenovo IdeaPad 3 Slim",
    category: "Electronics",
    price: 349,
    rating: 4.1,
    description: "An excellent, reliable everyday laptop for school, study, or home office tasks. Features AMD Ryzen processors and a sharp Full HD display.",
    tags: ["laptop", "windows", "budget", "work", "study", "affordable", "computer"],
    specs: {
      "Brand": "Lenovo",
      "Processor": "AMD Ryzen 3 7320U",
      "RAM": "8GB LPDDR5",
      "Storage": "256GB SSD"
    },
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: 398,
    rating: 4.7,
    description: "Magnificent active noise canceling wireless headphones. Tailor-made for travel, focus, and rich high-fidelity audio listening experiences.",
    tags: ["audio", "headphones", "sony", "wireless", "premium", "noise-canceling", "travel"],
    specs: {
      "Brand": "Sony",
      "Battery": "Up to 30 hours",
      "Connection": "Bluetooth 5.2",
      "ANC": "Industry-leading multi-mic ANC"
    },
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 7,
    name: "Anker Soundcore Life Q30",
    category: "Electronics",
    price: 79,
    rating: 4.3,
    description: "Hybrid active noise canceling headphones featuring high-res sound, customizable EQ via app, and comfortable memory foam earcups at an unbeatable value.",
    tags: ["audio", "headphones", "anker", "budget", "wireless", "noise-canceling", "affordable"],
    specs: {
      "Brand": "Anker",
      "Battery": "Up to 40 hours (ANC on)",
      "ANC": "Hybrid ANC (3 modes)",
      "EQ": "Customizable via App"
    },
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Keychron K2 Mechanical Keyboard",
    category: "Gaming",
    price: 89,
    rating: 4.6,
    description: "A tactile wireless mechanical keyboard featuring a compact 75% layout, hot-swappable switches, and multi-device Bluetooth connectivity for Mac and Windows.",
    tags: ["keyboard", "typing", "gaming", "mechanical", "wireless", "keychron", "rgb"],
    specs: {
      "Brand": "Keychron",
      "Layout": "75% compact",
      "Switches": "Gateron G Pro (Red/Blue/Brown)",
      "Battery": "4000 mAh"
    },
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 9,
    name: "Logitech G502 HERO Mouse",
    category: "Gaming",
    price: 49,
    rating: 4.7,
    description: "High-performance wired gaming mouse with a 25K DPI sensor, 11 customizable buttons, adjustable weights, and customizable LIGHTSYNC RGB lighting.",
    tags: ["mouse", "gaming", "logitech", "wired", "rgb", "ergonomic"],
    specs: {
      "Brand": "Logitech",
      "Sensor": "HERO 25K",
      "Buttons": "11 programmable",
      "Weight": "Adjustable (5x 3.6g weights)"
    },
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    name: "Dell 27\" 4K UHD Monitor",
    category: "Gaming",
    price: 299,
    rating: 4.5,
    description: "Stunning 4K UHD resolution, built-in dual speakers, and AMD FreeSync technology make this monitor perfect for both productive work and immersive casual gaming.",
    tags: ["monitor", "screen", "4k", "dell", "work", "display", "gaming"],
    specs: {
      "Brand": "Dell",
      "Size": "27 inches",
      "Resolution": "3840 x 2160 (4K)",
      "Ports": "2x HDMI, 1x DisplayPort"
    },
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 11,
    name: "Ergonomic Mesh Office Chair",
    category: "Home & Office",
    price: 189,
    rating: 4.4,
    description: "Stay comfortable all day with breathable mesh backing, adjustable lumbar support, 3D armrests, and a pneumatic seat height adjustment mechanism.",
    tags: ["chair", "furniture", "office", "ergonomic", "comfort", "desk"],
    specs: {
      "Material": "Breathable mesh & heavy-duty steel",
      "Support": "Adjustable lumbar and headrest",
      "Capacity": "Up to 300 lbs"
    },
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 12,
    name: "Dimmable LED Desk Lamp",
    category: "Home & Office",
    price: 29,
    rating: 4.2,
    description: "Modern eye-caring desk lamp with 5 color temperatures, 10 brightness levels, auto-timer, and a built-in USB port to charge your phone while working.",
    tags: ["lamp", "light", "office", "desk", "budget", "accessories"],
    specs: {
      "Light Source": "LED (non-flickering)",
      "USB Port": "5V/1A output",
      "Timer": "30 / 60 minutes auto-off"
    },
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 13,
    name: "Fitbit Charge 6 Tracker",
    category: "Fitness",
    price: 159,
    rating: 4.3,
    description: "Track your health and fitness with built-in GPS, active zone minutes, sleep scores, 24/7 heart rate monitoring, and integrated YouTube Music controls.",
    tags: ["fitness", "watch", "smart", "health", "tracker", "gps", "wearable"],
    specs: {
      "Brand": "Fitbit",
      "Battery Life": "Up to 7 days",
      "Water Resistance": "Up to 50 meters",
      "Sensors": "GPS, heart rate, ECG, EDA"
    },
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 14,
    name: "Hydro Flask 32 oz Wide Mouth",
    category: "Fitness",
    price: 44,
    rating: 4.8,
    description: "Double-wall vacuum insulated stainless steel water bottle keeps cold drinks icy for up to 24 hours and hot drinks piping hot for up to 12 hours.",
    tags: ["water", "bottle", "flask", "fitness", "travel", "hiking", "insulated"],
    specs: {
      "Brand": "Hydro Flask",
      "Capacity": "32 oz",
      "Material": "18/8 Pro-Grade Stainless Steel",
      "BPA Free": "Yes"
    },
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80"
  }
];
