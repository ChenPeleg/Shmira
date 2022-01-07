import {translations} from '../services/translations';
import {PreferenceMetaDataModel} from './models/shmiraList.models';

export const ShmiraListBuilderTools = {

    createSketchName(id: string): string {
        switch (id) {

            case '1':
                return translations.first
            case '2':
                return translations.second
            case '3':
                return translations.third
            default:
                return translations.number + ' ' + id

        }
    },
    EnumeratorConstructor(startId: number = 1): { getId: () => number, getStrId: () => string, } {
        let currentId = startId;
        return {
            getId() {
                return ++currentId
            },
            getStrId() {
                return (++currentId).toString()
            }
        }
    },
    checkIfPersonCanGuard(preference: PreferenceMetaDataModel, date: string, daysBetweenGuardDuty: string): boolean {
        if (!preference.datesYouCanGuard.includes(date)) {
            return false
        }
        const daysBetweenNumber = Number(daysBetweenGuardDuty) || 6
        if (preference.guardDates.length === 0) {
            return true
        } else if (preference.guardDates.length === 1) {
            const gap = Number(date) - Number(preference.guardDates[0]);
            if (Math.abs(gap) + 1 > daysBetweenNumber) {
                return true
            }

        }
        return false
    }

}
