import {NightScheduleModel} from '../models/Sketch.model';

import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel, ShmiraListBuildSettings} from './models/shmiraList.models';
import {Utils} from '../services/utils';
import {ShmiraListBuilderTools} from './shmiraList.tools';


export const ShmiraListBuilderBuildNightsAndUnAssigned = (preferences: PreferenceMetaDataModel[], buildSettings: ShmiraListBuildSettings): { nightSchedules: NightScheduleModel[], unassignedPreferences: PreferenceModel[], assignedPreferences: PreferenceModel[] } => {
    const range = buildSettings.Range;
    const allDatesArray = Utils.Date.getTimestampArrayFromStartAndFinishDate(range.DateFrom, range.DateTo);

    const nights: NightScheduleModel [] = allDatesArray.map((d: string, i: number) => {
        const optionalGuards = preferences.filter(g => g.datesYouCanGuard.includes(d)).map(g => g.id)
        const night: NightScheduleModel = {
            Comments: '',
            date: d,
            drivesToRemove: [],
            guards: [],
            optionalGuards: optionalGuards,
            id: i.toString()

        }
        return night

    })
    const sortedNights = [...nights].sort(n => n.optionalGuards.length);

    sortedNights.forEach(n => {
        if (n.guards.length < 2) {
            const unfilteredOptionalGuards: (PreferenceMetaDataModel | undefined)[] = n.optionalGuards.map(guardId => preferences.find(g => g.id === guardId));
            const optionalGuards: PreferenceMetaDataModel[] = unfilteredOptionalGuards.filter(g => g) as PreferenceMetaDataModel[];
            optionalGuards.forEach(guard => {
                if (n.guards.length >= 2) {
                    return
                }
                if (ShmiraListBuilderTools.checkIfPersonCanGuard(guard, n.date)) {
                    // @ts-ignore
                    guard.guardDates.push(n.date);
                    n.guards.push(guard.id)


                }


            })
        }

    })

    return {
        assignedPreferences: [],
        unassignedPreferences: [],
        nightSchedules: nights
    };

}

