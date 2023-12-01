import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentZodValidations } from './academicDepartment.Zod.Validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentZodValidations.createAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentZodValidations.updateAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)
router.get('/', AcademicDepartmentControllers.getAllAcademicFaculties)

export const AcademicDepartmentRouter = router
