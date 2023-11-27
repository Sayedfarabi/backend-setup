import express from 'express'
import { UserControllers } from './user.controllers'
import { studentZodValidations } from '../student/student.Zod.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentZodValidations.createStudentZodValidationSchema),
  UserControllers.createStudent,
)
// router.post('/create-faculty', UserControllers.createFaculty)
// router.post('/create-admin', UserControllers.createAdmin)

export const UserRouter = router
