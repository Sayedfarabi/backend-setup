import httpStatus from 'http-status'
import { RequestHandler } from 'express'
// import userZodValidationSchema from './user.zod.validation'
import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import catchAsynch from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsynch(async (req, res) => {
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

export const UserControllers = {
  createStudent,
}
