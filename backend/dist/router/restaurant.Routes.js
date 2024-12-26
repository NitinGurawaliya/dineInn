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
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinaryConfig_1 = __importDefault(require("../cloudinaryConfig"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const restaurantRouter = (0, express_1.Router)();
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinaryConfig_1.default.v2,
    params: {
        folder: 'restaurant_menus',
        format: (req, file) => __awaiter(void 0, void 0, void 0, function* () { return 'jpg'; }),
        public_id: (req, file) => file.originalname.split('.')[0],
    }, // Bypass type error by casting to any
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
restaurantRouter.use(express_2.default.json({ limit: "10mb" }));
restaurantRouter.use(express_2.default.urlencoded({ limit: "10mb", extended: true }));
restaurantRouter.post("/signup", restaurant_controller_1.signup);
restaurantRouter.post("/signin", restaurant_controller_1.signin);
restaurantRouter.post("/onboarding", authMiddleware_1.authMiddleware, restaurant_controller_1.restaurantDetails);
restaurantRouter.post('/menu/upload', authMiddleware_1.authMiddleware, upload.array('image', 10), restaurant_controller_1.menuUpload);
// restaurantRouter.post("/qrcode",authMiddleware,upload.single('upiqr'),upiqrupload)
restaurantRouter.get("/generate-qr-code/:restaurantId", authMiddleware_1.authMiddleware, restaurant_controller_1.qrcodeGeneration);
restaurantRouter.get("/menu/:restaurantId", authMiddleware_1.authMiddleware, restaurant_controller_1.myRestaurantMenu);
restaurantRouter.get("/:restaurantId", restaurant_controller_1.restaurantMenu);
exports.default = restaurantRouter;
