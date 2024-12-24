
import zod from "zod";

export const restaurantSignupSchema = zod.object({
   
    email:zod.string().email(),
    password:zod.string().min(6),

})

export const restaurantSigninSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})

export const restaurantOnboardingSchema  = zod.object({
    restaurantName: zod.string(),
    contactNum:zod.string(),
    city:zod.string()
})      