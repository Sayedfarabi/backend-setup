import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const updateAcademicFacultyFromDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const filter = {
    _id: facultyId,
  }
  const result = await AcademicFaculty.findOneAndUpdate(filter, payload)
  return result
}

const deleteAcademicFacultyFromDB = async (facultyId: string) => {
  const filter = {
    _id: facultyId,
  }
  const result = await AcademicFaculty.findByIdAndDelete(filter)
  return result
}

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findOne({ _id: facultyId })
  return result
}

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find({})
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  updateAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  getAllAcademicFacultyFromDB,
  deleteAcademicFacultyFromDB,
}
