import {PreferenceModel} from '../models/Preference.model';
import {PreferenceType, WeekDaysOrDates} from '../models/PreferenceType.enum';
import {defaultPreferenceValues} from '../store/store.types';
import {locations} from './locations';
import {LocationModel} from '../models/Location.model';
import {translations} from './translations';
import {fakeFileData} from "./fake-file-data";
import {Utils} from "./utils";

const NewRowToken = 'New_row_';

interface SheetGuardPreference extends Partial<PreferenceModel> {
    name: string,
    hour: string,
    text: string
}


const stringIntoRows = (str: string): string [] => {
    return str.split(NewRowToken).filter(s => s.replace(/\t/g, '').length > 5);
}

const DetectFormRows = (completeText: string): string => {
    let finalText = completeText.replace(/\n((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4})/g, NewRowToken + '\$1');
    return finalText;
}
const rowsToEshbalPreferences = (rows: string [][]): SheetGuardPreference[] => {
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
                    }

                    Epreferences.push(newRide);

                }
            }
        }
    })
    return Epreferences
}

const preferencesToPreferenceModel = (preferences: SheetGuardPreference[]): PreferenceModel[] => {
    let idNum = 99;
    const defaultValues: PreferenceModel = {...defaultPreferenceValues}
    let PreferencesApp: PreferenceModel[] = preferences.map((ePreference) => {
        const appPreference: PreferenceModel = {
            id: idNum.toString(),
            flexibilityByDays: defaultValues.flexibilityByDays,
            flexibilityByDates: [],
            halfOrFull: '2',
            location: '',
            TypeOfInfoPreference: PreferenceType.CanGuardIn,
            optionalGuardDaysByDates: convertTimeTo4Digits(ePreference.hour),
            Comments: ePreference.Comments || '',
            guardName: ePreference.name,
            finishHour: '',
            weekDaysOrDates: WeekDaysOrDates.Dates
        }
        idNum++;
        appPreference.flexibilityByDates = GetDatesFromText(ePreference.text)
        return appPreference;
    })

    return PreferencesApp;
}
const GetDatesFromText = (datesString: string): string [] => {
    const dates: string[] = [];
    const stringwithNumbersAndcomas = datesString.replace(/[^0-9.,]/g, " ");
    const withoutSpaces = stringwithNumbersAndcomas.replace(/[\n\s\r ]/g, "");
    const dateArr = withoutSpaces.split(',');
    dateArr.forEach(strDate => {
        const oneTimeStamp = Utils.Date.dateStampFromSimpleDate(strDate);
        if (+oneTimeStamp > 3000) {
            dates.push(oneTimeStamp)
        }
    })

    return dates;
}

/**
 * @description Searches for Time (number in hour pattern in the text, if the returned number is not equal to datesYouCanGuard hour, returns them
 * @param {PreferenceModel} preference
 * @returns {{anotherTime: string | null}}
 */
const searchAnotherTimeInText = (preference: PreferenceModel): { anotherTime: string | null } => {
    const text = preference.Comments;
    const results: { anotherTime: string | null } = {anotherTime: null}
    const matchingTime = text.matchAll(/(\d{1,2}:\d\d)/g);
    const matchingArray = Array.from(matchingTime)

    if (matchingArray && matchingArray[0]) {
        matchingArray.forEach(t => {
            const convertedTime = convertTimeTo4Digits(t.toString());
            if (convertedTime !== preference.optionalGuardDaysByDates) {
                results.anotherTime = convertedTime
            }
        })
    }

    if (!results.anotherTime) {
        const matchingTime = text.matchAll(/(1\d|20|21|22|23)/g);
        const matchingArray = Array.from(matchingTime)

        if (matchingArray && matchingArray[0]) {
            matchingArray.forEach(t => {
                const convertedTime = convert2DigitTimeTo4Digits(t.toString());
                if (convertedTime !== preference.optionalGuardDaysByDates) {
                    results.anotherTime = convertedTime
                }
            })
        }
    }

    return results
}
const searchLocationInText = (text: string): { locationFound: LocationModel | null, typeOfDrive: PreferenceType | null } => {
    const allLocations: LocationModel[] = [...locations];
    const results: { locationFound: LocationModel | null, typeOfDrive: PreferenceType | null } = {
        locationFound: null,
        typeOfDrive:
            null
    }
    allLocations.forEach((location: LocationModel) => {
        if (text.includes(location.name)) {
            results.locationFound = location;
        }
    });

    if (results.locationFound) {
        const locName = results.locationFound.name;
        const fromPrefixes = [translations.From, translations.fromLocationWithThe];
        const toPrefixes = [translations.toLocation, translations.toLocationLe];
        const tzamudPrefix = [translations.inLocation];
        if (fromPrefixes.some(pre => text.includes(pre + locName))) {
            results.typeOfDrive = PreferenceType.OneWayFrom
        }
        if (toPrefixes.some(pre => text.includes(pre + locName))) {
            results.typeOfDrive = PreferenceType.CantGuardIn
        }
        if (tzamudPrefix.some(pre => text.includes(pre + locName))) {
            results.typeOfDrive = PreferenceType.CanGuardIn
        }
    }
    if (text.includes(translations.TsamudWord)) {
        results.typeOfDrive = PreferenceType.CanGuardIn
    }

    return results
}
const convertTimeTo4Digits = (time: string): string => {
    if (time.match(/^\d:\d\d$/)) {
        return '0' + time
    } else {
        return time
    }
}
const convert2DigitTimeTo4Digits = (time: string): string => {
    if (time.match(/^\d\d$/)) {
        return time + ':00'
    } else {
        return time
    }
}

export const vlidateImportedData = (prefs : PreferenceModel[]) =>{
    let errors = [];
    const guardWithoutName = prefs.filter(p=> p.guardName?.trim() === ''  );
    const guardWithoutDates= prefs.filter(p=> p.flexibilityByDates.length === 0 );
    if (prefs.length < 5) {

        errors.push(prefs.length ? 'only ' + prefs.length + ' rows were found' : 'no guard duty google sheets rows were found')
    }
    if (guardWithoutDates[0]){
        errors.push ('Guard ' + guardWithoutDates[0].guardName  + ' has no dates'  )
    }
    if (guardWithoutName[0]){
        errors.push ('Row ' + prefs.indexOf(guardWithoutName[0])  + ' has no name'  )
    }
    const guardWithError = prefs.filter(p=> p.guardName.toLowerCase().includes('error'));
    if (guardWithError[0]){
        errors.push ('Row ' + prefs.indexOf(guardWithError[0])  + ' has an error'  )
    }
    if (errors.length) {
       const text = errors.join('; ');
       throw {
         message : text
        }
    }


return true
}
export const getDatesFromImportedPreferences = ( prefs : PreferenceModel[] ) : [string, string] => {
   const todayDate = new Date();
   const todayNumber = +Utils.Date.dateToDateStamp(todayDate);
   let from =  todayNumber - 5 ;
   let to =  todayNumber + 30 ;
    prefs.forEach(pref=>{
        pref.flexibilityByDates.map (d=>+d).forEach(date=> {
            if (date > to){
                to = date;
            } else if (date < from) {
                from = date;
            }
        })
    })
   return [from.toString(),to.toString()]
}
export const ImportPreferencesFromText = (text: string): PreferenceModel[] => {
    if (!text) {
        text = fakeFileData;
    }
    // text = stringValue;

    const rowsWithoutUserLineBreaks = DetectFormRows(text)
    const rows = stringIntoRows(rowsWithoutUserLineBreaks);
    const rowsWithColumns = rows.map(r => r.split(/\t/g));
    try {
        const preferences: SheetGuardPreference[] = rowsToEshbalPreferences(rowsWithColumns);
        let appPreferences: PreferenceModel[] = preferencesToPreferenceModel(preferences)
        return  appPreferences ;
    } catch (e) {
        return []
    }





}
