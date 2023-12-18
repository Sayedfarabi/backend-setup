import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OfferedCourseControllers } from './offeredCourse.controllers'
import { OfferedCourseValidations } from './offeredCourse.Zod.Validation'

const router = express.Router()

router.get('/', OfferedCourseControllers.getAllOfferedCourses)

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses)

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
)

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
)

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourseFromDB)

export const offeredCourseRoutes = router
