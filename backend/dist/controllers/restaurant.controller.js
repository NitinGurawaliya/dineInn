"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantMenu = exports.qrcodeGeneration = exports.myRestaurantMenu = exports.menuUpload = exports.restaurantDetails = exports.signin = exports.signup = exports.StatusCode = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("../zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const qrcode_1 = __importDefault(require("qrcode"));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["BADREQ"] = 400] = "BADREQ";
    StatusCode[StatusCode["NOTFOUND"] = 404] = "NOTFOUND";
    StatusCode[StatusCode["NOTPERMISSION"] = 403] = "NOTPERMISSION";
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { success } = zod_1.restaurantSignupSchema.safeParse(body);
        if (!success) {
            res.status(StatusCode.BADREQ).json({ msg: "Invalid data sent" });
            return;
        }
        const findUnique = yield prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (findUnique) {
            res.status(StatusCode.BADREQ).json({ msg: "User already exists " });
            return;
        }
        const user = yield prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(StatusCode.SUCCESS).json({
            token,
            userId: user.id
        });
    }
    catch (error) {
        console.log(error);
        res.status(StatusCode.NOTFOUND).json({ msg: "Internal server error " });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userId = req.userId;
    const { success } = zod_1.restaurantSigninSchema.safeParse(body);
    if (!success) {
        res.status(StatusCode.BADREQ).json({ msg: "Invalid data sent" });
        return;
    }
    const findUser = yield prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if (!findUser) {
        res.status(StatusCode.NOTFOUND).json({ msg: "User donot exists" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: findUser.id }, process.env.JWT_SECRET);
    res.status(StatusCode.SUCCESS).json({ token, userId: findUser.id });
    return;
});
exports.signin = signin;
const restaurantDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = zod_1.restaurantOnboardingSchema.safeParse(body);
    if (!success) {
        res.status(StatusCode.BADREQ).json({ msg: "Invalid data sent" });
        return;
    }
    const restaurantDetails = yield prisma.restaurantDetails.create({
        data: {
            restaurantName: body.restaurantName,
            contactNum: body.contactNum,
            city: body.city,
            userId: req.userId,
            WeekdaysWorking: body.WeekdaysWorking,
            WeekendWorking: body.WeekendWorking
        }
    });
    res.status(StatusCode.SUCCESS).json(restaurantDetails);
});
exports.restaurantDetails = restaurantDetails;
const menuUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId; // Comes from middleware
        const restaurantId = req.restaurantId; // Comes from middleware
        const title = req.body.title;
        console.log(restaurantId);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized: User not logged in" });
            return;
        }
        if (!req.files || !Array.isArray(req.files)) {
            res.status(400).json({ error: "No images provided" });
            return;
        }
        const uploadedMenus = yield Promise.all(req.files.map((file) => prisma.menu.create({
            data: {
                restaurantDetailsId: restaurantId, // Use restaurantId from middleware
                imageUrl: file.path,
                title,
            },
        })));
        res.status(200).json({ menu: uploadedMenus });
    }
    catch (error) {
        console.error("Error uploading menus:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.menuUpload = menuUpload;
const myRestaurantMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantId = parseInt(req.params.restaurantId);
    const restaurantDetailsId = req.restaurantId;
    if (restaurantId != restaurantDetailsId) {
        res.status(StatusCode.NOTPERMISSION).json({ msg: "You cannot access this menu " });
        return;
    }
    const restaurant_menu = yield prisma.menu.findMany({
        where: {
            restaurantDetailsId: restaurantId
        },
    });
    const restaurantName = yield prisma.restaurantDetails.findUnique({
        where: {
            id: restaurantDetailsId
        },
        select: {
            restaurantName: true,
            contactNum: true,
            city: true,
        }
    });
    res.status(StatusCode.SUCCESS).json({ restaurant_menu, restaurantName });
    return;
});
exports.myRestaurantMenu = myRestaurantMenu;
const qrcodeGeneration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantId = parseInt(req.params.restaurantId);
    const restaurantDetails = yield prisma.restaurantDetails.findUnique({
        where: {
            id: restaurantId
        }
    });
    const frontendUrl = `https://dine-inn.vercel.app/menu/${restaurantId}`;
    qrcode_1.default.toDataURL(frontendUrl, function (err, url) {
        if (err) {
            res.status(StatusCode.NOTFOUND).json({ msg: "Failed to gen qr code " });
            return;
        }
        console.log(url);
        res.status(StatusCode.SUCCESS).json({ qrCodeUrl: url, restaurantDetails });
    });
});
exports.qrcodeGeneration = qrcodeGeneration;
const restaurantMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantId = parseInt(req.params.restaurantId, 10);
        if (isNaN(restaurantId)) {
            res.status(400).json({ error: "Invalid restaurant ID." });
            return;
        }
        const menus = yield prisma.menu.findMany({
            where: {
                restaurantDetailsId: restaurantId,
            },
        });
        const resName = yield prisma.restaurantDetails.findUnique({
            where: {
                id: restaurantId
            },
            select: {
                restaurantName: true,
                contactNum: true,
                city: true
            }
        });
        if (!menus.length) {
            res.status(404).json({ message: "No menus found for this restaurant." });
            return;
        }
        res.status(200).json({ menus, resName });
    }
    catch (error) {
        console.error("Error fetching menus:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.restaurantMenu = restaurantMenu;
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
