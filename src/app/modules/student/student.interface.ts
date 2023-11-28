// import { Schema, model, connect } from 'mongoose'

import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  // password: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'O-' | 'B-' | 'A-' | 'AB-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  admissionSemester: Types.ObjectId
  isDeleted: boolean
}

// for static
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>
}

// for creating instance

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >
