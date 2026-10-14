import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Windows & local ISP DNS failure with MongoDB SRV records (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (error) {
  console.log("DNS setServers notice:", error.message);
}

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log("DB Connected successfully");
  });

  const uri = process.env.MONGODB_URI || process.env.url;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env file");
  }

  // Format URI so database name (/e-commerce) is placed before any query parameters
  let connectionString = uri.trim();
  if (!connectionString.includes('/e-commerce')) {
    if (connectionString.includes('?')) {
      const [base, query] = connectionString.split('?');
      connectionString = `${base.replace(/\/$/, '')}/e-commerce?${query}`;
    } else {
      connectionString = `${connectionString.replace(/\/$/, '')}/e-commerce`;
    }
  }

  await mongoose.connect(connectionString);
};

export default connectDB;