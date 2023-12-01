import { z } from 'zod'

const createAcademicFacultyZodValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be string',
    }),
  }),
})

const updateAcademicFacultyZodValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be string',
    }),
  }),
})

export const AcademicFacultyZodValidations = {
  createAcademicFacultyZodValidation,
  updateAcademicFacultyZodValidation,
}
