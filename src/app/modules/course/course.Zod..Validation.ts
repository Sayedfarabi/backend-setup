import { z } from 'zod'

const createPreRequisteCourseZodValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
})

const updatePreRequisteCourseZodValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
})

const createCourseZodValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Course title is required' }),
    code: z.number().int().positive({ message: 'Code number is required' }),
    credits: z.number().positive({ message: 'Credits is required' }),
    prefix: z.string().min(1, { message: 'Prefix is required' }),
    preRequisteCourses: z
      .array(createPreRequisteCourseZodValidationSchema)
      .optional(),
  }),
})

const facultiesWithCourseZodValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
})

const updateCourseZodValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Course title is required' })
      .optional(),
    code: z
      .number()
      .int()
      .positive({ message: 'Code number is required' })
      .optional(),
    credits: z.number().positive({ message: 'Credits is required' }).optional(),
    prefix: z.string().min(1, { message: 'Prefix is required' }).optional(),
    preRequisteCourses: z
      .array(updatePreRequisteCourseZodValidationSchema)
      .optional(),
  }),
})

export const CourseZodValidations = {
  createCourseZodValidationSchema,
  updateCourseZodValidationSchema,
  facultiesWithCourseZodValidationSchema,
}
