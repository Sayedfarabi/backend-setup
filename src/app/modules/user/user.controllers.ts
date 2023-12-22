import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  // console.log(req.body)
  const { password, student: studentData } = req.body
  const result = await UserServices.createStudentIntoDB(
    password,
    studentData,
    req.file,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  })
})

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body
  const result = await UserServices.createFacultyIntoDB(
    password,
    facultyData,
    req.file,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully!',
    data: result,
  })
})

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body
  const result = await UserServices.createAdminIntoDB(
    password,
    adminData,
    req.file,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  })
})

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const { userId, role } = req.user
  const result = await UserServices.getMeFromDB(userId, role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is retrieved successfully!`,
    data: result,
  })
})

const changeUserStatus: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params?.id
  const result = await UserServices.changeuserStatusFromDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Status updated successfully!`,
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeUserStatus,
}
