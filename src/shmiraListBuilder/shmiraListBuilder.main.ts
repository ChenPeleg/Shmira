import { ShmiraListRecord } from "../store/store.types";
import { SketchModel } from "../models/Sketch.model";

import { ShmiraListBuilderBuildNightsAndUnAssigned } from "./shmiraListBuilder.assignGuards";

import { Utils } from "../services/utils";
import {
  PreferenceMetaDataModel,
  ShmiraListBuildSettings,
} from "./models/shmiraList.models";
import { ShmiraListBuilderTools } from "./shmiraList.tools";
import { ShmiraListBuilderBuildPreferencesMetaData } from "./shmiraListBuilder.buildPreferenceMetaData";

export const ShmiraListBuilder = (
  ShmiraList: ShmiraListRecord,
  buildSettings: any = null
): SketchModel => {
  if (ShmiraList === null) {
    // ShmiraList = mockShmiraList as any;
  }
  const settings: ShmiraListBuildSettings = {
    custom: null,
    Range: {
      DateFrom: ShmiraList.DateFrom,
      DateTo: ShmiraList.DateTo,
    },
    daysBetweenGuardDuty: ShmiraList.daysBetweenGuardDuty,
    isOneGuardForNight: ShmiraList.isOneGuardForNight,
  };
  const preferencesMetaData: PreferenceMetaDataModel[] =
    ShmiraListBuilderBuildPreferencesMetaData(ShmiraList.preferences, settings);

  const BuildResult = ShmiraListBuilderBuildNightsAndUnAssigned(
    preferencesMetaData,
    settings
  );

  const baseSketch: SketchModel = {
    id: "2",
    name: "first sketch",
    NightSchedule: BuildResult.nightSchedules, // initialVehicles,
    Comments: "",
    unassignedPreferences: BuildResult.unassignedPreferences,
    assignedPreferences: BuildResult.assignedPreferences,
    isOneGuardForNight: false,
  };

  const newId = Utils.getNextId(ShmiraList.sketches.map((v) => v.id));
  baseSketch.id = newId;
  baseSketch.name = ShmiraListBuilderTools.createSketchName(baseSketch.id);

  //  console.log(baseSketch)
  return baseSketch;
};
