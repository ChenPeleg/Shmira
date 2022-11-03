import { ActionsTypes } from "./types.actions";

import { IAction, ShmiraListStore } from "./store.types";
import { StoreUtils } from "./store-utils";
import { VehicleModel } from "../models/Vehicle.model";

export type VehicleReducerFunctions =
  | ActionsTypes.DELETE_VEHICLE
  | ActionsTypes.UPDATE_VEHICLE
  | ActionsTypes.NEW_VEHICLE;

export const VehicleReducer: Record<
  VehicleReducerFunctions,
  (state: ShmiraListStore, action: IAction) => ShmiraListStore
> = {
  [ActionsTypes.NEW_VEHICLE]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };

    const newVehicle: VehicleModel = action.payload.value;

    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },

  [ActionsTypes.UPDATE_VEHICLE]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const updateVehicle: VehicleModel = action.payload.value;

    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },

  [ActionsTypes.DELETE_VEHICLE]: (
    state: ShmiraListStore,
    action: IAction
  ): ShmiraListStore => {
    let newState = { ...state };
    const deleteVehiclerId = action.payload.id;
    newState.shmiraListCollection =
      StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
    StoreUtils.HandleReducerSaveToLocalStorage(newState);
    return newState;
  },
};
