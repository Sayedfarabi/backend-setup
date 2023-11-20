import { z } from 'zod'

const userZodValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message:
          'First name must start with an uppercase letter and be in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must only contain alphabetic characters',
    }),
})

const guardianZodValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
})

const localguardianZodValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
})

const studentZodValidationSchema = z.object({
  id: z.string(),
  name: userZodValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNumber: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'B+', 'AB+', 'O+', 'O-', 'B-', 'A-', 'AB-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianZodValidationSchema,
  localGuardian: localguardianZodValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'deactive']).default('active'),
})

export default studentZodValidationSchema