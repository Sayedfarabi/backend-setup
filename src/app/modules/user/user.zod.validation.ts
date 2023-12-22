import { z } from 'zod'
import { UserStatus } from './user.constant'

const userZodValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .max(20, 'Password can not be more than 20 characters')
    .optional(),
})

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
})

export const userZodValidations = {
  userZodValidationSchema,
  changeStatusValidationSchema,
}
