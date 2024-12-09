
import zod from "zod";

export const restaurantSignupSchema = zod.object({
    restaurantName: zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6),
    ContactNum:zod.string(),
    City:zod.string()
})

export const restaurantSigninSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})