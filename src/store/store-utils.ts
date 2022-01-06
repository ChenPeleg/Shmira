import {
    AppConstants,
    defaultDaysBetweenGuardDuty,
    defaultPreferenceValues,
    SaveDataModel,
    SessionModel,
    ShmiraListRecord,
    ShmiraListStore
} from './store.types';
import {SaveLoadService} from '../services/save-load.service';
import {hashFunction} from '../services/hash-function';
import {CloneUtil} from '../services/clone-utility';
import {Utils} from '../services/utils';
import {defaultShmiraListEshbal} from './store-inital-state';
import {PreferenceModel} from '../models/Preference.model';


export const StoreUtils = {
    removeIdPrefix: (id: string): string => {
        const replaceIdsNames: RegExp = new RegExp(AppConstants.ArchiveIdPrefix + '|' + AppConstants.deleteIdPrefix, 'g');
        return id.replace(replaceIdsNames, '')
    },
    HandleReducerSaveToLocalStorage: (state: ShmiraListStore): void => {
        const saveObj: SaveDataModel = StoreUtils.buildSaveDataModel(state, 'chen', 'chen')
        if (state.currentSessionState?.userName?.length > 0) {

            SaveLoadService.saveToLocalStorage(saveObj);
        }
    },

    UpdateShmiraListCollectionWithCurrenShmiraList: (state: ShmiraListStore): ShmiraListRecord[] => {
        const newState = {...state}
        const shmiraListId = newState.shmiraListId;
        const updatedPreferences = newState.preferences.map(o => ({...o}));
        const updatedVehicles = newState.daysBetweenGuardDuty
        const updatedDeletedPreferences = newState.deletedPreferences.map(o => ({...o}));
        const updatedSketches = newState.sketches.map(o => ({...o}))
        newState.shmiraListCollection = newState.shmiraListCollection.map((shmiraList: ShmiraListRecord) => {
            if (shmiraList.id === shmiraListId) {
                const updatedShmiraList = {...shmiraList};
                updatedShmiraList.preferences = updatedPreferences;
                updatedShmiraList.daysBetweenGuardDuty = updatedVehicles;
                updatedShmiraList.sketches = updatedSketches;
                updatedShmiraList.deletedPreferences = updatedDeletedPreferences;
                return updatedShmiraList
            } else {
                return shmiraList
            }
        });
        return newState.shmiraListCollection
    },
    buildSaveDataModel: (state: ShmiraListStore, userName: string = 'chen', userId: string = 'chen'): SaveDataModel => {
        const hash = hashFunction(JSON.stringify(state))
        return {
            userName: 'chen',
            userId: 'chen',
            savedStore: state,
            timeStamp: SaveLoadService.getTimeStampFromDate(),
            hash: hash.toString()
        }

    },
    updateShmiraListRecordWithSketchChanges(state: ShmiraListStore): ShmiraListStore {
        const newState = {...state};
        const thisShmiraListInCollection: ShmiraListRecord | undefined = newState.shmiraListCollection.find((shmiraList: ShmiraListRecord) => shmiraList.id === newState.shmiraListId);


        if (thisShmiraListInCollection) {
            thisShmiraListInCollection.sketches = newState.sketches.map(s => CloneUtil.deepCloneSketch(s))
        }

        return newState

    },
    defaultInitialState(): ShmiraListStore {
        const startPreferences: PreferenceModel[] = ['חן', 'אבי', 'רוני'].map((name: string, index: number): PreferenceModel => ({
            ...defaultPreferenceValues,
            id: (index + 1).toString(),
            guardName: name
        }));
        const sessionState: SessionModel = {
            userName: '',
            LocationGroupTabOpen: null,
            SketchIdInEdit: null,
            locationGroupInEdit: null,
            preferenceIdInEdit: null,
            pendingPreferenceIdInEdit: null,
            dataHolderForCurrentPreferenceInEdit: null

        }
        try {
            const parsedJson = JSON.parse(this.defaultJsonSavedData());
            if (parsedJson) {
                return parsedJson.savedStore
            }
        } catch (e) {

        }

        return {
            shmiraListArchive: [],
            locationGroupInEdit: null,
            shmiraListCollection: [{
                id: '1',
                Name: 'רשימת שמירה 2021',
                preferences: [],
                deletedPreferences: [],
                daysBetweenGuardDuty: [defaultDaysBetweenGuardDuty],
                sketches: [],
                chosenSketch: '',
                locationGroup: null,
                DateTo: Utils.Date.dateToDateStamp(new Date()),
                DateFrom: Number((Utils.Date.dateToDateStamp(new Date())) + 60).toString(),
            }, {...defaultShmiraListEshbal}

            ],
            shmiraListId: '1',
            preferences: startPreferences,
            daysBetweenGuardDuty: defaultDaysBetweenGuardDuty,
            preferenceIdInEdit: '1',
            dataHolderForCurrentPreferenceInEdit: startPreferences[0] || null,
            deletedPreferences: [],
            defaultPreferenceValues: {...defaultPreferenceValues},
            sketches: [],
            displaySetting: {view: 'locationsView'},
            SketchIdInEdit: null,
            pendingPreferenceIdInEdit: null,
            currentSessionState: sessionState,
            LocationGroups: [],


        }
    },
    defaultJsonSavedData(): string {
        const jsonString = `{"userName":"chen","userId":"chen","savedStore":{"shmiraListArchive":[],"locationGroupInEdit":null,"shmiraListCollection":[{"id":"1","Name":"רשימת שמירה 2021","preferences":[{"id":"34","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["2","4","3","1"],"flexibilityByDates":["44566","44569","44567","44563"],"location":"","weekDaysOrDates":"1","guardName":"יוספה"},{"id":"4","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","1","2"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"דוד"},{"id":"32","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","2"],"flexibilityByDates":["44570","44565","44568","44567","44566"],"location":"","weekDaysOrDates":"1","guardName":"גלעד"},{"id":"9","guardName":"ראובן","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","5"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"8","guardName":"אברהם","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"5","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"יעקוב"},{"id":"31","guardName":"שרה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"30","guardName":"לאה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"29","guardName":"רחל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"28","guardName":"סמי","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","2","1","5","6"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"27","guardName":"אבי","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"26","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","1","2"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"יואל"},{"id":"25","guardName":"מיכל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"3","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"24","guardName":"ברוריה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"3","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"23","guardName":"לאקי","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"3","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"22","guardName":"יורם","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565","44567","44568","44566","44563","44564","44562","44561","44560","44569","44571","44572"],"location":"","weekDaysOrDates":"2"},{"id":"21","guardName":"דניאלה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","5"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"20","guardName":"רומן","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"19","guardName":"יבגני","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"18","guardName":"אליהו","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","1","2"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"17","guardName":"סיגלית","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"16","guardName":"תמרה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["1","2","5","6"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"15","guardName":"יעל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"14","guardName":"אורן","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"13","guardName":"עוזה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"12","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"רוחמה"},{"id":"11","guardName":"אביבה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"10","guardName":"שמואל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"}],"deletedPreferences":[],"sketches":[],"chosenSketch":"","locationGroup":null,"DateTo":"44587","DateFrom":"44560","defaultPreferenceValues":{}}],"shmiraListId":"1","preferences":[{"id":"34","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["2","4","3","1"],"flexibilityByDates":["44566","44569","44567","44563"],"location":"","weekDaysOrDates":"1","guardName":"יוספה"},{"id":"4","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","1","2"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"דוד"},{"id":"32","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","2"],"flexibilityByDates":["44570","44565","44568","44567","44566"],"location":"","weekDaysOrDates":"1","guardName":"גלעד"},{"id":"9","guardName":"ראובן","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","5"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"8","guardName":"אברהם","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"5","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"יעקוב"},{"id":"31","guardName":"שרה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"30","guardName":"לאה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"29","guardName":"רחל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"28","guardName":"סמי","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","2","1","5","6"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"27","guardName":"אבי","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"26","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","1","2"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"יואל"},{"id":"25","guardName":"מיכל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"3","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"24","guardName":"ברוריה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"3","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"23","guardName":"לאקי","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"3","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"22","guardName":"יורם","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565","44567","44568","44566","44563","44564","44562","44561","44560","44569","44571","44572"],"location":"","weekDaysOrDates":"2"},{"id":"21","guardName":"דניאלה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","5"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"20","guardName":"רומן","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"19","guardName":"יבגני","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"18","guardName":"אליהו","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3","1","2"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"17","guardName":"סיגלית","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"16","guardName":"תמרה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["1","2","5","6"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"15","guardName":"יעל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"14","guardName":"אורן","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"13","guardName":"עוזה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"12","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1","guardName":"רוחמה"},{"id":"11","guardName":"אביבה","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"},{"id":"10","guardName":"שמואל","optionalGuardDaysByDates":"","finishHour":"","TypeOfInfoPreference":"2","Comments":"","halfOrFull":"1","flexibilityByDays":["4","3"],"flexibilityByDates":["44570","44565"],"location":"","weekDaysOrDates":"1"}],"preferenceIdInEdit":null,"dataHolderForCurrentPreferenceInEdit":null,"deletedPreferences":[],"defaultPreferenceValues":{"id":"1","guardName":"","optionalGuardDaysByDates":"08:00","finishHour":"09:00","TypeOfInfoPreference":"1","Comments":"","halfOrFull":"1","flexibilityByDays":[],"flexibilityByDates":[],"location":"","weekDaysOrDates":null},"sketches":[],"displaySetting":{"view":"preferences"},"SketchIdInEdit":"","pendingPreferenceIdInEdit":null,"currentSessionState":{"LocationGroupTabOpen":null,"SketchIdInEdit":null,"locationGroupInEdit":null,"preferenceIdInEdit":null,"pendingPreferenceIdInEdit":null,"dataHolderForCurrentPreferenceInEdit":null,"userName":""},"LocationGroups":[]},"timeStamp":"1641478951026","hash":"1443449079"}`
        return jsonString
    }

}
