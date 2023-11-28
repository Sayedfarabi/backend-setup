import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { academicSemesterNameCodeMapper } from './academicSemisterConstant'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.aggregate([{ $match: {} }])
  return result
}

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  const filter = { _id: semesterId }
  const result = await AcademicSemester.findOne(filter)
  return result
}

const updateAcademicSemesterIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  const filter = { _id: semesterId }
  const result = await AcademicSemester.updateOne(filter, payload)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}