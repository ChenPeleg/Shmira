import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel, PreferenceMetaStatus, ShmiraListBuildSettings} from './models/shmiraList.models';
import {ShmiraListBuilderTools} from './shmiraList.tools';


export const ShmiraListBuilderBuildPreferencesMetaData = (preferences: PreferenceModel[], buildSettings: ShmiraListBuildSettings): PreferenceMetaDataModel[] => {

    return preferences.map((p: PreferenceModel) => {

        const prefMeta: PreferenceMetaDataModel = {
            datesYouCanGuard: ShmiraListBuilderTools.buildDaysYouCanGuard(p, buildSettings.Range),
            guardDates: [],
            id: p.id,
            length: 0,
            preference: p,
            status: PreferenceMetaStatus.None

        }
        return prefMeta

    })
}


