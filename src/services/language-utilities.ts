import {PreferenceType} from '../models/PreferenceType.enum';
import {translations} from './translations';
import {PreferenceModel} from '../models/Preference.model';
import {LocationModel} from '../models/Location.model';
import {DriveModel} from '../models/Sketch.model';
import {SketchEditActionEnum} from '../models/SketchEditAction.enum';

interface driveHourPrefixes {
    timeStart: string,
    timeEnd: string,
    location: string

}

export const LanguageUtilities = {
    getPrefixByDriveType(driveType: PreferenceType | undefined): driveHourPrefixes {
        switch (driveType) {
            case PreferenceType.OneWayFrom:
                return {
                    timeStart: translations.pickupTime,
                    timeEnd: '',
                    location: translations.fromLocation
                }
            case PreferenceType.CantGuardIn:
                return {
                    timeStart: translations.exitTime,
                    timeEnd: '',
                    location: translations.toLocation
                }
            case PreferenceType.CanGuardIn:
                return {
                    timeStart: translations.exitTime,
                    timeEnd: translations.returnTime,
                    location: translations.inLocation
                }
            case PreferenceType.CantGuardIn:
                return {
                    timeStart: translations.Start,
                    timeEnd: translations.returnTime,
                    location: translations.inLocation
                }

        }
        return {
            timeStart: translations.exitTime,
            timeEnd: translations.returnTime,
            location: translations.Where + ' '
        }

    },

    buildBriefText(preferenceValues: PreferenceModel | DriveModel, locations: LocationModel[]): { timeText: string, driverAndLocation: string } {
        const isWithName = preferenceValues.guardName.trim() !== '';
        if (!isWithName) {
            return {
                timeText: '',
                driverAndLocation: translations.NewPreference
            }

        }
        let timeText = preferenceValues?.optionalGuardDaysByDates || '';
        if (preferenceValues.TypeOfInfoPreference === PreferenceType.CanGuardIn && preferenceValues?.optionalGuardDaysByDates && preferenceValues?.finishHour) {
            timeText = preferenceValues.optionalGuardDaysByDates + ' - ' + preferenceValues.finishHour;
        }
        let briefText = preferenceValues.guardName;
        if (preferenceValues.TypeOfInfoPreference && preferenceValues.location) {
            const driveTimeLanguage = LanguageUtilities.getPrefixByDriveType(preferenceValues.TypeOfInfoPreference);
            const location = locations.find(l => l.id === preferenceValues.location);
            if (location) {
                briefText += ' ' + driveTimeLanguage.location + location.name
            }

        }

        return {
            timeText: timeText,
            driverAndLocation: briefText
        }
    },
    renderPassengerText(num: string): string {
        if (num === '1') {
            return translations.halfNight
        } else {
            return translations.fullNight
        }

    },
    addLineBreaksToString(str: string, numberOfBR: number = 2): string {
        const br = '\n   ';
        const arr = new Array(numberOfBR)
        return str + arr.map(s => br).join('')
    },
    buildSketchEditActionsArray(): { action: SketchEditActionEnum, name: string, icon: string } [] {
        const ret: { action: SketchEditActionEnum, name: string, icon: string } [] = []
        for (let sketchEditActionEnumKey in SketchEditActionEnum) {
            if (isNaN(Number(sketchEditActionEnumKey))) {
                continue
            }
            let name = sketchEditActionEnumKey;
            const enumbEntry = Number(sketchEditActionEnumKey) as SketchEditActionEnum
            switch (enumbEntry) {
                case SketchEditActionEnum.Split:


                    name = translations.SketchActionSplit;

                    break;
                case SketchEditActionEnum.Merge:
                    name = translations.SketchActionMerge;
                    break;
                case SketchEditActionEnum.Change:
                    name = translations.SketchActionChange;
                    break;
                case SketchEditActionEnum.ChangeTime:
                    name = translations.SketchActionChangeTime;
                    break;
                case SketchEditActionEnum.ReplaceExisting:
                    name = translations.SketchActionReplaceExisting;
                    break;
                case SketchEditActionEnum.publicTransport:
                    name = translations.SketchActionPublicTransport
                    break;
                case SketchEditActionEnum.RemoveFromPending:
                    name = translations.SketchActionRemove;
                    break;
            }
            ret.push({
                action: Number(sketchEditActionEnumKey),
                name: name,
                icon: SketchEditActionEnum[enumbEntry]
            })
        }
        return ret
    },
    trimText(name: string, maxNameLength: number = 30): string {
        // let maxNameLength = 30;
        let threeDots = ''
        if (!name) {
            name = ''
        }
        if (name.length > maxNameLength) {
            threeDots = '...'
        }
        return name.slice(0, maxNameLength) + threeDots;


    }
}
