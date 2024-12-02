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
exports.menuUpload = exports.signin = exports.signup = exports.StatusCode = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("../zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
                restaurantName: body.restaurantName,
                password: body.password
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(StatusCode.SUCCESS).json({
            token,
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
    res.status(StatusCode.SUCCESS).json({ token });
    return;
});
exports.signin = signin;
const menuUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        console.log(req.userId);
        const title = req.body.title;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized: User not logged in" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ error: "No image provided" });
            return;
        }
        const newMenu = yield prisma.menu.create({
            data: {
                userId: userId,
                imageUrl: req.file.path,
                title,
            },
        });
        res.status(200).json({ menu: newMenu });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.menuUpload = menuUpload;
