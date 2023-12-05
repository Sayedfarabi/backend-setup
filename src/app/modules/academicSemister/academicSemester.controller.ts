import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const semester = req.body
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(semester)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully!',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters fetched successfully!',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetched successfully!',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const payload = req.body
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    payload,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters updated successfully!',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
