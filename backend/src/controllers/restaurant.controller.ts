import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { restaurantOnboardingSchema, restaurantSigninSchema, restaurantSignupSchema } from "../zod";
import jwt from "jsonwebtoken"
import QRCode from "qrcode";

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


export const restaurantDetails: RequestHandler = async (req, res): Promise<void> => {
    const body = req.body;
  
    try {
      const files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
  
      const { success } = restaurantOnboardingSchema.safeParse(body);
  
      if (!success) {
         res.status(StatusCode.BADREQ).json({ msg: 'Invalid data' });
         return
      }
  
      // Safely access files
      const upiQrUrl = files?.['upiQr']?.[0]?.path || null;
      const logo = files?.['Logo']?.[0]?.path || null;
  
      const restaurantDetails = await prisma.restaurantDetails.create({
        data: {
          restaurantName: body.restaurantName,
          contactNum: body.contactNum,
          city: body.city,
          userId: req.userId,
          WeekdaysWorking: body.WeekdaysWorking,
          WeekendWorking: body.WeekendWorking,
          upiQrUrl,
          Facebook: body.Facebook,
          Instagram: body.Instagram,
          Logo:logo,
          bgColor:body.bgColor,
          componentColor:body.componentColor
          
        },
      });
  
      res.status(StatusCode.SUCCESS).json(restaurantDetails);
    } catch (error) {
      console.error(error);
      res.status(StatusCode.BADREQ).json({ msg: 'Internal server error' });
    }
};
  
export const menuUpload: RequestHandler = async (req, res): Promise<void> => {
    try {
      const userId = req.userId; // Comes from middleware
      const restaurantId = req.restaurantId; // Comes from middleware
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

    const frontendUrl = `https://dine-inn.vercel.app/menu/home/${restaurantId}`

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
                city:true,
                upiQrUrl:true,
                WeekdaysWorking:true,
                WeekendWorking:true,
                Logo:true,
                Instagram:true,
                Facebook:true,
                bgColor:true,
                componentColor:true
            }
        })

        const resContact = await prisma.user.findFirst({
          where:{
            id:restaurantId
          },
          select:{
            email:true,
          }
        })
    
        if (!menus.length) {
           res.status(404).json({ message: "No menus found for this restaurant." });
           return
        }
    
        res.status(200).json({menus,resName,resContact});
      } catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    
}

// Get restaurant details for dashboard
export const getRestaurantDetails: RequestHandler = async (req, res): Promise<void> => {
  try {
    const restaurantId = req.restaurantId;
    
    const restaurantDetails = await prisma.restaurantDetails.findUnique({
      where: {
        id: restaurantId,
      },
      include: {
        menus: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!restaurantDetails) {
      res.status(404).json({ error: "Restaurant not found" });
      return;
    }

    res.status(200).json(restaurantDetails);
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update restaurant details
export const updateRestaurantDetails: RequestHandler = async (req, res): Promise<void> => {
  try {
    const restaurantId = req.restaurantId;
    const body = req.body;
    const files = req.files as { [key: string]: Express.Multer.File[] } | undefined;

    // Safely access files
    const upiQrUrl = files?.['upiQr']?.[0]?.path || undefined;
    const logo = files?.['Logo']?.[0]?.path || undefined;

    const updateData: any = {
      restaurantName: body.restaurantName,
      contactNum: body.contactNum,
      city: body.city,
      WeekdaysWorking: body.WeekdaysWorking,
      WeekendWorking: body.WeekendWorking,
      Facebook: body.Facebook,
      Instagram: body.Instagram,
      bgColor: body.bgColor,
      componentColor: body.componentColor,
    };

    // Only update file fields if new files are provided
    if (upiQrUrl) updateData.upiQrUrl = upiQrUrl;
    if (logo) updateData.Logo = logo;

    const updatedRestaurant = await prisma.restaurantDetails.update({
      where: {
        id: restaurantId,
      },
      data: updateData,
    });

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update menu item
export const updateMenuItem: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { menuId } = req.params;
    const { title } = req.body;
    const files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
    const restaurantId = req.restaurantId;

    // Verify the menu item belongs to the restaurant
    const existingMenu = await prisma.menu.findFirst({
      where: {
        id: parseInt(menuId),
        restaurantDetailsId: restaurantId,
      },
    });

    if (!existingMenu) {
      res.status(404).json({ error: "Menu item not found" });
      return;
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    
    const imageUrl = files?.['image']?.[0]?.path;
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updatedMenu = await prisma.menu.update({
      where: {
        id: parseInt(menuId),
      },
      data: updateData,
    });

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete menu item
export const deleteMenuItem: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { menuId } = req.params;
    const restaurantId = req.restaurantId;

    // Verify the menu item belongs to the restaurant
    const existingMenu = await prisma.menu.findFirst({
      where: {
        id: parseInt(menuId),
        restaurantDetailsId: restaurantId,
      },
    });

    if (!existingMenu) {
      res.status(404).json({ error: "Menu item not found" });
      return;
    }

    await prisma.menu.delete({
      where: {
        id: parseInt(menuId),
      },
    });

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete restaurant (cascade delete)
export const deleteRestaurant: RequestHandler = async (req, res): Promise<void> => {
  try {
    const restaurantId = req.restaurantId;
    const userId = req.userId;

    // Delete restaurant and all associated data
    await prisma.restaurantDetails.delete({
      where: {
        id: restaurantId,
      },
    });

    // Optionally delete user account as well
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
