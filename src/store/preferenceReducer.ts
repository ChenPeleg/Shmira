import {
  AppConstants,
  defaultPreferenceValues,
  IAction,
  ShmiraListStore,
} from "./store.types";
import { StoreUtils } from "./store-utils";
import { Utils } from "../services/utils";
import { PreferenceModel } from "../models/Preference.model";
import { ActionsTypes } from "./types.actions";

export type PreferenceReducerFunctions =
  | ActionsTypes.DELETE_ORDER
  | ActionsTypes.UPDATE_ORDER
  | ActionsTypes.ADD_NEW_ORDER
  | ActionsTypes.UPDATE_ORDER_IN_EDIT
  | ActionsTypes.CLICKED_ORDER
  | ActionsTypes.CLONE_ORDER;

export const PreferenceReducer: Record<
  PreferenceReducerFunctions,
  (state: ShmiraListStore, action: IAction) => ShmiraListStore
> = {
  [ActionsTypes.ADD_NEW_ORDER]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const newId = Utils.getNextId(getAllPreferencesIDs(state));
    const newPreference: PreferenceModel = {
      ...defaultPreferenceValues,
      id: newId,
    };
    newState.preferences = [...newState.preferences];
    newState.preferences.unshift(newPreference);
    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },
  [ActionsTypes.CLONE_ORDER]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    newState = updatePreferencesWithEditedPreference(newState);
    const cloneOriginId = action.payload.id;
    const cloneOriginPreference = newState.preferences.find(
      (preference) => cloneOriginId === preference.id
    );
    if (cloneOriginPreference) {
      const preferenceIndex =
        newState.preferences.indexOf(cloneOriginPreference) + 1;
      const newId = Utils.getNextId(getAllPreferencesIDs(state));
      const newPreference: PreferenceModel = {
        ...cloneOriginPreference,
        id: newId,
      };
      newState.preferences = [...newState.preferences];
      newState.preferences.splice(preferenceIndex, 0, newPreference);

      newState.shmiraListCollection =
        StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
      StoreUtils.HandleReducerSaveToLocalStorage(newState);
    }

    return newState;
  },
  [ActionsTypes.UPDATE_ORDER_IN_EDIT]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    newState.dataHolderForCurrentPreferenceInEdit = action.payload;
    return newState;
  },
  [ActionsTypes.UPDATE_ORDER]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const preferenceId = action.payload.id;
    newState.preferences = newState.preferences.map((preference) => {
      if (
        preferenceId === preference.id &&
        newState.dataHolderForCurrentPreferenceInEdit
      ) {
        preference = newState.dataHolderForCurrentPreferenceInEdit;
      }
      return preference;
    });
    newState.dataHolderForCurrentPreferenceInEdit = null;
    newState.preferenceIdInEdit = null;
    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },
  [ActionsTypes.CLICKED_ORDER]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const clickedPreferenceId = action.payload.id;
    newState = updatePreferencesWithEditedPreference(newState);
    newState.dataHolderForCurrentPreferenceInEdit = null;
    newState.preferenceIdInEdit = clickedPreferenceId;
    return newState;
  },
  [ActionsTypes.DELETE_ORDER]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const deletePreferenceId = action.payload.id;
    newState.preferences = newState.preferences.filter(
      (preference) => deletePreferenceId !== preference.id
    );
    if (
      newState.dataHolderForCurrentPreferenceInEdit &&
      newState.dataHolderForCurrentPreferenceInEdit.id === deletePreferenceId
    ) {
      newState.dataHolderForCurrentPreferenceInEdit = null;
    }
    if (newState.preferenceIdInEdit === deletePreferenceId) {
      newState.preferenceIdInEdit = null;
    }
    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },
};
const getAllPreferencesIDs = (state: ShmiraListStore): string[] => {
  const preferencesIds = state.preferences.map((o) => o.id);
  const deletedIdsWithWords = state.deletedPreferences.map((o) => o.id);
  const replaceIdsNames: RegExp = new RegExp(
    AppConstants.ArchiveIdPrefix + "|" + AppConstants.deleteIdPrefix,
    "g"
  );
  const deletedIds = deletedIdsWithWords.map((o) =>
    o.replace(replaceIdsNames, "")
  );
  return [...deletedIds, ...preferencesIds];
};
const updatePreferencesWithEditedPreference = (
  state: ShmiraListStore
): ShmiraListStore => {
  const currentPreferenceId = state?.dataHolderForCurrentPreferenceInEdit?.id;
  if (currentPreferenceId) {
    state.preferences = state.preferences.map((preference) => {
      if (
        currentPreferenceId === preference.id &&
        state.dataHolderForCurrentPreferenceInEdit
      ) {
        preference = state.dataHolderForCurrentPreferenceInEdit;
      }
      return preference;
    });
  }

  return state;
};
