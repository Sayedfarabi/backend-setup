import { Router } from 'express'
import { StudentRouter } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'
import { AcademicSemesterRouter } from '../modules/academicSemister/academicSemester.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
]

moduleRoutes.forEach((route) => router.use(route?.path, route?.route))

export default router
