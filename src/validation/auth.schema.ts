import { isEmailExist } from "services/client/auth.service";
import { z } from "zod";

export const emailSchema = z.string().email({ message: "Invalid email address" })
    .refine(async (username) => {
        const existingEmails = await isEmailExist(username);
        return !existingEmails;
    }, 
    { 
        message: "Email already exists" ,
        path: ["username"]
    });

export const passwordSchema = z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be less than 20 characters long" })
    // .refine((password) => /A-Z/.test(password), { message: "Password must contain at least one uppercase letter" })
    .refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lowercase letter" })
    .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number" })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), { message: "Password must contain at least one special character" });

export const RegisterSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
    username: emailSchema,
    password: passwordSchema,
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",  
    path: ["password_confirmation"]
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>