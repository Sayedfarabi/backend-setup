import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsynch from '../../utils/catchAsync'

const getSingleStudent = catchAsynch(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  })
})

const getStudents: RequestHandler = catchAsynch(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsynch(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentsFromDB(studentId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  getStudents,
  deleteStudent,
  getSingleStudent,
}
