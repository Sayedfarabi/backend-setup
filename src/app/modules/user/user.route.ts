import express from 'express'
import { UserControllers } from './user.controllers'
import { studentZodValidations } from '../student/student.Zod.validation'
import validateRequest from '../../middlewares/validateRequest'
import { facultyZodValidations } from '../faculty/faculty.Zod.Validation'
import { adminZodValidations } from '../admin/admin.Zod.Validation'
import { USER_ROLE } from './user.constant'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentZodValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
)
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(facultyZodValidations.createFacultyZodValidationSchema),
  UserControllers.createFaculty,
)
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(adminZodValidations.createAdminZodValidationSchema),
  UserControllers.createAdmin,
)

export const UserRouter = router
