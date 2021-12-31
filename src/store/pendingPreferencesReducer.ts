import {IAction, ShmiraListStore} from './store.types';
import {ActionsTypes} from './types.actions';
import {SketchModel} from '../models/Sketch.model';
import {StoreUtils} from './store-utils';
import {PreferenceModel} from '../models/Preference.model';

export type PendingPreferencesReducerFunctions =
    ActionsTypes.CLICKED_PENDING_ORDER
    | ActionsTypes.CLICKED_CLOSE_PENDING_ORDER
    | ActionsTypes.CLICKED_REMOVE_PENDING_ORDER
    | ActionsTypes.CLICKED_MERGE_PENDING_ORDER
    | ActionsTypes.CLICKED_SPLIT_PENDING_ORDER
    | ActionsTypes.CLICKED_CHANGE_PENDING_ORDER
    | ActionsTypes.CLICKED_CHANGE_TIME_PENDING_ORDER
    | ActionsTypes.CLICKED_REPLACE_EXISTING_PENDING_ORDER
    | ActionsTypes.CLICKED_PUBLIC_TRANSPORT_PENDING_ORDER
    | ActionsTypes.CLICKED_ADD_TO_PENDING_PENDING_ORDER


export const PendingPreferencesReducer: Record<PendingPreferencesReducerFunctions, (state: ShmiraListStore, action: IAction) => ShmiraListStore> = {
    [ActionsTypes.CLICKED_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        if (action.payload.id) {
            newState.pendingPreferenceIdInEdit = action.payload.id;
        }

        return newState
    },
    [ActionsTypes.CLICKED_CLOSE_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}

        newState.pendingPreferenceIdInEdit = null;


        return newState
    },

    [ActionsTypes.CLICKED_REMOVE_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        const preferenceToRemoveId = action.payload.id
        const SketchIdInEdit = state.SketchIdInEdit

        const sketchObj: SketchModel | undefined = state.sketches.find((record: SketchModel) => record.id === SketchIdInEdit);
        if (sketchObj) {
            const preferenceToRemove: PreferenceModel | undefined = sketchObj.unassignedPreferences.find(o => o.id === preferenceToRemoveId);
            if (preferenceToRemove) {
                sketchObj.assignedPreferences = [...sketchObj.assignedPreferences]
                sketchObj.assignedPreferences.push(preferenceToRemove);
                sketchObj.unassignedPreferences = [...sketchObj.unassignedPreferences];
                sketchObj.unassignedPreferences = sketchObj.unassignedPreferences.filter(o => o.id !== preferenceToRemoveId);
                newState.sketches = newState.sketches.map((sketch: SketchModel) => {
                    if (sketch.id === SketchIdInEdit) {
                        return {...sketchObj}
                    } else {
                        return sketch
                    }
                });
            }
            newState.pendingPreferenceIdInEdit = null;
        }
        StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        return newState
    },
    [ActionsTypes.CLICKED_MERGE_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        return newState
    },
    [ActionsTypes.CLICKED_SPLIT_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        return newState
    },
    [ActionsTypes.CLICKED_CHANGE_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        return newState
    },
    [ActionsTypes.CLICKED_CHANGE_TIME_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}

        return newState
    },
    [ActionsTypes.CLICKED_REPLACE_EXISTING_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        return newState
    },
    [ActionsTypes.CLICKED_PUBLIC_TRANSPORT_PENDING_ORDER]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        return newState
    },
    [ActionsTypes.CLICKED_ADD_TO_PENDING_PENDING_ORDER]:
        (state: ShmiraListStore, action: IAction): ShmiraListStore => {
            let newState = {...state}
            return newState
        },


}



