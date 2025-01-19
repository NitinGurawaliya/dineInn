"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOnboardingSchema = exports.restaurantSigninSchema = exports.restaurantSignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.restaurantSignupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.restaurantSigninSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.restaurantOnboardingSchema = zod_1.default.object({
    restaurantName: zod_1.default.string(),
    contactNum: zod_1.default.string(),
    city: zod_1.default.string(),
    WeekdaysWorking: zod_1.default.string().optional(),
    WeekendWorking: zod_1.default.string().optional(),
    Instagram: zod_1.default.string().optional(),
    Facebook: zod_1.default.string().optional(),
    bgColor: zod_1.default.string().optional(),
    componentColor: zod_1.default.string().optional()
});
