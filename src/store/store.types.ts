import {ActionsTypes} from './types.actions'
import {PreferenceModel} from '../models/Preference.model';
import {PreferenceType, WeekDaysOrDates} from '../models/PreferenceType.enum';
import {NightScheduleModel, SketchModel} from '../models/Sketch.model';
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
    daysBetweenGuardDuty: string;
    deletedPreferences: PreferenceModel[];
    defaultPreferenceValues?: PreferenceModel,
    sketches: SketchModel[],
    chosenSketch: string,
    locationGroup: LocationGroup | null,
    DateFrom: string,
    DateTo: string
}

export interface DisplaySettings {
    view: 'preferences' | 'sketch' | 'locationsView'
}

export interface SessionModel {
    userName: string
    locationGroupInEdit: null | string;
    preferenceIdInEdit: null | string;
    pendingPreferenceIdInEdit: null | string;
    SketchIdInEdit: null | string;
    LocationGroupTabOpen: null | string;
    dataHolderForCurrentPreferenceInEdit: null | PreferenceModel,
    isAnimationRunning: boolean;
    isImportSheetModalOpen : boolean,
    canImportSheetModalOpen : boolean
}

export interface ShmiraListStore {
    shmiraListCollection: ShmiraListRecord[];
    shmiraListArchive: ShmiraListRecord[];
    preferences: PreferenceModel[];

    daysBetweenGuardDuty: string;
    deletedPreferences: PreferenceModel[];
    defaultPreferenceValues: PreferenceModel,
    displaySetting: DisplaySettings,
    sketches: SketchModel[];
    shmiraListId: string;
    LocationGroups: null | LocationGroup[];
    currentSessionState: SessionModel;
    nights: NightScheduleModel[]
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
    optionalGuardDaysByDates: '',
    finishHour: '',
    TypeOfInfoPreference: PreferenceType.CantGuardIn,
    Comments: '',
    halfOrFull: '1',
    flexibilityByDays: [],
    flexibilityByDates: [],
    location: '',
    weekDaysOrDates: WeekDaysOrDates.WeekDays
}
export const defaultDaysBetweenGuardDuty = '6'
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
