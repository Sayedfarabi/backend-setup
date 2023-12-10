import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { adminServices } from './admin.services'
import catchAsync from '../../utils/catchAsync'

const updateAdmin = catchAsync(async (req, res) => {
  const payload = req.body
  const id = req.params.id
  const result = await adminServices.updateAdminFromDB(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await adminServices.deleteAdminFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  })
})

const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await adminServices.getSingleAdminFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully',
    data: result,
  })
})

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminFromDB(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin fetched successfully',
    data: result,
  })
})

export const adminControllers = {
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  getAllAdmin,
}
