import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "The email is required." }),
  password: z.string().min(1, { message: "The password is required." }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "The email is required.",
  }),
  password: z.string().min(6, {
    message: "The password must be at least 6 characters long.",
  }),
  name: z.string().min(1, { message: "The name is required." }),
});
