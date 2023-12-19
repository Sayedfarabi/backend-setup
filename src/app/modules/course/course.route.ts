import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseZodValidations } from './course.Zod..Validation'
import { courseControllers } from './course.controllers'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseZodValidations.createCourseZodValidationSchema),
  courseControllers.createCourse,
)

router.patch(
  '/:id',
  auth('admin'),
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
  auth('admin'),
  validateRequest(CourseZodValidations.facultiesWithCourseZodValidationSchema),
  courseControllers.removeFacultiesFromCourse,
)

router.get('/', courseControllers.getAllCourses)
router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  courseControllers.getSingleCourse,
)

router.delete('/:id', courseControllers.deleteCourse)

export const CourseRouter = router
