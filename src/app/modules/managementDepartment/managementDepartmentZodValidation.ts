import { z } from 'zod'

const createManagementZodValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
  }),
})

const updateManagementZodValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
})

export const ManagementDepartmentZodValidations = {
  createManagementZodValidationSchema,
  updateManagementZodValidationSchema,
}
