import httpStatus from 'http-status'
import catchAsynch from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsynch(async (req, res) => {
  const payload = req.body
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})
const updateAcademicFaculty = catchAsynch(async (req, res) => {
  const payload = req.body
  const facultyId = req.params.facultyId
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    facultyId,
    payload,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  })
})

const deleteAcademicFaculty = catchAsynch(async (req, res) => {
  const facultyId = req.params.facultyId
  const result =
    await AcademicFacultyServices.deleteAcademicFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsynch(async (req, res) => {
  const facultyId = req.params.facultyId
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsynch(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties fetched successfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  updateAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  deleteAcademicFaculty,
}
