import {IAction, ShmiraListStore} from './store.types';
import {ActionsTypes} from './types.actions';
import {StoreUtils} from './store-utils';

export type DisplayReducerFunctions =
    ActionsTypes.CHANGE_VIEW | ActionsTypes.CHANGE_USER_NAME | ActionsTypes.STOP_LOADING_ANIMATION | ActionsTypes.START_LOADING_ANIMATION


export const DisplayReducer: Record<DisplayReducerFunctions, (state: ShmiraListStore, action: IAction) => ShmiraListStore> = {
    [ActionsTypes.CHANGE_VIEW]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        newState.displaySetting = {...newState.displaySetting}
        newState.displaySetting.view = action.payload.value;
        newState.currentSessionState = {...newState.currentSessionState}


        StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        StoreUtils.HandleReducerSaveToLocalStorage(newState);
        return newState
    },
    [ActionsTypes.CHANGE_USER_NAME]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        newState.currentSessionState = {...newState.currentSessionState}
        newState.currentSessionState.userName = action.payload.value;

        StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        StoreUtils.HandleReducerSaveToLocalStorage(newState);
        return newState
    },
    [ActionsTypes.STOP_LOADING_ANIMATION]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        newState.currentSessionState = {...newState.currentSessionState};
        newState.currentSessionState.isAnimationRunning = false
        return newState
    },
    [ActionsTypes.START_LOADING_ANIMATION]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        newState.currentSessionState = {...newState.currentSessionState};
        newState.currentSessionState.isAnimationRunning = true
        return newState
    }


}


