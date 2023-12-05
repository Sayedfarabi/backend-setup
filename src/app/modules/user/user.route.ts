import express from 'express'
import { UserControllers } from './user.controllers'
import { studentZodValidations } from '../student/student.Zod.validation'
import validateRequest from '../../middlewares/validateRequest'
import { facultyZodValidations } from '../faculty/faculty.Zod.Validation'
import { adminZodValidations } from '../admin/admin.Zod.Validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentZodValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
)
router.post(
  '/create-faculty',
  validateRequest(facultyZodValidations.createFacultyZodValidationSchema),
  UserControllers.createFaculty,
)
router.post(
  '/create-admin',
  validateRequest(adminZodValidations.createAdminZodValidationSchema),
  UserControllers.createAdmin,
)

export const UserRouter = router
