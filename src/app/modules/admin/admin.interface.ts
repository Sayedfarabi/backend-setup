/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}
export type TAdmin = {
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
  managementDepartment: Types.ObjectId
  isDeleted: boolean
}
export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>
}
