import { Router } from 'express'
import { StudentRouter } from '../modules/student/student.route'
import { UserRouter } from '../modules/user/user.route'
import { AcademicSemesterRouter } from '../modules/academicSemister/academicSemester.route'
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route'
import { FacultyRouter } from '../modules/faculty/faculty.route'
import { ManagementDepartmentRouter } from '../modules/managementDepartment/managementDepartment.route'
import { AdminRouter } from '../modules/admin/admin.route'
import { CourseRouter } from '../modules/course/course.route'
import { semesterRegistrationRoutes } from '../modules/semesterRegestration/semesterRegistration.route'
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.route'
import { AuthRouter } from '../modules/Auth/auth.route'

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
  {
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/management-department',
    route: ManagementDepartmentRouter,
  },
  {
    path: '/admin',
    route: AdminRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
]

moduleRoutes.forEach((route) => router.use(route?.path, route?.route))

export default router
