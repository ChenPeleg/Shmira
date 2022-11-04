import { PreferenceModel } from "../models/Preference.model";
import {
  PreferenceMetaDataModel,
  PreferenceMetaStatus,
  ShmiraListBuildSettings,
} from "./models/shmiraList.models";
import { ShmiraListBuilderTools } from "./shmiraList.tools";

export const ShmiraListBuilderBuildPreferencesMetaData = (
  preferences: PreferenceModel[],
  buildSettings: ShmiraListBuildSettings
): PreferenceMetaDataModel[] => {
  return preferences.map((p: PreferenceModel) => {
    const preferences = { ...p };
    if (buildSettings.isOneGuardForNight) {
      preferences.halfOrFull = "1";
    }

    const prefMeta: PreferenceMetaDataModel = {
      datesYouCanGuard: ShmiraListBuilderTools.buildDaysYouCanGuard(
        preferences,
        buildSettings.Range
      ),
      guardDates: [],
      id: p.id,
      length: 0,
      preference: p,
      status: PreferenceMetaStatus.None,
    };
    return prefMeta;
  });
};
