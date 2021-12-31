import {PreferenceType} from './PreferenceType.enum';

export interface PreferenceModel {
    id: string,
    guardName: string,
    location: string,
    finishHour: string,
    TypeOfDrivePreference: PreferenceType | null,
    Comments: string,
    halfOrFull: string,
    flexibilityByDays:  string[],
    flexibilityByDates:  string[]
    optionalGuardDaysByDates: string,
}

export class PreferenceFields implements PreferenceModel {
    id: string = 'id';
    guardName: string = 'guardName';
    finishHour: string = 'finishHour';
    TypeOfDrivePreference: PreferenceType | null = null;
    Comments: string = 'Comments';
    location: string = 'location';
    halfOrFull: string = 'halfOrFull';
    flexibilityByDays:  string[] = ['flexibilityByDays', 'flexibilityByDays'];
    flexibilityByDates:  string[] = ['flexibilityByDates', 'flexibilityByDates']
    optionalGuardDaysByDates: string = 'optionalGuardDaysByDates';

    constructor() {

    }
}
