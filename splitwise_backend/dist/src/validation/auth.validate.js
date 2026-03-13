import { z } from "zod";
const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" })
        .min(5, { message: "Email should be at least 5 characters" })
        .max(35, { message: "Email should not be more than 35 characters" }),
    password: z
        .string()
        .trim()
        .min(1, { message: "Password is required" })
        .min(7, { message: "Password should be at least 7 characters" })
        .max(15, { message: "Password should not be more than 15 characters" }),
});
const codeSchema = z.object({
    code: z.string().trim()
});
const signUpSchema = loginSchema.extend({
    name: z
        .string()
        .trim()
        .nonempty({ message: "Name is required" })
        .min(3, { message: "Name should be at least 3 characters" })
        .max(20, { message: "Name should not be more than 20 characters" }),
});
export const signUpSchema1 = z.union([signUpSchema, codeSchema]);
export const loginSchema1 = z.union([loginSchema, codeSchema]);
