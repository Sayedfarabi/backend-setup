import { Student } from './student.model'

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }])
  return result
}

const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentsFromDB,
  getSingleStudentFromDB,
}
