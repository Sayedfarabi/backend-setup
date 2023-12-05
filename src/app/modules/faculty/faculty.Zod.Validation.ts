import { z } from 'zod'

const createUserNameZodValidationSchema = z.object({
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

const updateUserNameZodValidationSchema = z.object({
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
    )
    .optional(),
  middleName: z.string().optional().optional(),
  lastName: z
    .string()
    .min(1)
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must only contain alphabetic characters',
    })
    .optional(),
})

const createFacultyZodValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      designation: z
        .string()
        .refine(
          (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
          {
            message:
              'Designation must start with an uppercase letter and be in capitalize format',
          },
        ),
      name: createUserNameZodValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNumber: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'B+', 'AB+', 'O+', 'O-', 'B-', 'A-', 'AB-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

const updateFacultyZodValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z
        .string()
        .refine(
          (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
          {
            message:
              'Designation must start with an uppercase letter and be in capitalize format',
          },
        )
        .optional(),
      name: updateUserNameZodValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNumber: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'B+', 'AB+', 'O+', 'O-', 'B-', 'A-', 'AB-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      academicFaculty: z.string().optional(),
      academicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const facultyZodValidations = {
  createFacultyZodValidationSchema,
  updateFacultyZodValidationSchema,
}
