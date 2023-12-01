import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}

const updateAcademicDepartmentFromDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const filter = {
    _id: departmentId,
  }
  const result = await AcademicDepartment.findOneAndUpdate(filter, payload, {
    new: true,
  })
  return result
}

const deleteAcademicDepartmentFromDB = async (departmentId: string) => {
  const filter = {
    _id: departmentId,
  }
  const result = await AcademicDepartment.findByIdAndDelete(filter)
  return result
}

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result = await AcademicDepartment.findById({
    _id: departmentId,
  }).populate('academicFaculty')
  return result
}

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  updateAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  getAllAcademicDepartmentFromDB,
  deleteAcademicDepartmentFromDB,
}
