import { PreferenceType, WeekDaysOrDates } from "./PreferenceType.enum";

export interface PreferenceModel {
  id: string;
  guardName: string;
  location: string;
  finishHour: string;
  TypeOfInfoPreference: PreferenceType | null;
  Comments: string;
  halfOrFull: string;
  weekDaysOrDates: WeekDaysOrDates | null;
  flexibilityByDays: string[];
  flexibilityByDates: string[];
  optionalGuardDaysByDates: string;
}

export class PreferenceFields implements PreferenceModel {
  id: string = "id";
  guardName: string = "guardName";
  finishHour: string = "finishHour";
  TypeOfInfoPreference: PreferenceType | null = null;
  Comments: string = "Comments";
  location: string = "location";
  halfOrFull: string = "halfOrFull";
  weekDaysOrDates: WeekDaysOrDates | null = null;
  flexibilityByDays: string[] = ["flexibilityByDays", "flexibilityByDays"];
  flexibilityByDates: string[] = ["flexibilityByDates", "flexibilityByDates"];
  optionalGuardDaysByDates: string = "optionalGuardDaysByDates";

  constructor() {}
}
