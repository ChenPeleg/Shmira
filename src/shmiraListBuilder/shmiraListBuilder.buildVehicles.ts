import {DriveModel, VehicleScheduleModel} from '../models/Sketch.model';
import {VehicleModel} from '../models/Vehicle.model';

import {PreferenceModel} from '../models/Preference.model';
import {Utils} from '../services/utils';
import {LanguageUtilities} from '../services/language-utilities';
import {locations} from '../services/locations';
import {PreferenceMetaDataModel, PreferenceMetaStatus} from './models/shmiraList.models';
import {ShmiraListBuilderTools} from './shmiraList.tools';

interface OrdMetaScheduleData {
    start: number,
    finish: number,
    id: string,
    halfOrFull: string

}

export const ShmiraListBuilderBuildVehiclesAndUnAssigned = (preferences: PreferenceMetaDataModel[], vehicles: VehicleModel[], buildSettings: any = null): {
    vehicleSchedules: VehicleScheduleModel[],
    unassignedPreferences: PreferenceModel[],
    assignedPreferences: PreferenceModel[],

} => {
    const enumerator = ShmiraListBuilderTools.EnumeratorConstructor();
    const metaPreferenceScheduleData: OrdMetaScheduleData[] = preferences.map((o: PreferenceMetaDataModel) => {
        return {
            start: o.start,
            finish: o.finish,
            id: o.id,
            halfOrFull: o.preference.halfOrFull
        }
    });
    metaPreferenceScheduleData.sort((a, b) => (a.start > b.start) ? 1 : -1);

    let vehicleScheduleId = 0;
    const vehicleSchedules: VehicleScheduleModel [] = vehicles.map((vehicle: VehicleModel) => {
        vehicleScheduleId++
        const vehicleSchedule: VehicleScheduleModel = {
            id: enumerator.getStrId(),
            VehicleId: vehicle.id,
            drives: [],
            Comments: vehicle.Comments
        }
        return vehicleSchedule
    })
    vehicleSchedules.forEach((schedule: VehicleScheduleModel) => {
        let currentHour: number = 0.1;
        metaPreferenceScheduleData.forEach(metaPreference => {
            if (metaPreference.start > currentHour) {
                const relevantMetaDrive: PreferenceMetaDataModel | undefined = preferences.find(meta => meta.id === metaPreference.id)
                if (!relevantMetaDrive || relevantMetaDrive.status === PreferenceMetaStatus.Approved) {
                    return
                }
                currentHour = metaPreference.finish;

                const newDrive: DriveModel = {
                    ...relevantMetaDrive
                        .preference,
                    startHour: Utils.DecimalTimeToHourText(metaPreference.start),
                    finishHour: Utils.DecimalTimeToHourText(metaPreference.finish),

                    implementsPreferences: [relevantMetaDrive
                        .preference.id],
                    description: '',
                    id: enumerator.getStrId(),
                }
                const fakePreference: PreferenceModel = {
                    ...relevantMetaDrive
                        .preference,
                    startHour: Utils.DecimalTimeToHourText(metaPreference.start),

                    finishHour: Utils.DecimalTimeToHourText(metaPreference.finish),


                }
                newDrive.description = LanguageUtilities.buildBriefText(fakePreference, locations).driverAndLocation;


                schedule.drives.push(newDrive);
                relevantMetaDrive.status = PreferenceMetaStatus.Approved;


            }
        })
    })
    const unassignedPreferences: PreferenceModel[] = preferences.filter(o => o.status === PreferenceMetaStatus.None).map(o => o.preference);

    const assignedPreferences: PreferenceModel[] = preferences.filter(o => o.status !== PreferenceMetaStatus.None).map(o => o.preference);
    return {
        vehicleSchedules,
        unassignedPreferences,
        assignedPreferences
    }
}
