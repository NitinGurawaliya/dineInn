import { Router,Request,Response } from "express";
import express from "express"

import { menuUpload, myRestaurantMenu, restaurantDetails, restaurantMenu, signin, signup} from "../controllers/restaurant.controller"
import multer from "multer"
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../cloudinaryConfig"
import { authMiddleware } from "../middleware/authMiddleware";


const restaurantRouter = Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: 'restaurant_menus',
      format: async (req: Express.Request, file: Express.Multer.File) => 'jpg',
      public_id: (req: Express.Request, file: Express.Multer.File) => file.originalname.split('.')[0],
    } as any, // Bypass type error by casting to any
  });
  

  const upload = multer({ 
    storage ,
    limits:{
      fileSize:5 * 1024 * 1024
    }
  });

restaurantRouter.use(express.json({ limit: "10mb" }));
restaurantRouter.use(express.urlencoded({ limit: "10mb", extended: true }));
restaurantRouter.post("/signup", signup);
restaurantRouter.post("/signin", signin);
restaurantRouter.post("/onboarding",authMiddleware,restaurantDetails)

restaurantRouter.post('/menu/upload',authMiddleware,upload.array('image',10),menuUpload );
// restaurantRouter.post("/qrcode",authMiddleware,upload.single('upiqr'),upiqrupload)
// restaurantRouter.get("/generate-qr-code/:restaurantId",authMiddleware,qrcodeGeneration)
restaurantRouter.get("/menu/:restaurantId",authMiddleware,myRestaurantMenu);
restaurantRouter.get("/:restaurantId",restaurantMenu);



export default restaurantRouter;
