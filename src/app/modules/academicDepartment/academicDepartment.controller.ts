import httpStatus from 'http-status'
import catchAsynch from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.services'

const createAcademicDepartment = catchAsynch(async (req, res) => {
  const payload = req.body
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})
const updateAcademicDepartment = catchAsynch(async (req, res) => {
  const payload = req.body
  const departmentId = req.params.departmentId
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      departmentId,
      payload,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})

const deleteAcademicDepartment = catchAsynch(async (req, res) => {
  const departmentId = req.params.departmentId
  const result =
    await AcademicDepartmentServices.deleteAcademicDepartmentFromDB(
      departmentId,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsynch(async (req, res) => {
  const departmentId = req.params.departmentId
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsynch(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties fetched successfully',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getSingleAcademicDepartment,
  getAllAcademicFaculties,
  deleteAcademicDepartment,
}
