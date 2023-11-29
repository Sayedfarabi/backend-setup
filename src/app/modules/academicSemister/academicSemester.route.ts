import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterZodValidationSchema } from './academic.Zod.Validation'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterZodValidationSchema.createAcademicSemesterZodValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemester)

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
)

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterZodValidationSchema.updateAcademicSemesterZodValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
)

export const AcademicSemesterRouter = router
