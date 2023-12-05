import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { facultyServices } from './faculty.services'

const updateFaculty = catchAsync(async (req, res) => {
  const payload = req.body
  const facultyId = req.params.facultyId
  const result = await facultyServices.updateFacultyFromDB(facultyId, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req, res) => {
  const facultyId = req.params.facultyId
  const result = await facultyServices.deleteFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})

const getSingleFaculty = catchAsync(async (req, res) => {
  const facultyId = req.params.facultyId
  const result = await facultyServices.getSingleFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties fetched successfully',
    data: result,
  })
})

export const facultyControllers = {
  updateFaculty,
  deleteFaculty,
  getSingleFaculty,
  getAllFaculties,
}
