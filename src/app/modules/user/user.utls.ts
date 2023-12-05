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

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    { role: 'faculty' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastFaculty?.id ? lastFaculty.id : undefined
}

const findLastAdminId = async () => {
  const lastFaculty = await User.findOne(
    { role: 'admin' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastFaculty?.id ? lastFaculty.id : undefined
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

export const generateFacultyId = async () => {
  // F-0001
  // first time 0000 for faculty
  const currentId = 0
  const lastFacultyId = await findLastFacultyId()
  const lastFacultySerialId = lastFacultyId?.substring(2)

  if (lastFacultyId) {
    let incrementId = (Number(lastFacultySerialId) + 1)
      .toString()
      .padStart(4, '0')
    incrementId = `F-${incrementId}`
    return incrementId
  } else {
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

    incrementId = `F-${incrementId}`
    return incrementId
  }
}

export const generateAdminId = async () => {
  // F-0001
  // first time 0000 for admin
  const currentId = 0
  const lastAdminId = await findLastAdminId()
  const lastAdminSerialId = lastAdminId?.substring(2)

  if (lastAdminId) {
    let incrementId = (Number(lastAdminSerialId) + 1)
      .toString()
      .padStart(4, '0')
    incrementId = `A-${incrementId}`
    return incrementId
  } else {
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

    incrementId = `A-${incrementId}`
    return incrementId
  }
}
