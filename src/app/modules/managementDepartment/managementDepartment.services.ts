import { TManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartment } from './managementDepartment.model'

const createManagementDepartmentIntoDB = async (
  payload: TManagementDepartment,
) => {
  const result = await ManagementDepartment.create(payload)
  return result
}

const updateManagementDepartmentFromDB = async (
  managementId: string,
  payload: Partial<TManagementDepartment>,
) => {
  const filter = {
    _id: managementId,
  }
  const result = await ManagementDepartment.findOneAndUpdate(filter, payload)
  return result
}

const getSingleManagementDepartmentFromDB = async (managementId: string) => {
  const result = await ManagementDepartment.findOne({ _id: managementId })
  return result
}

const getAllManagementDepartmentFromDB = async () => {
  const result = await ManagementDepartment.find({})
  return result
}

export const managementDepartmentServices = {
  createManagementDepartmentIntoDB,
  updateManagementDepartmentFromDB,
  getSingleManagementDepartmentFromDB,
  getAllManagementDepartmentFromDB,
}
