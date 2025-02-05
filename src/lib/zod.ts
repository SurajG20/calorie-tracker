import { object, string, z } from 'zod';

const getPasswordSchema = (type: 'password' | 'confirmPassword') =>
  string({ required_error: `${type} is required` })
    .min(8, `${type} must be atleast 8 characters`)
    .max(32, `${type} can not exceed 32 characters`);

const getEmailSchema = () =>
  string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email');

const getNameSchema = () =>
  string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters');

export const signUpSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
  confirmPassword: getPasswordSchema('confirmPassword'),
});

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema('password'),
});

export const userInfoSchema = z.object({
  height: z
    .union([z.number(), z.string().transform(Number)])
    .refine((val) => !isNaN(val), { message: 'Height is required' })
    .refine((val) => val >= 100 && val <= 300, { message: 'Height must be between 100 and 300 cm' }),

  weight: z
    .union([z.number(), z.string().transform(Number)])
    .refine((val) => !isNaN(val), { message: 'Weight is required' })
    .refine((val) => val >= 1 && val <= 500, { message: 'Weight must be between 1 and 500 kg' }),

  age: z
    .union([z.number(), z.string().transform(Number)])
    .refine((val) => !isNaN(val), { message: 'Age is required' })
    .refine((val) => val >= 1 && val <= 120, { message: 'Age must be between 1 and 120 years' }),

  gender: z.string().min(1, 'Gender is required').max(50, 'Gender must be less than 50 characters'),

  goal: z.string().min(1, 'Goal is required').max(50, 'Goal must be less than 50 characters'),
});
