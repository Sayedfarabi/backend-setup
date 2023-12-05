import httpStatus from 'http-status'
import { RequestHandler } from 'express'
// import userZodValidationSchema from './user.zod.validation'
import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  // const zodParseData = userZodValidationSchema.parse(studentData)
  const result = await UserServices.createStudentIntoDB(password, studentData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  })
})

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body
  // const zodParseData = userZodValidationSchema.parse(studentData)
  const result = await UserServices.createFacultyIntoDB(password, facultyData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully!',
    data: result,
  })
})

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body
  // const zodParseData = userZodValidationSchema.parse(studentData)
  const result = await UserServices.createAdminIntoDB(password, adminData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
}
