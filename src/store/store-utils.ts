import {AppConstants, SaveDataModel, ShmiraListRecord, ShmiraListStore} from './store.types';
import {SaveLoadService} from '../services/save-load.service';
import {hashFunction} from '../services/hash-function';
import {CloneUtil} from '../services/clone-utility';


export const StoreUtils = {
    removeIdPrefix: (id: string): string => {
        const replaceIdsNames: RegExp = new RegExp(AppConstants.ArchiveIdPrefix + '|' + AppConstants.deleteIdPrefix, 'g');
        return id.replace(replaceIdsNames, '')
    },
    HandleReducerSaveToLocalStorage: (state: ShmiraListStore): void => {
        const saveObj: SaveDataModel = StoreUtils.buildSaveDataModel(state, 'chen', 'chen')
        SaveLoadService.saveToLocalStorage(saveObj);
    },

    UpdateShmiraListCollectionWithCurrenShmiraList: (state: ShmiraListStore): ShmiraListRecord[] => {
        const newState = {...state}
        const shmiraListId = newState.shmiraListId;
        const updatedOrders = newState.orders.map(o => ({...o}));
        const updatedVehicles = newState.vehicles.map(o => ({...o}));
        const updatedDeletedOrders = newState.deletedOrders.map(o => ({...o}));
        const updatedSketches = newState.sketches.map(o => ({...o}))
        newState.shmiraListCollection = newState.shmiraListCollection.map((shmiraList: ShmiraListRecord) => {
            if (shmiraList.id === shmiraListId) {
                const updatedShmiraList = {...shmiraList};
                updatedShmiraList.orders = updatedOrders;
                updatedShmiraList.vehicles = updatedVehicles;
                updatedShmiraList.sketches = updatedSketches;
                updatedShmiraList.deletedOrders = updatedDeletedOrders;
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

    }
}
