import { ActionsTypes } from "./types.actions";

import { IAction, ShmiraListRecord, ShmiraListStore } from "./store.types";
import {
  ExtendedPreferenceModel,
  NightScheduleModel,
  SketchModel,
} from "../models/Sketch.model";
import { CloneUtil } from "../services/clone-utility";
import { PreferenceModel } from "../models/Preference.model";
import { StoreUtils } from "./store-utils";

export type SketchDriveReducerFunctions =
  | ActionsTypes.DELETE_SKETCH_DRIVE
  | ActionsTypes.UPDATE_SKETCH_NIGHT
  | ActionsTypes.REMOVE_GUARD_FROM_SKETCH_NIGHT;

export const ListSketchNightReducer: Record<
  SketchDriveReducerFunctions,
  (state: ShmiraListStore, action: IAction) => ShmiraListStore
> = {
  [ActionsTypes.UPDATE_SKETCH_NIGHT]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const sketchDriveChanged: ExtendedPreferenceModel = action.payload.value;
    const SketchIdInEdit = newState.SketchIdInEdit;

    const sketchObj: SketchModel | undefined = newState.sketches.find(
      (record: SketchModel) => record.id === SketchIdInEdit
    );

    if (sketchObj !== undefined) {
      // const vehicleId = getVehicleIdFromDriveId(state, sketchDriveChanged.id);
      // const relevantVehicle = sketchObj.NightSchedule.find(v => v.id === vehicleId);
      // const drivesToRemove = drivesToRemove.map((d: ExtendedPreferenceModel) => {
      //     if (d.id === sketchDriveChanged.id) {
      //         return sketchDriveChanged
      //     } else {
      //         return d
      //     }
      // })
    }
    return newState;
  },

  [ActionsTypes.REMOVE_GUARD_FROM_SKETCH_NIGHT]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };

    const sketchNightChangedId: string = action.payload.sketchNightId;
    const preferenceIdToRemove: string = action.payload.preferenceId;
    const SketchIdInEdit = newState.SketchIdInEdit;

    const sketchObj: SketchModel | undefined = newState.sketches.find(
      (record: SketchModel) => record.id === SketchIdInEdit
    );

    if (sketchObj !== undefined) {
      sketchObj.NightSchedule = sketchObj.NightSchedule.map(
        (n: NightScheduleModel) => {
          if (n.id === sketchNightChangedId) {
            const newNight = { ...n };
            newNight.guards = newNight.guards.filter(
              (g) => g !== preferenceIdToRemove
            );
            return newNight;
          } else {
            return n;
          }
        }
      );

      let PreferenceToMoveToUnassinged: PreferenceModel | undefined =
        sketchObj.assignedPreferences.find(
          (o) => o.id === preferenceIdToRemove
        );
      if (PreferenceToMoveToUnassinged) {
        sketchObj.assignedPreferences = sketchObj.assignedPreferences.filter(
          (o) => o.id !== preferenceIdToRemove
        );
        sketchObj.unassignedPreferences = [...sketchObj.unassignedPreferences];
        if (
          sketchObj.unassignedPreferences
            .map((un) => un.id)
            .includes(PreferenceToMoveToUnassinged.id)
        ) {
          // do nothing the guard is there
        } else {
          sketchObj.unassignedPreferences.push(PreferenceToMoveToUnassinged);
        }
      }

      newState.nights = [...sketchObj.NightSchedule];
    }
    StoreUtils.updateShmiraListRecordWithSketchChanges(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },
  [ActionsTypes.DELETE_SKETCH_DRIVE]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const sketchDriveToDelete: ExtendedPreferenceModel = action.payload.value;
    const SketchIdInEdit = newState.SketchIdInEdit;

    const sketchObj: SketchModel | undefined = newState.sketches.find(
      (record: SketchModel) => record.id === SketchIdInEdit
    );

    if (sketchObj !== undefined) {
      const vehicleId = getVehicleIdFromDriveId(state, sketchDriveToDelete.id);
      const relevantVehicle = sketchObj.NightSchedule.find(
        (v) => v.id === vehicleId
      );
      if (relevantVehicle) {
        const newDrives: (ExtendedPreferenceModel | null)[] =
          relevantVehicle.drivesToRemove.map((d: ExtendedPreferenceModel) => {
            if (d.id === sketchDriveToDelete.id) {
              return null;
            } else {
              return d;
            }
          });
        relevantVehicle.drivesToRemove = newDrives.filter(
          (d) => d
        ) as ExtendedPreferenceModel[];
      }
    }
    StoreUtils.updateShmiraListRecordWithSketchChanges(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);

    return newState;
  },
};
const updateShmiraListRecordWithSketchChanges = (
  state: ShmiraListStore
): ShmiraListStore => {
  const newState = { ...state };
  const thisShmiraListInCollection: ShmiraListRecord | undefined =
    newState.shmiraListCollection.find(
      (shmiraList: ShmiraListRecord) => shmiraList.id === newState.shmiraListId
    );

  if (thisShmiraListInCollection) {
    thisShmiraListInCollection.sketches = newState.sketches.map((s) =>
      CloneUtil.deepCloneSketch(s)
    );
  }

  return newState;
};

const getVehicleIdFromDriveId = (
  state: ShmiraListStore,
  driveId: string
): string => {
  const SketchIdInEdit = state.SketchIdInEdit;
  const sketchObj: SketchModel | undefined = state.sketches.find(
    (record: SketchModel) => record.id === SketchIdInEdit
  );
  const vehicleSchedules = sketchObj?.NightSchedule || [];
  let vehicleId = "";
  vehicleSchedules.forEach((v: NightScheduleModel) => {
    v.drivesToRemove.forEach((d: ExtendedPreferenceModel) => {
      if (d.id === driveId) {
        vehicleId = v.id;
      }
    });
  });
  return vehicleId;
};
