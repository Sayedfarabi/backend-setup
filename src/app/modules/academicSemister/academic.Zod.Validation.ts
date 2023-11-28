import { z } from 'zod'
import {
  semesterCodes,
  semesterMonths,
  semesterNames,
} from './academicSemisterConstant'
import { TCode, TMonths, TName } from './academicSemester.interface'

const createAcademicSemesterZodValidationSchema = z.object({
  body: z.object({
    name: z.enum(semesterNames as [TName]),
    code: z.enum(semesterCodes as [TCode]),
    year: z.string(),
    startMonth: z.enum(semesterMonths as [TMonths]),
    endMonth: z.enum(semesterMonths as [TMonths]),
  }),
})

export const AcademicSemesterZodValidationSchema = {
  createAcademicSemesterZodValidationSchema,
}
