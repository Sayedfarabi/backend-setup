import { TAcademicSemester } from '../academicSemister/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000 for student
  const currentId = 0
  const lastStudentId = await findLastStudentId()
  const lastStudentYear = lastStudentId?.substring(0, 4)
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
  const lastStudentSerialId = lastStudentId?.substring(6)

  if (
    lastStudentId &&
    lastStudentYear === payload.year &&
    lastStudentSemesterCode === payload.code
  ) {
    let incrementId = (Number(lastStudentSerialId) + 1)
      .toString()
      .padStart(4, '0')
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId
  } else {
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId
  }
}
