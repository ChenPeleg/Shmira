import {AppConstants, IAction, ShmiraListStore} from './store.types';
import {ActionsTypes} from './types.actions';
import {StoreUtils} from './store-utils';

export type DisplayReducerFunctions =
    ActionsTypes.CHANGE_VIEW


export const DisplayReducer: Record<DisplayReducerFunctions, (state: ShmiraListStore, action: IAction) => ShmiraListStore> = {
    [ActionsTypes.CHANGE_VIEW]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        newState.displaySetting = {...newState.displaySetting}
        newState.displaySetting.view = action.payload.value;

        StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        StoreUtils.HandleReducerSaveToLocalStorage(newState);
        return newState
    },


}
const getAllPreferencesIDs = (state: ShmiraListStore): string[] => {
    const preferencesIds = state.preferences.map(o => o.id);
    const deletedIdsWithWords = state.deletedPreferences.map(o => o.id);
    const replaceIdsNames: RegExp = new RegExp(AppConstants.ArchiveIdPrefix + '|' + AppConstants.deleteIdPrefix, 'g');
    ;
    const deletedIds = deletedIdsWithWords.map(o => o.replace(replaceIdsNames, ''))
    return [...deletedIds, ...preferencesIds]
}
const updatePreferencesWithEditedPreference = (state: ShmiraListStore): ShmiraListStore => {
    const currentPreferenceId = state?.dataHolderForCurrentPreferenceInEdit?.id
    if (currentPreferenceId) {
        state.preferences = state.preferences.map(preference => {
            if ((currentPreferenceId === preference.id) && state.dataHolderForCurrentPreferenceInEdit) {
                preference = state.dataHolderForCurrentPreferenceInEdit
            }
            return preference
        });
    }


    return state
}


