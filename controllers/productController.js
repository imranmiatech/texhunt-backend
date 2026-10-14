import { v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";


// const addProduct = async (req, res) => {
//    try {
//         const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//         const {name, description, price, category, subCategory, sizes, bestseller} = req.body
//         const image1 = req.files.image1 && req.files.image1[0]
//         const image2 = req.files.image2 && req.files.image2[0]
//         const image3 = req.files.image3 && req.files.image3[0]
//         const image4 = req.files.image4 && req.files.image4[0]

//         const images= [image1, image2, image3, image4].filter((item) => item !== undefined)

//         let imageUrl = await Promise.all(
//             images.map(async(item) => {
//                 let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'})
//                 return result.secure_url
//             })
//         )

//         const productData = {
//             name,
//             description,
//             category,
//             price: Number(price),
//             subCategory,
//             bestseller: bestseller === "true" ? true : false,
//             sizes: JSON.parse(sizes),
//             image: imageUrl,
//             date: Date.now()
//         }
//         console.log(productData)
//         const product = new productModel(productData)
//         await product.save()
//         res.json({ success: true, message: " product Added"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message}) 
//     }
// }
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//     if (!req.files) {
//       return res.status(400).json({ success: false, message: "No images uploaded" });
//     }

//     const images = [
//       req.files.image1?.[0],
//       req.files.image2?.[0],
//       req.files.image3?.[0],
//       req.files.image4?.[0],
//     ].filter(Boolean);

//     const uploadToCloudinary = (file) =>
//       new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           { resource_type: "image" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result.secure_url);
//           }
//         ).end(file.buffer);
//       });

//     const imageUrl = await Promise.all(images.map(uploadToCloudinary));

//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestseller: bestseller === "true",
//       sizes: JSON.parse(sizes),
//       image: imageUrl,
//       date: Date.now(),
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product added successfully" });

//   } catch (error) {
//     console.error("ADD PRODUCT ERROR:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const addProduct = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // Upload images to cloudinary
    const imageUrls = [];

    for (const key in req.files) {
      const file = req.files[key][0];

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const uploadResult = await cloudinary.uploader.upload(base64);
      imageUrls.push(uploadResult.secure_url);
    }

    const product = await productModel.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      image: imageUrls,
      category: req.body.category,
      subCategory: req.body.subCategory,
      sizes: JSON.parse(req.body.sizes),
      bestseller: req.body.bestseller === "true",
      date: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})   
    }
 
}
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
         res.json({ success: true, message: " product removed"})
    } catch (error) {
          console.log(error);
        res.json({success:false, message:error.message})   
    }
}
const singleProduct = async (req, res) => {
    try {
       const {productId} = req.body
       const product = await productModel.findById(productId)
        res.json({ success: true,product})
    } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})    
    }
}

export {addProduct, listProducts, removeProduct, singleProduct}
