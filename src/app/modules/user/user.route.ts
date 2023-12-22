import express from 'express'
import { UserControllers } from './user.controllers'
import { studentZodValidations } from '../student/student.Zod.validation'
import validateRequest from '../../middlewares/validateRequest'
import { facultyZodValidations } from '../faculty/faculty.Zod.Validation'
import { adminZodValidations } from '../admin/admin.Zod.Validation'
import { USER_ROLE } from './user.constant'
import auth from '../../middlewares/auth'
import { userZodValidations } from './user.zod.validation'
import { upload } from '../../utils/sendImageToCloudinary'
import { parseJSON } from './parseJSON'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  parseJSON(),
  validateRequest(studentZodValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('file'),
  parseJSON(),
  validateRequest(facultyZodValidations.createFacultyZodValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  upload.single('file'),
  parseJSON(),
  validateRequest(adminZodValidations.createAdminZodValidationSchema),
  UserControllers.createAdmin,
)

router.get('/me', auth('admin', 'faculty', 'student'), UserControllers.getMe)

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userZodValidations.changeStatusValidationSchema),
  UserControllers.changeUserStatus,
)

export const UserRouter = router
