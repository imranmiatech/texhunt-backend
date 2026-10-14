import connectDB from "./db.js";
import productModel from "../models/productModel.js";
import 'dotenv/config';

const texhuntProducts = [
  {
    name: "Men's Minimalist Linen Casual Shirt",
    description: "Tailored from 100% breathable organic linen with a modern mandarin collar and relaxed drape for effortless warm-weather elegance.",
    price: 1850,
    image: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now() - 1000000
  },
  {
    name: "Women's Oversized Ribbed Knit Cardigan",
    description: "Ultra-soft premium cotton-blend knit featuring dropped shoulders, tortoiseshell buttons, and a cozy relaxed silhouette.",
    price: 2450,
    image: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["XS", "S", "M", "L"],
    bestseller: true,
    date: Date.now() - 2000000
  },
  {
    name: "Men's Heavyweight Fleece Urban Hoodie",
    description: "420 GSM french terry cotton hoodie crafted with double-needle stitching, kangaroo pouch, and structured hood for premium street style.",
    price: 2199,
    image: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now() - 3000000
  },
  {
    name: "Women's Floral Summer A-Line Dress",
    description: "Delicate botanical print on breezy chiffon fabric, detailed with flutter sleeves, a cinched waistline, and fluid movement.",
    price: 2850,
    image: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 4000000
  },
  {
    name: "Men's Slim Tapered Stretch Denim Jeans",
    description: "Classic five-pocket jeans crafted from selvedge-inspired comfort stretch denim with an authentic vintage wash.",
    price: 2600,
    image: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    bestseller: true,
    date: Date.now() - 5000000
  },
  {
    name: "Women's High-Rise Tailored Wide Leg Trousers",
    description: "Crisp pleated trousers with an elegant high waist, front crease, and relaxed wide leg cut for boardroom or dinner chic.",
    price: 2200,
    image: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now() - 6000000
  },
  {
    name: "Men's Vintage Suede Bomber Jacket",
    description: "Refined faux suede jacket with ribbed hem and cuffs, brass metallic hardware, and smooth satin interior lining.",
    price: 4500,
    image: [
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    date: Date.now() - 7000000
  },
  {
    name: "Women's Classic Double-Breasted Trench Coat",
    description: "Timeless water-resistant cotton gabardine trench coat featuring storm flaps, belted waist, and horn-look buttons.",
    price: 5200,
    image: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 8000000
  },
  {
    name: "Men's Smart Casual Chino Pants",
    description: "Garment-dyed stretch cotton twill chinos designed for day-to-night versatility and lasting comfort.",
    price: 1950,
    image: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    bestseller: false,
    date: Date.now() - 9000000
  },
  {
    name: "Women's Washed Indigo Trucker Denim Jacket",
    description: "Iconic trucker silhouette in washed pure cotton denim with chest flap pockets and adjustable waist tabs.",
    price: 3100,
    image: [
      "https://images.unsplash.com/photo-1525450824786-227cbef70703?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now() - 10000000
  },
  {
    name: "Kids' Organic Cotton Graphic Crew Tee",
    description: "Gentle 100% combed organic cotton jersey with kid-safe water-based graphic print and tagless neck.",
    price: 750,
    image: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    bestseller: true,
    date: Date.now() - 11000000
  },
  {
    name: "Kids' Cozy Fleece Pullover Hoodie",
    description: "Super soft brushed fleece hoodie with stretchy ribbed trims for playful warmth and all-day comfort.",
    price: 1250,
    image: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    bestseller: false,
    date: Date.now() - 12000000
  },
  {
    name: "Kids' Elastic-Waist Comfort Jeans",
    description: "Durable stretch cotton denim equipped with an adjustable interior elastic waistband and reinforced knees.",
    price: 1100,
    image: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Bottomwear",
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    bestseller: false,
    date: Date.now() - 13000000
  },
  {
    name: "Men's Premium Oxford Button-Down Shirt",
    description: "Crisp 100% two-ply cotton oxford cloth with mother-of-pearl buttons and a classic structured silhouette.",
    price: 1990,
    image: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now() - 14000000
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    const count = await productModel.countDocuments();
    if (count === 0) {
      await productModel.insertMany(texhuntProducts);
      console.log(`Successfully seeded ${texhuntProducts.length} TexHunt clothing products into MongoDB!`);
    } else {
      console.log(`Database already has ${count} products.`);
    }
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
