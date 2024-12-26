import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { restaurantOnboardingSchema, restaurantSigninSchema, restaurantSignupSchema } from "../zod";
import jwt from "jsonwebtoken"
import QRCode from "qrcode";
import exp from "constants";

export enum StatusCode {
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSION = 403,
    SUCCESS = 200
}
const prisma = new PrismaClient({
    datasources:{
        db:{
            url:process.env.DATABASE_URL
        }
    }
})


export const signup: RequestHandler = async (req, res): Promise<void> => {
   try {
    const body = req.body;
    const { success } = restaurantSignupSchema.safeParse(body);

    if (!success) {
        res.status(StatusCode.BADREQ).json({ msg: "Invalid data sent" });
        return;
    }

    const findUnique = await prisma.user.findUnique({
        where:{
            email:body.email
        }
    })

    if(findUnique){
        res.status(StatusCode.BADREQ).json({msg:"User already exists "})
        return
    }

    const user  = await prisma.user.create({
        data:{
            email:body.email,
            password:body.password,

        }
    })

    const token = jwt.sign({id:user.id},process.env.JWT_SECRET as "string")

     
    res.status(StatusCode.SUCCESS).json({
        token,
        userId:user.id
    });
    
   } catch (error) {
    console.log(error)
    res.status(StatusCode.NOTFOUND).json({msg:"Internal server error "})
   }
    
};


export const signin:RequestHandler = async(req,res): Promise<void>=>{

    const body = req.body;
    const userId = req.userId;

    const {success} = restaurantSigninSchema.safeParse(body);

    if(!success){
        res.status(StatusCode.BADREQ).json({msg:"Invalid data sent"});
        return;
    }

    const findUser = await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })

    if(!findUser){
        res.status(StatusCode.NOTFOUND).json({msg:"User donot exists"})
        return
    }

    const token  =  jwt.sign({id:findUser.id},process.env.JWT_SECRET!)

    res.status(StatusCode.SUCCESS).json({token,userId:findUser.id})
    return;
}

export const restaurantDetails:RequestHandler = async(req,res):Promise<void>=>{

    const body   = req.body;

    const {success} = restaurantOnboardingSchema.safeParse(body);

    if(!success){
        res.status(StatusCode.BADREQ).json({msg:"Invalid data sent"})
        return;
    }


    const restaurantDetails = await prisma.restaurantDetails.create({
        data:{
            restaurantName:body.restaurantName,
            contactNum:body.contactNum,
            city:body.city,
            userId:req.userId,
            WeekdaysWorking:body.WeekdaysWorking,
            WeekendWorking:body.WeekendWorking
            
        }
    })

    res.status(StatusCode.SUCCESS).json(restaurantDetails)
}

export const menuUpload: RequestHandler = async (req, res): Promise<void> => {
    try {
      const userId = req.userId; // Comes from middleware
      const restaurantId = req.restaurantId; // Comes from middleware
      const title = req.body.title;
      console.log(restaurantId)
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized: User not logged in" });
        return;
      }
  
      if (!req.files || !Array.isArray(req.files)) {
        res.status(400).json({ error: "No images provided" });
        return;
      }
  
      const uploadedMenus = await Promise.all(
        req.files.map((file: Express.Multer.File) =>
          prisma.menu.create({
            data: {
              restaurantDetailsId: restaurantId, // Use restaurantId from middleware
              imageUrl: file.path,
              title,
            },
          })
        )
      );
  
      res.status(200).json({ menu: uploadedMenus });
    } catch (error) {
      console.error("Error uploading menus:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };
  

  
export const myRestaurantMenu:RequestHandler = async(req,res) :Promise<void> =>{
    const restaurantId = parseInt(req.params.restaurantId);
    const restaurantDetailsId = req.restaurantId;

    if(restaurantId !=restaurantDetailsId ){
         res.status(StatusCode.NOTPERMISSION).json({msg:"You cannot access this menu "})
         return
    }

    const restaurant_menu = await prisma.menu.findMany({
       where:{
        restaurantDetailsId:restaurantId
       },
    })

    const restaurantName = await prisma.restaurantDetails.findUnique({
        where:{
            id:restaurantDetailsId
        },
        select:{
            restaurantName:true,
            contactNum:true,
            city:true,


        }
    })

    res.status(StatusCode.SUCCESS).json({restaurant_menu,restaurantName})
    return
} 

export const qrcodeGeneration:RequestHandler = async(req,res) :Promise<void> =>{
    const restaurantId = parseInt(req.params.restaurantId);

    const restaurantDetails = await prisma.restaurantDetails.findUnique({
        where:{
            id:restaurantId
        }
    })

    const frontendUrl = `https://dine-inn.vercel.app/menu/${restaurantId}`

    QRCode.toDataURL(frontendUrl,function(err,url){
        if(err) {
            res.status(StatusCode.NOTFOUND).json({msg:"Failed to gen qr code "})
            return
        }

        console.log(url);
        res.status(StatusCode.SUCCESS).json({qrCodeUrl: url,restaurantDetails})
    })
}

export const restaurantMenu:RequestHandler = async(req,res):Promise<void>=>{
    try {
        const restaurantId = parseInt(req.params.restaurantId, 10); 
    
        if (isNaN(restaurantId)) {
           res.status(400).json({ error: "Invalid restaurant ID." });
           return
        }
    
        const menus = await prisma.menu.findMany({
          where: {
            restaurantDetailsId: restaurantId,
          },
        });

        const resName = await prisma.restaurantDetails.findUnique({
            where:{
                id:restaurantId
            },
            select:{
                restaurantName:true,
                contactNum:true,
                city:true
            }
        })
    
        if (!menus.length) {
           res.status(404).json({ message: "No menus found for this restaurant." });
           return
        }
    
        res.status(200).json({menus,resName});
      } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    
}

// export const upiqrupload:RequestHandler = async(req,res):Promise<void>=>{

//     const userId = req.userId;

//     if(!userId){
//         res.status(StatusCode.NOTPERMISSION).json({error:"User not authorized"})
//         return;
//     }

//     if(!req.file){
//         res.status(400).json({ error: "No image provided" });
//       return;
//     }

//     const file = req.file; // Single file is available directly on `req.file`

//     const upiqr = await prisma.upiQr.create({
//         data:{
//             restaurantDetailsId:req.restaurantId,
//             qrCodeUrl:file.path
//         }
//     })
    
    

// }