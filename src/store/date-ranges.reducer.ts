import {IAction, ShmiraListRecord, ShmiraListStore} from './store.types';
import {StoreUtils} from './store-utils';
import {ActionsTypes} from './types.actions';

export type DateRangesReducerFunctions =
    ActionsTypes.DATE_RANGES_UPDATE


export const DateRangesReducer: Record<DateRangesReducerFunctions, (state: ShmiraListStore, action: IAction) => ShmiraListStore> = {
    [ActionsTypes.DATE_RANGES_UPDATE]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}

        const currentShmiraId = newState.shmiraListId;
        const CurrentShmiraList: ShmiraListRecord | undefined = newState.shmiraListCollection?.find(l => l.id === currentShmiraId);
        if (CurrentShmiraList && action.payload?.DateTo && action.payload?.DateFrom) {

            CurrentShmiraList.DateFrom = action.payload.DateFrom
            CurrentShmiraList.DateTo = action.payload.DateTo
            newState.shmiraListCollection = newState.shmiraListCollection.map(s => {
                if (s.id === currentShmiraId) {
                    return {...CurrentShmiraList}
                } else {
                    return s
                }
            })
        }

        StoreUtils.HandleReducerSaveToLocalStorage(newState);
        return newState
    },


}

