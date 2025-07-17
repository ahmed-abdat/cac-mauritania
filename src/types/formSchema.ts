import { z } from "zod";

// Interface for validation messages
export interface ValidationMessages {
  firstNameRequired: string;
  lastNameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneMinLength: string;
  messageRequired: string;
}

// Function to create form schema with translated messages
export const createFormSchema = (validationMessages: ValidationMessages) => {
  return z.object({
    firstName: z
      .string()
      .min(1, { message: validationMessages.firstNameRequired }),
    lastName: z
      .string()
      .min(1, { message: validationMessages.lastNameRequired }),
    companyName: z.string().optional(),
    email: z
      .string()
      .min(1, { message: validationMessages.emailRequired })
      .email({ message: validationMessages.emailInvalid }),
    phoneNumber: z
      .string()
      .min(1, { message: validationMessages.phoneRequired })
      .min(8, { message: validationMessages.phoneMinLength }),
    message: z.string().min(1, { message: validationMessages.messageRequired }),
  });
};

// Default schema (fallback for backward compatibility)
export const FormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  companyName: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(8, { message: "Phone number must be at least 8 characters" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type FormData = z.infer<typeof FormSchema>;
