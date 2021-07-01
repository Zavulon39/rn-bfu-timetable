import React from 'react'
import { InstitutScreen } from '../screens/AbitsTimetable/InstitutScreen'
import { MainScreen } from '../screens/MainScreen'
import { GroupScreen } from '../screens/AbitsTimetable/GroupScreen'
import { TimetableScreen } from '../screens/AbitsTimetable/TimetableScreen'
import { TeacherScreen } from '../screens/TeacherTimetable/TeacherScreen'
import { TimetableScreen as TeacherTimetableScreen } from '../screens/TeacherTimetable/TimetableScreen'
import { TimeScreen } from '../screens/SearchGroup/TimeScreen'
import { SubjectScreen } from '../screens/SearchGroup/SubjectScreen'
import { TeacherScreen as SearchGroupTeacherScreen } from '../screens/SearchGroup/TeacherScreen'
import { ResultScreen } from '../screens/SearchGroup/ResultScreen'

export const useRouter = route => {
  switch (route) {
    case 'Main':
      return <MainScreen />
    case 'AbitsInstitus':
      return <InstitutScreen />
    case 'AbitsGroup':
      return <GroupScreen />
    case 'AbitsTimetable':
      return <TimetableScreen />
    case 'TeacherTeacher':
      return <TeacherScreen />
    case 'TeacherTimetable':
      return <TeacherTimetableScreen />
    case 'SearchGroupTime':
      return <TimeScreen />
    case 'SearchGroupSubject':
      return <SubjectScreen />
    case 'SearchGroupTeacher':
      return <SearchGroupTeacherScreen />
    case 'SearchGroupResult':
      return <ResultScreen />
    default:
      return null
  }
}
