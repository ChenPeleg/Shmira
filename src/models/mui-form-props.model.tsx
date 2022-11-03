import { PreferenceType, WeekDaysOrDates } from "./PreferenceType.enum";

export interface MuiFormPropsModel {
  handleSubmit: any;
  pristine: any;
  reset: any;
  submitting: any;
  preferenceId: any;
  isInEdit: boolean;
  typeOfPreference?: PreferenceType;
  weekDaysOrDates?: WeekDaysOrDates;
}
