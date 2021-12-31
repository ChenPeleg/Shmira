import {PreferenceModel} from '../models/Preference.model';

import {PreferenceType} from '../models/PreferenceType.enum';
import {locations} from '../services/locations';
import {CloneUtil} from '../services/clone-utility';
import {Utils} from '../services/utils';
import {PreferenceMetaDataModel, PreferenceMetaStatus} from './models/shmiraList.models';

export const ShmiraListBuilderBuildPreferencesMetaData = (preferences: PreferenceModel[], buildSettings: any = null): PreferenceMetaDataModel[] => {
    let idCount: number = 1;
    const clonedPreferences: PreferenceModel[] = preferences.map((o: PreferenceModel) => CloneUtil.deep(o, 'PreferenceModel'));

    const preferencesMeta: PreferenceMetaDataModel[] = clonedPreferences.map((preference: PreferenceModel) => {
        const start: number = Utils.hourTextToDecimal(preference.optionalGuardDaysByDates);
        const finish: number = Utils.hourTextToDecimal(preference.finishHour);
        const length = finish - start;
        const metaPreference: PreferenceMetaDataModel = {
            id: idCount.toString(),
            preference: {...preference},
            finish: finish,
            start: start,
            length: length,
            status: PreferenceMetaStatus.None
        }
        idCount++;

        return metaPreference
    })

    // Estimate finish hour of non-Tsamud Drives
    preferencesMeta.forEach((metaPreference: PreferenceMetaDataModel) => {
        const driveType = metaPreference.preference.TypeOfDrivePreference
        if (driveType === PreferenceType.CanGuardIn) {
            return
        }
        const locationId = metaPreference.preference.location;
        let locationObj = locations.find(l => l.id === locationId);
        if (!locationObj) {
            locationObj = locations.find(l => l.name === 'Other') ||
                {
                    EnName: 'Other',
                    id: '999',
                    name: 'אחר',
                    ETA: 45,
                }

        }
        const EtaInHours = Utils.minutesToFraction(locationObj.ETA);
        switch (driveType) {
            case PreferenceType.CantGuardIn:
                metaPreference.finish = metaPreference.start + EtaInHours * 2;
                break;
            case PreferenceType.OneWayFrom:
                metaPreference.finish = metaPreference.start + EtaInHours;
                metaPreference.start = metaPreference.start - EtaInHours;
                break;
        }
        ;
        metaPreference.length = metaPreference.finish - metaPreference.start;


    })

    return preferencesMeta
}


