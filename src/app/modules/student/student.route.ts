import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentZodValidations } from './student.Zod.validation'

const router = express.Router()

router.get('/', StudentControllers.getStudents)
router.get('/:id', StudentControllers.getSingleStudent)
router.patch(
  '/:id',
  validateRequest(studentZodValidations.updateStudentZodValidationSchema),
  StudentControllers.updateStudent,
)
router.delete('/:id', StudentControllers.deleteStudent)

export const StudentRouter = router
