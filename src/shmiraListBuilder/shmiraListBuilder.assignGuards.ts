import {NightScheduleModel} from '../models/Sketch.model';

import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel, ShmiraListBuildSettings} from './models/shmiraList.models';
import {Utils} from '../services/utils';


export const ShmiraListBuilderBuildNightsAndUnAssigned = (preferences: PreferenceMetaDataModel[], buildSettings: ShmiraListBuildSettings): { nightSchedules: NightScheduleModel[], unassignedPreferences: PreferenceModel[], assignedPreferences: PreferenceModel[] } => {
    const range = buildSettings.Range;
    const allDatesArray = Utils.Date.getTimestampArrayFromStartAndFinishDate(range.DateFrom, range.DateTo);

    const nights: NightScheduleModel [] = allDatesArray.map((d: string, i: number) => {
        const night: NightScheduleModel = {
            Comments: '',
            date: d,
            drivesToRemove: [],
            guards: [],
            optionalGuards: [],
            id: i.toString()

        }
        return night

    })
    return {
        assignedPreferences: [],
        unassignedPreferences: [],
        nightSchedules: nights
    };

}

