/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TFaculty = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'O-' | 'B-' | 'A-' | 'AB-'
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
  isDeleted: boolean
}

export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>
}
