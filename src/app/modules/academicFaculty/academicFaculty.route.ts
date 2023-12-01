import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyZodValidations } from './academicFaculty.Zod.Validation'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyZodValidations.createAcademicFacultyZodValidation,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyZodValidations.updateAcademicFacultyZodValidation,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)
router.delete('/:facultyId', AcademicFacultyControllers.deleteAcademicFaculty)

export const AcademicFacultyRouter = router
