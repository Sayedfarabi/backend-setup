import { Router } from 'express'
import { StudentRouter } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'
import { AcademicSemesterRouter } from '../modules/academicSemister/academicSemester.route'
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'

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
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
]

moduleRoutes.forEach((route) => router.use(route?.path, route?.route))

export default router
