import {ActionsTypes} from './types.actions'
import {PreferenceModel} from '../models/Preference.model';
import {PreferenceType} from '../models/PreferenceType.enum';
import {VehicleModel} from '../models/Vehicle.model';
import {SketchModel} from '../models/Sketch.model';
import {LocationGroup} from '../models/Location.model';

export type ActionType = string;

export type IAction = {
    type: ActionsTypes
    payload: any | { value: any }
}

export interface ShmiraListRecord {
    id: string,
    Name: string,
    preferences: PreferenceModel[];
    vehicles: VehicleModel[];
    deletedPreferences: PreferenceModel[];
    defaultPreferenceValues?: PreferenceModel,
    sketches: SketchModel[],
    chosenSketch: string,
    locationGroup: LocationGroup | null
}

export interface DisplaySettings {
    view: 'preferences' | 'sketch' | 'locationsView'
}

export interface SessionModel {
    locationGroupInEdit: null | string;
    preferenceIdInEdit: null | string;
    pendingPreferenceIdInEdit: null | string;
    SketchIdInEdit: null | string;
    LocationGroupTabOpen: null | string;
    dataHolderForCurrentPreferenceInEdit: null | PreferenceModel
}

export interface ShmiraListStore {
    shmiraListCollection: ShmiraListRecord[];
    shmiraListArchive: ShmiraListRecord[];
    preferences: PreferenceModel[];
    vehicles: VehicleModel[];
    deletedPreferences: PreferenceModel[];
    defaultPreferenceValues: PreferenceModel,
    displaySetting: DisplaySettings,
    sketches: SketchModel[];
    shmiraListId: string;
    LocationGroups: null | LocationGroup[];
    currentSessionState: SessionModel;
    // Move to Session state
    dataHolderForCurrentPreferenceInEdit: PreferenceModel | null;
    locationGroupInEdit: null | string;
    preferenceIdInEdit: null | string;
    pendingPreferenceIdInEdit: null | string;
    SketchIdInEdit: null | string;

}

export const defaultPreferenceValues: PreferenceModel = {
    id: '1',
    guardName: '',
    optionalGuardDaysByDates: '08:00',
    finishHour: '09:00',
    TypeOfDrivePreference: PreferenceType.CantGuardIn,
    Comments: '',
    halfOrFull: '1',
    flexibilityByDays: [ ],
    flexibilityByDates: [ ],
    location: ''
}
export const defaultVehicleValues: VehicleModel = {
    id: '1',
    vehicleName: 'רכב',
    optionalGuardDaysByDates: '08:00',
    endHour: '09:00',
    kmLimit: '',
    seats: '5',
    Comments: ''
}
export const AppConstants = {
    deleteIdPrefix: 'Del',
    ArchiveIdPrefix: 'Arch',

}

export enum FileUploadType {
    uploadFullDataAndReplace = 1,
    uploadFullDataAndAdd = 2,
    uploadSpecificData = 3
}

export interface SaveDataModel {
    userId: string,
    userName: string,
    timeStamp: string,
    savedStore: ShmiraListStore,
    hash: string
}
