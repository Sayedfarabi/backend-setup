import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { managementDepartmentServices } from './managementDepartment.services'

const createManagementDepartment = catchAsync(async (req, res) => {
  const payload = req.body
  const result =
    await managementDepartmentServices.createManagementDepartmentIntoDB(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department created successfully',
    data: result,
  })
})

const updateManagementDepartment = catchAsync(async (req, res) => {
  const payload = req.body
  const managementId = req.params.managementId
  const result =
    await managementDepartmentServices.updateManagementDepartmentFromDB(
      managementId,
      payload,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department updated successfully',
    data: result,
  })
})

const getSingleManagementDepartment = catchAsync(async (req, res) => {
  const managementId = req.params?.managementId
  const result =
    await managementDepartmentServices.getSingleManagementDepartmentFromDB(
      managementId,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department fetched successfully',
    data: result,
  })
})

const getAllManagementDepartments = catchAsync(async (req, res) => {
  const result =
    await managementDepartmentServices.getAllManagementDepartmentFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Departments fetched successfully',
    data: result,
  })
})

export const managementDepartmentControllers = {
  createManagementDepartment,
  updateManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
}
