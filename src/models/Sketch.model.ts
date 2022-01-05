import {PreferenceType} from './PreferenceType.enum';
import {PreferenceModel} from './Preference.model';

export interface DriveModel extends PreferenceModel {
    id: string,
    guardName: string,
    optionalGuardDaysByDates: string,
    finishHour: string,
    TypeOfInfoPreference: PreferenceType | null,
    location: string,
    Comments: string,
    halfOrFull: string,
    flexibilityByDays: string [],
    flexibilityByDates: string [],
    /**
     * @summary more properties that were not in the original drive
     */
    implementsPreferences: string [],
    description: string,

}

export interface NightScheduleModel {
    id: string
    VehicleId: string,
    drivesToRemove: DriveModel[],
    Comments: string,
    optionalGuards: string [],
    guards: string[]

}

export interface SketchModel {
    id: string,
    name: string,
    vehicleSchedules: NightScheduleModel[],
    unassignedPreferences: PreferenceModel[],
    assignedPreferences: PreferenceModel[],
    Comments: string,
    suggestions?: any,
}
