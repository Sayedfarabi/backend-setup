import { z } from 'zod'

const createAcademicDepartmentZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name is must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty Id is must be string',
      required_error: 'Academic Faculty Id is required',
    }),
  }),
})

const updateAcademicDepartmentZodValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name is must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty Id is must be string',
        required_error: 'Academic Faculty Id is required',
      })
      .optional(),
  }),
})

export const AcademicDepartmentZodValidations = {
  createAcademicDepartmentZodValidationSchema,
  updateAcademicDepartmentZodValidationSchema,
}
