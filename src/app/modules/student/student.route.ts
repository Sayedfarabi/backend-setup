import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentZodValidations } from './student.Zod.validation'

const router = express.Router()

router.get('/', StudentControllers.getStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.patch(
  '/:studentId',
  validateRequest(studentZodValidations.updateStudentZodValidationSchema),
  StudentControllers.updateStudent,
)
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRouter = router
