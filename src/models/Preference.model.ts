import {PreferenceType} from './PreferenceType.enum';

export interface PreferenceModel {
    id: string,
    driverName: string,
    startHour: string,
    finishHour: string,
    TypeOfDrive: PreferenceType | null,
    location: string,
    Comments: string,
    passengers: string,
    flexibility: [string, string]
}

export class PreferenceFields implements PreferenceModel {
    id: string = 'id';
    driverName: string = 'driverName';
    startHour: string = 'startHour';
    finishHour: string = 'finishHour';
    TypeOfDrive: PreferenceType | null = null;
    Comments: string = 'Comments';
    location: string = 'location';
    passengers: string = 'passengers';
    flexibility: [string, string] = ['flexibility', 'flexibility']

    constructor() {

    }
}
