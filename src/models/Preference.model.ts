import {PreferenceType} from './PreferenceType.enum';

export interface PreferenceModel {
    id: string,
    guardName: string,
    startHour: string,
    finishHour: string,
    TypeOfDrive: PreferenceType | null,
    location: string,
    Comments: string,
    halfOrFull: string,
    flexibility: [string, string]
}

export class PreferenceFields implements PreferenceModel {
    id: string = 'id';
    guardName: string = 'guardName';
    startHour: string = 'startHour';
    finishHour: string = 'finishHour';
    TypeOfDrive: PreferenceType | null = null;
    Comments: string = 'Comments';
    location: string = 'location';
    halfOrFull: string = 'halfOrFull';
    flexibility: [string, string] = ['flexibility', 'flexibility']

    constructor() {

    }
}
