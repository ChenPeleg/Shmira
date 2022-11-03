import {
  FileUploadType,
  IAction,
  SaveDataModel,
  ShmiraListRecord,
  ShmiraListStore,
} from "./store.types";
import { StoreUtils } from "./store-utils";
import { DownloadFile } from "../services/download-file";
import { Utils } from "../services/utils";
import { ActionsTypes } from "./types.actions";
import {
  getDatesFromImportedPreferences,
  ImportPreferencesFromText,
  vlidateImportedData,
} from "../services/import-orders-from-text";
import { PreferenceModel } from "../models/Preference.model";

export type ImportReducerFunctions =
  | ActionsTypes.EXPORT_ALL
  | ActionsTypes.IMPORT_FILE_UPLOADED
  | ActionsTypes.IMPORT_ORDERS_AS_TEXT
  | ActionsTypes.OPEN_IMPORT_SHEETS_MODAL
  | ActionsTypes.CLOSE_IMPORT_SHEETS_MODAL
  | ActionsTypes.IMPORT_SHEETS_DATA_PASTE
  | ActionsTypes.APPROVE_IMPORT_SHEETS_DATA;

export const ImportExportReducer: Record<
  ImportReducerFunctions,
  (state: ShmiraListStore, action: IAction) => ShmiraListStore
> = {
  [ActionsTypes.EXPORT_ALL]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    const saveObj: SaveDataModel = StoreUtils.buildSaveDataModel(newState);
    DownloadFile("shmiraList.json", JSON.stringify(saveObj));
    return newState;
  },
  [ActionsTypes.OPEN_IMPORT_SHEETS_MODAL]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    newState.currentSessionState = { ...newState.currentSessionState };
    newState.currentSessionState.isImportSheetModalOpen = true;
    newState.currentSessionState.importSheetCheckStatus = false;

    return newState;
  },
  [ActionsTypes.IMPORT_SHEETS_DATA_PASTE]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    newState.currentSessionState = { ...newState.currentSessionState };
    const modeledImportedPreferences: PreferenceModel[] =
      ImportPreferencesFromText(action.payload);
    try {
      vlidateImportedData(modeledImportedPreferences);
    } catch (err: any) {
      newState.currentSessionState.importSheetCheckStatus =
        "Error: " + err.message || "Error";
      return newState;
    }

    newState.currentSessionState.importSheetCheckStatus = "OK";
    return newState;
  },
  [ActionsTypes.APPROVE_IMPORT_SHEETS_DATA]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    newState.currentSessionState = { ...newState.currentSessionState };
    const modeledImportedPreferences: PreferenceModel[] =
      ImportPreferencesFromText(action.payload);
    try {
      vlidateImportedData(modeledImportedPreferences);
    } catch (err: any) {
      newState.currentSessionState.importSheetCheckStatus =
        "Error: " + err.message || "Error";
      return newState;
    }

    newState.preferences = newState.preferences.concat(
      modeledImportedPreferences
    );

    newState.currentSessionState.importSheetCheckStatus = false;
    newState.currentSessionState.isImportSheetModalOpen = false;

    const currentShmiraId = newState.shmiraListId;
    const CurrentShmiraList: ShmiraListRecord | undefined =
      newState.shmiraListCollection?.find((l) => l.id === currentShmiraId);

    const dateRange = getDatesFromImportedPreferences(
      modeledImportedPreferences
    );

    if (CurrentShmiraList) {
      const sheetsFrom = +dateRange[0];
      const sheetsTo = +dateRange[1];
      let from = +CurrentShmiraList.DateFrom;
      let to = +CurrentShmiraList.DateTo;
      if (sheetsFrom < from || true) {
        from = sheetsFrom - 1;
      }
      if (sheetsTo > to || true) {
        to = sheetsTo + 1;
      }
      CurrentShmiraList.DateFrom = from.toString();
      CurrentShmiraList.DateTo = to.toString();
      newState.shmiraListCollection = newState.shmiraListCollection.map((s) => {
        if (s.id === currentShmiraId) {
          return { ...CurrentShmiraList };
        } else {
          return s;
        }
      });
    }

    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },

  [ActionsTypes.CLOSE_IMPORT_SHEETS_MODAL]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };

    newState.currentSessionState = { ...newState.currentSessionState };
    newState.currentSessionState.isImportSheetModalOpen = false;
    newState.currentSessionState.importSheetCheckStatus = false;
    return newState;
  },
  [ActionsTypes.IMPORT_FILE_UPLOADED]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const uploadType: FileUploadType = action.payload.uploadType;
    const fileAsString: string = action.payload.fileAsString;
    try {
      const fileObj: any = JSON.parse(fileAsString);
      if (fileObj && fileObj?.savedStore && fileObj?.hash) {
        Utils.validateHash(fileObj?.savedStore, fileObj?.hash);
        const storeFromFile = {
          ...fileObj.savedStore,
        };
        switch (uploadType) {
          case FileUploadType.uploadFullDataAndAdd:
            newState = storeFromFile;
            break;
        }
      }
    } catch (e) {
    } finally {
    }
    return newState;
  },
  [ActionsTypes.IMPORT_ORDERS_AS_TEXT]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const importedPreferences: string = action.payload.importedPreferences;
    const modeledImportedPreferences: PreferenceModel[] =
      ImportPreferencesFromText(importedPreferences);
    newState.preferences = newState.preferences.concat(
      modeledImportedPreferences
    );

    return newState;
  },
};
