import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel, PreferenceMetaStatus, RangeModel, ShmiraListBuildSettings} from './models/shmiraList.models';
import {Utils} from '../services/utils';
import {PreferenceType, WeekDaysOrDates} from '../models/PreferenceType.enum';


const buildDaysYouCanGuard = (prefrence: PreferenceModel, range: RangeModel) => {
    const allDatesArray = Utils.Date.getTimestampArrayFromStartAndFinishDate(range.DateFrom, range.DateTo);
    let daysInputed: string[] = [];
    if (prefrence.weekDaysOrDates == WeekDaysOrDates.WeekDays) {
        const DateObjectRange = Utils.Date.getWeekDayNumberFromTimeStamps(allDatesArray);
        daysInputed = DateObjectRange.filter(dObj => prefrence.flexibilityByDays.includes(dObj.dayNumber.toString())).map(d => d.timeStamp);
    } else if (prefrence.weekDaysOrDates == WeekDaysOrDates.Dates) {
        daysInputed = prefrence.flexibilityByDates
    }
    switch (prefrence.TypeOfInfoPreference) {
        case PreferenceType.CanGuardIn:
            return daysInputed

        case PreferenceType.CantGuardIn:
            return allDatesArray.filter(d => !daysInputed.includes(d))
        case PreferenceType.CanAlwaysGuard:
            return allDatesArray
    }
    return []
}
export const ShmiraListBuilderBuildPreferencesMetaData = (preferences: PreferenceModel[], buildSettings: ShmiraListBuildSettings): PreferenceMetaDataModel[] => {

    return preferences.map((p: PreferenceModel) => {

        const prefMeta: PreferenceMetaDataModel = {
            datesYouCanGuard: buildDaysYouCanGuard(p, buildSettings.Range),
            guardDates: [],
            id: p.id,
            length: 0,
            preference: p,
            status: PreferenceMetaStatus.None

        }
        return prefMeta

    })
}


