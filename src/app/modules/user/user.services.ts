import config from '../../config'
import { AcademicSemester } from '../academicSemister/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utls'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password

  userData.password = password || (config.default_pass as string)

  // set user role
  userData.role = 'student'

  // find academic semester info
  const getAdmissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )
  // console.log(getAdmissionSemester)

  if (getAdmissionSemester) {
    userData.id = await generateStudentId(getAdmissionSemester)

    // create a user
    const newUser = await User.create(userData)
    if (Object.keys(newUser).length) {
      // set id, _id as user
      payload.id = newUser.id // embaded id
      payload.user = newUser._id // reference _id

      const newStudent = await Student.create(payload)
      return newStudent
    }
  } else {
    throw new Error('Your semester data can not found into DB')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
