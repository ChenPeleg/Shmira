import {PreferenceModel} from '../../models/Preference.model';

export interface SuggestionModel {
    driveId: string | string [];
}

export interface ShmiraListBuildSettings {
    custom?: any,
    Range: RangeModel
}

export enum PreferenceMetaStatus {
    None = 0,
    Approved = 1,
    Pending = 2,
}

export interface PreferenceMetaDataModel {
    id: string
    preference: PreferenceModel,
    datesYouCanGuard: string[]
    guardDates: [string, string] | [string] | [],
    length: number,
    status: PreferenceMetaStatus
}

export interface RangeModel {
    DateFrom: string,
    DateTo: string
}


export const BuilderConstants: Object = {
    drivesToResolve: 'DtoRes'
}
