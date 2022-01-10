import {IAction, ShmiraListStore} from './store.types';
import {ActionsTypes} from './types.actions';
import {NightScheduleModel, SketchModel} from '../models/Sketch.model';
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
    | ActionsTypes.CLICKED_ASSIGN_GUARD_TO_DATE


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
        newState = StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        StoreUtils.HandleReducerSaveToLocalStorage(newState);
        return newState
    },

    [ActionsTypes.CLICKED_ASSIGN_GUARD_TO_DATE]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {

        let newState = {...state}
        const preferenceToAssignId = action.payload.id
        const nightDateToAssign = action.payload.date
        const SketchIdInEdit = state.SketchIdInEdit

        const sketchObj: SketchModel | undefined = state.sketches.find((record: SketchModel) => record.id === SketchIdInEdit);
        if (sketchObj) {

            const nightToAssign = sketchObj.NightSchedule.find(n => n.date === nightDateToAssign);
            const preference: PreferenceModel | undefined = sketchObj.unassignedPreferences.find(p => p.id === preferenceToAssignId);
            let halfOrFull = '1'
            if (preference?.halfOrFull === '2') {
                halfOrFull = '2'
            }

            if (nightToAssign && nightToAssign.guards?.length < 2) {
                sketchObj.NightSchedule = sketchObj.NightSchedule.map((n: NightScheduleModel) => {
                    if (n.id === nightToAssign.id) {
                        const newNight = {...n}
                        newNight.guards = newNight.guards ? [...newNight.guards] : [];
                        newNight.guards.push(preferenceToAssignId);
                        if (halfOrFull === '2') {
                            newNight.guards.push(preferenceToAssignId);
                        }
                        return newNight
                    } else {
                        return n

                    }

                })

                ;
                const allGuardDutiesByPersonId: string [] = [];
                sketchObj.NightSchedule.forEach(n => n.guards.forEach(g => {
                    if (Number(g) > 0) {

                        allGuardDutiesByPersonId.push(g)

                    }


                }));
                const thisGuardAccurence = allGuardDutiesByPersonId.filter(id => id === preferenceToAssignId);
                if (thisGuardAccurence.length >= 2) {
                    sketchObj.unassignedPreferences = sketchObj.unassignedPreferences.filter(p => p.id != preferenceToAssignId);
                    sketchObj.assignedPreferences.push(preference as PreferenceModel);
                    newState.pendingPreferenceIdInEdit = null;

                }
                // sketchObj.unassignedPreferences = [...sketchObj.unassignedPreferences];
                // state.sketches = state.sketches.map((s: SketchModel) => {
                //     if (s.id === sketchObj.id) {
                //         return sketchObj
                //     } else {
                //         return s
                //     }
                //
                // })


            }
            newState.nights = [...sketchObj.NightSchedule]

        }
        state.sketches = [...state.sketches]
        newState = {...newState};

        //   newState = StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        StoreUtils.HandleReducerSaveToLocalStorage(newState);
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



