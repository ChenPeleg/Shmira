import {hashFunction} from './hash-function';
import {DriveModel, SketchModel, VehicleScheduleModel} from '../models/Sketch.model';
import {PreferenceType} from '../models/PreferenceType.enum';


export const Utils = {
    getNextId: (currentIds: string[]): string => {
        const allIds: number [] = currentIds.map(id => Number(id));
        allIds.push(0)
        const newId = Math.max(...allIds) + 1;
        return newId.toString()
    },
    validateHash: (data: string, hash: string): boolean => {
        return (data && hash) ? hashFunction(data).toString() === hash : false
    },
    convertStrToNum: (str: string): number => {
        let numberToReturn = 0
        try {
            const parsed = parseInt(str, 10)
            if (!isNaN(parsed)) {
                numberToReturn = parsed;
            }
        } catch (e) {

        } finally {

        }
        return numberToReturn

    },
    defaultSketchMMock(): SketchModel {
        let ids: number = 1
        const mkDrv = (driver: string, start: string, finish: string, location: string, TypeOfDrivePreference: PreferenceType = PreferenceType.CanGuardIn): DriveModel => {
            ids++
            return {
                id: ids.toString(),
                guardName: driver,
                optionalGuardDaysByDates: start,
                finishHour: finish,
                TypeOfDrivePreference: TypeOfDrivePreference,
                location: '1',
                Comments: '',
                halfOrFull: '1',
                flexibilityByDays: [],
                flexibilityByDates: [],
                implementsPreferences: [],
                description: '',
            }

        }
        const vehicle1: VehicleScheduleModel = {
            id: '1',
            VehicleId: '1',
            drives: [
                mkDrv('יוסי', '08:00', '10:00', '1'),
                mkDrv('חן', '11:00', '14:00', '1'),
                mkDrv('אברהם', '16:00', '20:00', '1'),
                mkDrv('רונה', '20:30', '20:00', '1'),
            ],
            Comments: 'רכב ראשון'
        }
        const vehicle2: VehicleScheduleModel = {
            id: '2',
            VehicleId: '1',
            drives: [
                mkDrv('יוליה', '06:00', '12:00', '1'),
                mkDrv('רונן', '12:30', '14:00', '1'),
                mkDrv('שמואל', '15:00', '19:00', '1'),
                mkDrv('מיכל', '20:00', '23:00', '1'),
            ],
            Comments: 'רכב ראשון'
        }
        return {
            vehicleSchedules: [vehicle1, vehicle2],
            id: '1',
            Comments: '',
            name: 'סידור בשני רכבים',
            unassignedPreferences: [],
            assignedPreferences: [],
        }
    },
    hourTextToDecimal(hourText: string): number {
        if (!hourText.includes(':')) {

        }
        const splitHour = hourText.split(':');
        const hour = Number(splitHour[0]) || 0;
        const minutes = Number(splitHour[1]) || 0;
        const minutesAsFraction = this.minutesToFraction(minutes);
        return hour + minutesAsFraction;


    },
    DecimalTimeToHourText(time: number): string {
        if (time !== 0 && !time) {
            return ''
        }
        const numberToTwoDigit = (num: number): string => {
            if (!num) {
                num = 0;
            }
            let addZero = ''
            if (num < 10) {
                addZero = '0'
            }
            return addZero + num.toString()
        }
        const correctSmallDiversions = (num: number): number => {
            if (!num) {
                return num
            }
            const remainder = num % 5
            if (remainder === 0) {
                return num
            }
            if (remainder && remainder > 2.5) {
                return num + (5 - remainder);
            } else {
                return num - remainder;
            }

        }
        time += 0.02;
        const hour = Math.floor(time);
        const minutesAsFraction = Math.floor(100 * (time - Math.floor(time)));
        const minutes = this.FractionToMinutes(minutesAsFraction);
        const minutesCorrected = correctSmallDiversions(minutes);
        const hourText = numberToTwoDigit(hour)
        const minuteText = numberToTwoDigit(minutesCorrected)
        return hourText + ':' + minuteText;


    },
    minutesToFraction(minute: string | number): number {
        const minAsNumber = Number(minute) || 0;
        if (minAsNumber == 0) {
            return 0
        }
        return Math.floor((minAsNumber / 60) * 100) / 100
    },
    FractionToMinutes(minute: number): number {
        const minAsNumber = Number(minute) || 0;
        if (minAsNumber == 0) {
            return 0
        }
        return Math.floor((minAsNumber / 100) * 60)
    },
    Date : {
        dateToTimeStamp (inDate : Date) : string{
            const returnDateTime = 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
            return returnDateTime.toString().substr(0,20);
        },

        excelDateToJSDate(orgExcelDate : string | number) {
           const excelDate = Number (orgExcelDate) | 44000
            const date = new Date(Math.round((excelDate - (25567 + 1)) * 86400 * 1000));
            const converted_date = date.toISOString().split('T')[0];
            return converted_date;
        }





    }

}
