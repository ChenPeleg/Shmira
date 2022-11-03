import {
  PreferenceType,
  WeekDaysOrDates,
} from "../../models/PreferenceType.enum";
import {
  PreferenceMetaDataModel,
  ShmiraListBuildSettings,
} from "../models/shmiraList.models";
import { NightScheduleModel } from "../../models/Sketch.model";
import { PreferenceModel } from "../../models/Preference.model";

export const shmiraBuildFixtures: {
  preferences: PreferenceMetaDataModel[];
  settings: ShmiraListBuildSettings;
  result: {
    nightSchedules: NightScheduleModel[];
    unassignedPreferences: PreferenceModel[];
    assignedPreferences: PreferenceModel[];
  };
} = {
  preferences: [
    {
      datesYouCanGuard: [
        "44864",
        "44869",
        "44870",
        "44871",
        "44876",
        "44877",
        "44878",
        "44883",
        "44884",
        "44885",
        "44890",
        "44891",
        "44892",
      ],
      guardDates: [],
      id: "1",
      length: 0,
      preference: {
        id: "1",
        guardName: "NONI",
        optionalGuardDaysByDates: "",
        finishHour: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        Comments: "",
        halfOrFull: "1",
        flexibilityByDays: ["1", "2", "3"],
        flexibilityByDates: [],
        location: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      status: 0,
    },
    {
      datesYouCanGuard: [
        "44864",
        "44869",
        "44870",
        "44871",
        "44876",
        "44877",
        "44878",
        "44883",
        "44884",
        "44885",
        "44890",
        "44891",
        "44892",
      ],
      guardDates: [],
      id: "4",
      length: 0,
      preference: {
        id: "4",
        guardName: "ORI",
        optionalGuardDaysByDates: "",
        finishHour: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        Comments: "",
        halfOrFull: "1",
        flexibilityByDays: ["1", "2", "3"],
        flexibilityByDates: [],
        location: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      status: 0,
    },
    {
      datesYouCanGuard: [
        "44864",
        "44869",
        "44870",
        "44871",
        "44876",
        "44877",
        "44878",
        "44883",
        "44884",
        "44885",
        "44890",
        "44891",
        "44892",
      ],
      guardDates: [],
      id: "3",
      length: 0,
      preference: {
        id: "3",
        guardName: "RONI",
        optionalGuardDaysByDates: "",
        finishHour: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        Comments: "",
        halfOrFull: "1",
        flexibilityByDays: ["1", "2", "3"],
        flexibilityByDates: [],
        location: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      status: 0,
    },
    {
      datesYouCanGuard: [
        "44864",
        "44869",
        "44870",
        "44871",
        "44876",
        "44877",
        "44878",
        "44883",
        "44884",
        "44885",
        "44890",
        "44891",
        "44892",
      ],
      guardDates: [],
      id: "2",
      length: 0,
      preference: {
        id: "2",
        guardName: "LONI",
        optionalGuardDaysByDates: "",
        finishHour: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        Comments: "",
        halfOrFull: "1",
        flexibilityByDays: ["1", "2", "3"],
        flexibilityByDates: [],
        location: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      status: 0,
    },
  ],
  settings: {
    custom: null,
    Range: {
      DateFrom: "44864",
      DateTo: "44896",
    },
    daysBetweenGuardDuty: "6",
    isOneGuardForNight: false,
  },
  result: {
    assignedPreferences: [
      {
        Comments: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        finishHour: "",
        flexibilityByDates: [],
        flexibilityByDays: ["1", "2", "3"],
        guardName: "NONI",
        halfOrFull: "1",
        id: "1",
        location: "",
        optionalGuardDaysByDates: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      {
        Comments: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        finishHour: "",
        flexibilityByDates: [],
        flexibilityByDays: ["1", "2", "3"],
        guardName: "ORI",
        halfOrFull: "1",
        id: "4",
        location: "",
        optionalGuardDaysByDates: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      {
        Comments: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        finishHour: "",
        flexibilityByDates: [],
        flexibilityByDays: ["1", "2", "3"],
        guardName: "RONI",
        halfOrFull: "1",
        id: "3",
        location: "",
        optionalGuardDaysByDates: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
      {
        Comments: "",
        TypeOfInfoPreference: PreferenceType.CanGuardIn,
        finishHour: "",
        flexibilityByDates: [],
        flexibilityByDays: ["1", "2", "3"],
        guardName: "LONI",
        halfOrFull: "1",
        id: "2",
        location: "",
        optionalGuardDaysByDates: "",
        weekDaysOrDates: WeekDaysOrDates.WeekDays,
      },
    ],
    nightSchedules: [
      {
        Comments: "",
        date: "44864",
        drivesToRemove: [],
        guards: ["1", "4"],
        id: "1",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44865",
        drivesToRemove: [],
        guards: [],
        id: "2",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44866",
        drivesToRemove: [],
        guards: [],
        id: "3",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44867",
        drivesToRemove: [],
        guards: [],
        id: "4",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44868",
        drivesToRemove: [],
        guards: [],
        id: "5",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44869",
        drivesToRemove: [],
        guards: ["3", "2"],
        id: "6",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44870",
        drivesToRemove: [],
        guards: ["1", "4"],
        id: "7",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44871",
        drivesToRemove: [],
        guards: [],
        id: "8",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44872",
        drivesToRemove: [],
        guards: [],
        id: "9",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44873",
        drivesToRemove: [],
        guards: [],
        id: "10",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44874",
        drivesToRemove: [],
        guards: [],
        id: "11",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44875",
        drivesToRemove: [],
        guards: [],
        id: "12",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44876",
        drivesToRemove: [],
        guards: ["3", "2"],
        id: "13",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44877",
        drivesToRemove: [],
        guards: [],
        id: "14",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44878",
        drivesToRemove: [],
        guards: [],
        id: "15",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44879",
        drivesToRemove: [],
        guards: [],
        id: "16",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44880",
        drivesToRemove: [],
        guards: [],
        id: "17",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44881",
        drivesToRemove: [],
        guards: [],
        id: "18",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44882",
        drivesToRemove: [],
        guards: [],
        id: "19",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44883",
        drivesToRemove: [],
        guards: [],
        id: "20",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44884",
        drivesToRemove: [],
        guards: [],
        id: "21",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44885",
        drivesToRemove: [],
        guards: [],
        id: "22",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44886",
        drivesToRemove: [],
        guards: [],
        id: "23",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44887",
        drivesToRemove: [],
        guards: [],
        id: "24",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44888",
        drivesToRemove: [],
        guards: [],
        id: "25",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44889",
        drivesToRemove: [],
        guards: [],
        id: "26",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44890",
        drivesToRemove: [],
        guards: [],
        id: "27",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44891",
        drivesToRemove: [],
        guards: [],
        id: "28",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44892",
        drivesToRemove: [],
        guards: [],
        id: "29",
        optionalGuards: ["1", "4", "3", "2"],
      },
      {
        Comments: "",
        date: "44893",
        drivesToRemove: [],
        guards: [],
        id: "30",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44894",
        drivesToRemove: [],
        guards: [],
        id: "31",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44895",
        drivesToRemove: [],
        guards: [],
        id: "32",
        optionalGuards: [],
      },
      {
        Comments: "",
        date: "44896",
        drivesToRemove: [],
        guards: [],
        id: "33",
        optionalGuards: [],
      },
    ],
    unassignedPreferences: [],
  },
};
