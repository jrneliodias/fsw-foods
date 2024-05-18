import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "The email is required." }),
  password: z.string().min(1, { message: "The password is required." }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  confirmPassword: z.string(),
});
