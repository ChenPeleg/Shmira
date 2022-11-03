import { PreferenceModel } from "../models/Preference.model";
import { PreferenceType, WeekDaysOrDates } from "../models/PreferenceType.enum";
import { defaultPreferenceValues } from "../store/store.types";
import { locations } from "./locations";
import { LocationModel } from "../models/Location.model";
import { translations } from "./translations";
import { fakeFileData } from "./fake-file-data";
import { Utils } from "./utils";

const NewRowToken = "New_row_";

interface SheetGuardPreference extends Partial<PreferenceModel> {
  name: string;
  hour: string;
  text: string;
}

const stringIntoRows = (str: string): string[] => {
  return str.split(NewRowToken).filter((s) => s.replace(/\t/g, "").length > 5);
};

const DetectFormRows = (completeText: string): string => {
  let finalText = completeText.replace(
    /\n((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4})/g,
    NewRowToken + "$1"
  );
  return finalText;
};
const rowsToEshbalPreferences = (rows: string[][]): SheetGuardPreference[] => {
  let Epreferences: SheetGuardPreference[] = [];
  rows.forEach((row: string[], index: number) => {
    if (row[1].length > 1 && index > 0) {
      let name = row[1];
      for (let c = 2; c < 8; c += 2) {
        if (row[c].length > 1) {
          const newRide: SheetGuardPreference = {
            name: name,
            hour: "",
            flexibilityByDays: [],
            weekDaysOrDates: WeekDaysOrDates.Dates,
            Comments: row[c],
            text: row[c + 1],
          };

          Epreferences.push(newRide);
        }
      }
    }
  });
  return Epreferences;
};

const preferencesToPreferenceModel = (
  preferences: SheetGuardPreference[]
): PreferenceModel[] => {
  let idNum = 99;
  const defaultValues: PreferenceModel = { ...defaultPreferenceValues };
  let PreferencesApp: PreferenceModel[] = preferences.map((ePreference) => {
    const appPreference: PreferenceModel = {
      id: idNum.toString(),
      flexibilityByDays: defaultValues.flexibilityByDays,
      flexibilityByDates: [],
      halfOrFull: "2",
      location: "",
      TypeOfInfoPreference: PreferenceType.CanGuardIn,
      optionalGuardDaysByDates: convertTimeTo4Digits(ePreference.hour),
      Comments: ePreference.Comments || "",
      guardName: ePreference.name,
      finishHour: "",
      weekDaysOrDates: WeekDaysOrDates.Dates,
    };
    idNum++;
    appPreference.flexibilityByDates = GetDatesFromText(ePreference.text);
    return appPreference;
  });

  return PreferencesApp;
};
const GetDatesFromText = (datesString: string): string[] => {
  const dates: string[] = [];
  const stringwithNumbersAndcomas = datesString.replace(/[^0-9.,]/g, " ");
  const withoutSpaces = stringwithNumbersAndcomas.replace(/[\n\s\r ]/g, "");
  const dateArr = withoutSpaces.split(",");
  dateArr.forEach((strDate) => {
    const oneTimeStamp = Utils.Date.dateStampFromSimpleDate(strDate);
    if (+oneTimeStamp > 3000) {
      dates.push(oneTimeStamp);
    }
  });

  return dates;
};

const convertTimeTo4Digits = (time: string): string => {
  if (time.match(/^\d:\d\d$/)) {
    return "0" + time;
  } else {
    return time;
  }
};

export const vlidateImportedData = (prefs: PreferenceModel[]) => {
  let errors = [];
  const guardWithoutName = prefs.filter((p) => p.guardName?.trim() === "");
  const guardWithoutDates = prefs.filter(
    (p) => p.flexibilityByDates.length === 0
  );
  if (prefs.length < 5) {
    errors.push(
      prefs.length
        ? "only " + prefs.length + " rows were found"
        : "no guard duty google sheets rows were found"
    );
  }
  if (guardWithoutDates[0]) {
    errors.push("Guard " + guardWithoutDates[0].guardName + " has no dates");
  }
  if (guardWithoutName[0]) {
    errors.push("Row " + prefs.indexOf(guardWithoutName[0]) + " has no name");
  }
  const guardWithError = prefs.filter((p) =>
    p.guardName.toLowerCase().includes("error")
  );
  if (guardWithError[0]) {
    errors.push("Row " + prefs.indexOf(guardWithError[0]) + " has an error");
  }
  if (errors.length) {
    const text = errors.join("; ");
    throw {
      message: text,
    };
  }

  return true;
};
export const getDatesFromImportedPreferences = (
  prefs: PreferenceModel[]
): [string, string] => {
  const todayDate = new Date();
  const todayNumber = +Utils.Date.dateToDateStamp(todayDate);
  let from = todayNumber - 5;
  let to = todayNumber + 30;
  prefs.forEach((pref) => {
    pref.flexibilityByDates
      .map((d) => +d)
      .forEach((date) => {
        if (date > to) {
          to = date;
        } else if (date < from) {
          from = date;
        }
      });
  });
  return [from.toString(), to.toString()];
};
export const ImportPreferencesFromText = (text: string): PreferenceModel[] => {
  if (!text) {
    text = fakeFileData;
  }
  // text = stringValue;

  const rowsWithoutUserLineBreaks = DetectFormRows(text);
  const rows = stringIntoRows(rowsWithoutUserLineBreaks);
  const rowsWithColumns = rows.map((r) => r.split(/\t/g));
  try {
    const preferences: SheetGuardPreference[] =
      rowsToEshbalPreferences(rowsWithColumns);
    let appPreferences: PreferenceModel[] =
      preferencesToPreferenceModel(preferences);
    return appPreferences;
  } catch (e) {
    return [];
  }
};
