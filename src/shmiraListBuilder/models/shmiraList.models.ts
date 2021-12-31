import {PreferenceModel} from '../../models/Preference.model';

export interface SuggestionModel {
    driveId: string | string [];
}

export interface ShmiraListBuildSettings {
    custom: any
}

export enum PreferenceMetaStatus {
    None = 0,
    Approved = 1,
    Pending = 2,
}

export interface PreferenceMetaDataModel {
    id: string
    preference: PreferenceModel,
    start: number
    finish: number,
    length: number,
    status: PreferenceMetaStatus
}

export const BuilderConstants: Object = {
    drivesToResolve: 'DtoRes'
}
