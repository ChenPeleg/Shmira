import {NightScheduleModel} from '../models/Sketch.model';

import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel, ShmiraListBuildSettings} from './models/shmiraList.models';
import {Utils} from '../services/utils';
import {ShmiraListBuilderTools} from './shmiraList.tools';


export const ShmiraListBuilderBuildNightsAndUnAssigned = (preferencesMeta: PreferenceMetaDataModel[], buildSettings: ShmiraListBuildSettings): { nightSchedules: NightScheduleModel[], unassignedPreferences: PreferenceModel[], assignedPreferences: PreferenceModel[] } => {
    const range = buildSettings.Range;
    const allDatesArray = Utils.Date.getTimestampArrayFromStartAndFinishDate(range.DateFrom, range.DateTo);

    const nights: NightScheduleModel [] = allDatesArray.map((d: string, i: number) => {
        const optionalGuards = preferencesMeta.filter(g => g.datesYouCanGuard.includes(d)).map(g => g.id)
        const night: NightScheduleModel = {
            Comments: '',
            date: d,
            drivesToRemove: [],
            guards: [],
            optionalGuards: optionalGuards,
            id: (i + 1).toString()

        }
        return night

    })
    const sortedNights = [...nights].sort(n => n.optionalGuards.length);

    sortedNights.forEach(n => {
        if (n.guards.length < 2) {
            const unfilteredOptionalGuards: (PreferenceMetaDataModel | undefined)[] = n.optionalGuards.map(guardId => preferencesMeta.find(g => g.id === guardId));
            const optionalGuards: PreferenceMetaDataModel[] = unfilteredOptionalGuards.filter(g => g) as PreferenceMetaDataModel[];
            optionalGuards.forEach(guard => {
                if (n.guards.length >= 2) {
                    return
                }
                if (ShmiraListBuilderTools.checkIfPersonCanGuard(guard, n.date, buildSettings.daysBetweenGuardDuty)) {
                    // @ts-ignore
                    guard.guardDates.push(n.date);
                    n.guards.push(guard.id)


                }


            })
        }

    })
    const assignedPreferences = preferencesMeta.filter(p => p.guardDates.length >= 2)
    const unassignedPreferences = preferencesMeta.filter(p => p.guardDates.length < 2)
    return {
        assignedPreferences: assignedPreferences.map(p => p.preference),
        unassignedPreferences: unassignedPreferences.map(p => p.preference),
        nightSchedules: nights
    };

}

