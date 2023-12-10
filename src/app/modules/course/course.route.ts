import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseZodValidations } from './course.Zod..Validation'
import { courseControllers } from './course.controllers'

const router = Router()

router.post(
  '/create-course',
  validateRequest(CourseZodValidations.createCourseZodValidationSchema),
  courseControllers.createCourse,
)

router.patch(
  '/:id',
  validateRequest(CourseZodValidations.updateCourseZodValidationSchema),
  courseControllers.updateCourse,
)

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseZodValidations.facultiesWithCourseZodValidationSchema),
  courseControllers.assignFacultiesIntoCourse,
)

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseZodValidations.facultiesWithCourseZodValidationSchema),
  courseControllers.removeFacultiesFromCourse,
)

router.get('/', courseControllers.getAllCourses)
router.get('/:id', courseControllers.getSingleCourse)

router.delete('/:id', courseControllers.deleteCourse)

export const CourseRouter = router
