import {ShmiraListRecord} from '../store/store.types';
import {SketchModel, VehicleScheduleModel} from '../models/Sketch.model';


import {ShmiraListBuilderBuildVehiclesAndUnAssigned} from './shmiraListBuilder.buildMonths';

import {Utils} from '../services/utils';
import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel, ShmiraListBuildSettings} from './models/shmiraList.models';
import {ShmiraListBuilderTools} from './shmiraList.tools';
import {ShmiraListBuilderBuildPreferencesMetaData} from './shmiraListBuilder.buildPreferenceMetaData';

export const ShmiraListBuilder = (ShmiraList: ShmiraListRecord, buildSettings: any = null): SketchModel => {
    if (ShmiraList === null) {
        ShmiraList = mockShmiraList as any;
    }
    const settings: ShmiraListBuildSettings = {custom: null}
    const preferencesMetaData: PreferenceMetaDataModel[] = ShmiraListBuilderBuildPreferencesMetaData(ShmiraList.preferences, settings)
    const BuildResult = ShmiraListBuilderBuildVehiclesAndUnAssigned(preferencesMetaData, ShmiraList.vehicles, settings);
    const initialVehicles: VehicleScheduleModel [] = BuildResult.vehicleSchedules;
    const unassignedPreferences: PreferenceModel [] = BuildResult.unassignedPreferences;
    const assignedPreferences: PreferenceModel [] = BuildResult.assignedPreferences;


    const baseSketch: SketchModel = {
        id: '2',
        name: 'first sketch',
        vehicleSchedules: initialVehicles,
        Comments: '',
        unassignedPreferences: unassignedPreferences,
        assignedPreferences: assignedPreferences
    };

    const newId = Utils.getNextId(ShmiraList.sketches.map(v => v.id));
    baseSketch.id = newId;
    baseSketch.name = ShmiraListBuilderTools.createSketchName(baseSketch.id);


    return baseSketch
}
const mockShmiraList = {
    'id': '5',
    'Name': 'רשימת שמירה לסקיצה',
    'preferences': [
        {
            'id': '99',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '08:00',
            'Comments': 'פלג לרקפת  עד 10',
            'guardName': 'חן פלג',
            'finishHour': '09:00'
        },
        {
            'id': '100',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '1',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '07:20',
            'Comments': 'רייצ\'ל לוקחת את ילדי גן דרור לכרמיאל, רוצה להמשיך לתור לרופאה עד 10. ',
            'guardName': 'רייצ\'ל',
            'finishHour': '10:10'
        },
        {
            'id': '101',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '12:50',
            'Comments': 'רייצ\'ל למרפאה במשגב עד 13:00',
            'guardName': 'רייצ\'ל',
            'finishHour': '13:00'
        },
        {
            'id': '102',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '19:00',
            'Comments': '',
            'guardName': 'רייצ\'ל',
            'finishHour': ''
        },
        {
            'id': '103',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '3',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '08:30',
            'Comments': 'סתו מבקשת צמוד עד 16:00. לדבר איתי  אם בעיה',
            'guardName': 'סתו',
            'finishHour': '14:00'
        },
        {
            'id': '104',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '09:45',
            'Comments': 'ורד תשמח לשעה במשגב, גמישה עד 1320. לא דחוף, רק אם מסתדר.',
            'guardName': 'ורד',
            'finishHour': '10:00'
        },
        {
            'id': '105',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '13:30',
            'Comments': 'אלון לאיסוף שיבולי השמש עד 14:30',
            'guardName': 'אלון דרור',
            'finishHour': '14:30'
        },
        {
            'id': '106',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '2',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '15:50',
            'Comments': 'אלון לרקפת - יעזור מאוד צמוד עד 17:20',
            'guardName': 'אלון דרור',
            'finishHour': '17:20'
        },
        {
            'id': '107',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '16:00',
            'Comments': 'אלון ושקד מקופח כללית משגב אם אין צמוד',
            'guardName': 'אלון דרור',
            'finishHour': '17:00'
        },
        {
            'id': '108',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '1',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '13:30',
            'Comments': 'ענבר לכרמיאל צמוד עד 15 וחצי ',
            'guardName': 'ענבר',
            'finishHour': '15:30'
        },
        {
            'id': '109',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '2',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '16:00',
            'Comments': 'רז מרקפת ',
            'guardName': 'ענבר',
            'finishHour': '16:30'
        },
        {
            'id': '110',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '08:40',
            'Comments': 'ענבר למשגב צמוד עד 10:10 (לא להצמיד בבקשה נסיעות כי יש סיכוי שמתבטל מחר בבוקר ',
            'guardName': 'ענבר',
            'finishHour': '10:30'
        },
        {
            'id': '111',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '1',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '08:15',
            'Comments': 'זהר לכרמיאל',
            'guardName': 'זהר',
            'finishHour': ''
        },
        {
            'id': '112',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '3',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '14:00',
            'Comments': 'זהר בחיפה ורוצה להישאר עד מאוחר  ולחזור ברכב. אם יש נסיעה לעשות איתה חילוף מה טוב. אם לא ואפשר לשריין רכב ואנסה למצוא נהג/ת, גם טוב. ',
            'guardName': 'זהר',
            'finishHour': '20:00'
        },
        {
            'id': '113',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '14:00',
            'Comments': 'אורי כהן וטל לכנרת עד 19',
            'guardName': 'טל',
            'finishHour': '19:00'
        },
        {
            'id': '115',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '16:00',
            'Comments': 'עדי יונתן ועמרי לחיסון שפעת במשגב, צמוד עד 17:30 אם אפשר עד אחרי, עדיף עד 19 ואז נעשה עוד משהו',
            'guardName': 'עדי',
            'finishHour': '17:30'
        },
        {
            'id': '116',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '13',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '08:30',
            'Comments': 'רינת שרון לרכבת כרמיאל / לחיפה (להיות ב-10 בבת גלים) ',
            'guardName': 'רינת שרון',
            'finishHour': '10:10'
        },
        {
            'id': '117',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '9',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '09:15',
            'Comments': 'אוריאל מאשבל למרכז השיח בחיפה ',
            'guardName': 'אוריאל',
            'finishHour': '12:00'
        },
        {
            'id': '118',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '9',
            'TypeOfInfoPreference': '4',
            'optionalGuardDaysByDates': '14:15',
            'Comments': 'אוריאל ברכב דבר ממרכז השיח בחיפה לאשבל. אם עדיף שאני אסע ברכב אחר וישאיר את רכב דבר בחיפה אז אין בעיה. הוא יכול לשמש את הסידור אחהצ וצריך להגיע ברביעי בבוקר לטבריה או רביד ',
            'guardName': 'אוריאל',
            'finishHour': ''
        },
        {
            'id': '119',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '3',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '07:20',
            'Comments': 'יהל לרקפת, מורן לצומת או אם יש נסיעה לחיפה.',
            'guardName': 'מורן',
            'finishHour': ''
        },
        {
            'id': '120',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '3',
            'TypeOfInfoPreference': '4',
            'optionalGuardDaysByDates': '14:00',
            'Comments': 'מורן מהצומת, או אם יש סביב 13:00 נסיעה מחיפה',
            'guardName': 'מורן',
            'finishHour': '13:00'
        },
        {
            'id': '122',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '1',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '18:30',
            'Comments': 'תמה ואמיר שוורץ לכרמיאל עד 22:00. יש סיכוי שיהיה רכב מסידור החלוץ',
            'guardName': 'תמה',
            'finishHour': '22:00'
        },
        {
            'id': '123',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '6',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '06:15',
            'Comments': 'ב615  ליאור למשגב עד 815',
            'guardName': 'ליאור דינרמן',
            'finishHour': '08:30'
        },
        {
            'id': '124',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '19:15',
            'Comments': 'ב1915  ליאור לרביד , סביב 2130 ליאור מרביד ',
            'guardName': 'ליאור דינרמן',
            'finishHour': '22:30'
        },
        {
            'id': '125',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '4',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '14:00',
            'Comments': 'אורי עם  אחד הברלינגו להביא כלב. חוזר עד 17:00 לדבר איתי על בעיות',
            'guardName': 'אורי',
            'finishHour': '17:00'
        },
        {
            'id': '126',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '4',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '08:45',
            'Comments': 'שירי צמוד לעכו ועפולה עד 15:15. אם בעייתי דברו איתי',
            'guardName': 'שירי אליאס',
            'finishHour': '15:15'
        },
        {
            'id': '127',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '5',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '07:30',
            'Comments': 'עומר לתיכון ',
            'guardName': 'עומר כהן',
            'finishHour': ''
        },
        {
            'id': '128',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '5',
            'TypeOfInfoPreference': '4',
            'optionalGuardDaysByDates': '17:30',
            'Comments': 'עומר רכב מהתיכון לאסוף את נועם וארי מקורות יש גם אופציות נוספות להיות איתי בקשר',
            'guardName': 'עומר כהן',
            'finishHour': ''
        },
        {
            'id': '129',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '2',
            'TypeOfInfoPreference': '2',
            'optionalGuardDaysByDates': '09:00',
            'Comments': 'עמיר צמוד עד 15 לאזור טבריה',
            'guardName': 'עמיר',
            'finishHour': '15:00'
        },
        {
            'id': '130',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '10',
            'TypeOfInfoPreference': '3',
            'optionalGuardDaysByDates': '14:00',
            'Comments': '14:00 אייל מאשבל ליובלים ',
            'guardName': 'אייל יסוד',
            'finishHour': '14:00'
        },
        {
            'id': '131',
            'flexibilityByDays': [
                '-30',
                '10'
            ],
            'halfOrFull': '1',
            'location': '10',
            'TypeOfInfoPreference': '4',
            'optionalGuardDaysByDates': '16:30',
            'Comments': '16:30 אייל מיובלים וממשיך עם הרכב ליובלים ועצמון, עד הלילה גמיש בשעת איסוף, צריך לצאת מיובלים ב20:00 לעצמון. יכול להקפיץ חזרה לאשבל וכו\'',
            'guardName': 'אייל יסוד',
            'finishHour': '20:00,20:00'
        }
    ],
    'deletedPreferences': [],
    'vehicles': [
        {
            'id': '1',
            'vehicleName': 'שלגיה',
            'optionalGuardDaysByDates': '08:00',
            'endHour': '09:00',
            'kmLimit': '',
            'seats': '7',
            'Comments': ''
        },
        {
            'id': '3',
            'vehicleName': 'סנואו',
            'optionalGuardDaysByDates': '08:00',
            'endHour': '09:00',
            'kmLimit': '',
            'seats': '7',
            'Comments': ''
        },
        {
            'id': '4',
            'vehicleName': 'שכור',
            'optionalGuardDaysByDates': '08:00',
            'endHour': '09:00',
            'kmLimit': '',
            'seats': '5',
            'Comments': ''
        },
        {
            'id': '5',
            'vehicleName': 'ברלינגו',
            'optionalGuardDaysByDates': '08:00',
            'endHour': '09:00',
            'kmLimit': '',
            'seats': '5',
            'Comments': ''
        }
    ],
    'sketches': []
}
