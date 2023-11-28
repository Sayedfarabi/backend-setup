import {
  TAcademicSemesterNameCodeMapper,
  TCode,
  TMonths,
  TName,
} from './academicSemester.interface'

export const semesterMonths: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const semesterNames: TName[] = ['Autumn', 'Summer', 'Fall']
export const semesterCodes: TCode[] = ['01', '02', '03']
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
