import {ActionsTypes} from './types.actions';


import {IAction, ShmiraListRecord, ShmiraListStore} from './store.types';
import {StoreUtils} from './store-utils';
import {Utils} from '../services/utils';
import {SketchModel} from '../models/Sketch.model';
import {CloneUtil} from '../services/clone-utility';
import {translations} from '../services/translations';
import {ShmiraListBuilder} from '../shmiraListBuilder/shmiraListBuilder.main';
import {DownloadCSVFile} from '../services/download-file';

export type SketchReducerFunctions =
    | ActionsTypes.NEW_SKETCH
    | ActionsTypes.CHOOSE_SKETCH
    | ActionsTypes.RENAME_SKETCH
    | ActionsTypes.DELETE_SKETCH
    | ActionsTypes.CLONE_SKETCH
    | ActionsTypes.DOWNLOAD_SKETCH;


export const ListSketchReducer: Record<SketchReducerFunctions, (state: ShmiraListStore, action: IAction) => ShmiraListStore> = {
    [ActionsTypes.NEW_SKETCH]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        if (!newState.sketches) {
            newState.sketches = [];
        }
        const newId = Utils.getNextId(newState.sketches.map(v => v.id));
        const chosenShmiraListObj: ShmiraListRecord | undefined = newState.shmiraListCollection.find((record: ShmiraListRecord) => record.id === newState.shmiraListId);
        if (chosenShmiraListObj !== undefined) {
            const deconstructedShmiraList = {...chosenShmiraListObj};
            deconstructedShmiraList.preferences = newState.preferences;
            deconstructedShmiraList.sketches = newState.sketches;
            deconstructedShmiraList.daysBetweenGuardDuty = '6';
            const newSketch = ShmiraListBuilder(deconstructedShmiraList);
            newSketch.id = newId;
            if (!newState.sketches) {
                newState.sketches = [];
            }
            newState.sketches.push(newSketch);
            newState.nights = newSketch.NightSchedule;
            newState.SketchIdInEdit = newId;
        }


        newState = StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        StoreUtils.HandleReducerSaveToLocalStorage(newState);
        return newState
    },
    [ActionsTypes.CHOOSE_SKETCH]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        const chosenSketchId = action.payload.id;
        const previousSketchId = newState.SketchIdInEdit;
        if (chosenSketchId === previousSketchId) {
            return newState
        }
        newState.SketchIdInEdit = chosenSketchId;
        const chosenSketchObj: SketchModel | undefined = newState.sketches.find((record: SketchModel) => record.id === chosenSketchId);
        if (chosenSketchObj !== undefined) {
            const previousSketchObj: SketchModel | undefined = newState.sketches.find((record: SketchModel) => record.id === previousSketchId);
            if (previousSketchObj !== undefined) {
                const NewPreviousSketchObj = {...previousSketchObj};
            }
            const thisShmiraListInCollection: ShmiraListRecord | undefined = newState.shmiraListCollection.find((shmiraList: ShmiraListRecord) => shmiraList.id === newState.shmiraListId);

            if (thisShmiraListInCollection) {
                thisShmiraListInCollection.chosenSketch = chosenSketchId;
            }
            newState.nights = chosenSketchObj.NightSchedule;

        }
        return newState

    },
    [ActionsTypes.RENAME_SKETCH]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        const sketchId = action.payload.id// newState.shmiraListId;
        const newName = action.payload.value;
        if (!newName) {
            return newState
        }
        newState.sketches = newState.sketches.map((sketch: SketchModel) => {
            if (sketch.id === sketchId) {
                const updatedSketch = {...sketch};
                updatedSketch.name = newName;
                return updatedSketch
            } else {
                return sketch
            }
        });
        newState = StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        return newState
    },
    [ActionsTypes.DOWNLOAD_SKETCH]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state};
        newState.shmiraListCollection = StoreUtils.UpdateShmiraListCollectionWithCurrenShmiraList(newState);
        const SketchIdInEdit = newState.SketchIdInEdit;
        const sketchObj: SketchModel | undefined = newState.sketches.find((record: SketchModel) => record.id === SketchIdInEdit);

        if (sketchObj !== undefined) {
            const saveObj: string = StoreUtils.buildCSVFileFromSketch(sketchObj, newState.preferences)
            const name = sketchObj.name + '.csv'
            DownloadCSVFile(name, saveObj)
        }
        return newState

    },
    [ActionsTypes.DELETE_SKETCH]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        const sketchToDelete = action.payload.id// newState.shmiraListId;
        let posOfDeletedSketch = -1;
        let deletedSketch: SketchModel | undefined = newState.sketches.find(s => s.id === sketchToDelete);
        if (deletedSketch) {
            posOfDeletedSketch = newState.sketches.indexOf(deletedSketch);
            deletedSketch = {...deletedSketch};
            deletedSketch.id = 'Del' + deletedSketch.id;
            // newState.shmiraListArchive.push(deletedSketch);
        }

        newState.sketches = newState.sketches.filter(s => s.id !== sketchToDelete);
        if (newState.sketches.length) {
            const sketchesIds = newState.sketches.map(s => s.id);
            if (posOfDeletedSketch > 1) {
                newState.SketchIdInEdit = sketchesIds [posOfDeletedSketch - 1]
            } else {
                newState.SketchIdInEdit = sketchesIds [0];

            }

            const editedSketch = newState.sketches.find(s => s.id === newState.SketchIdInEdit) as SketchModel;
            newState.nights = editedSketch.NightSchedule;
        } else {
            newState.nights = [];
            newState.SketchIdInEdit = ''
        }

        newState = StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        return newState

    },
    [ActionsTypes.CLONE_SKETCH]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        const sketchIdToClone = action.payload.id;// newState.shmiraListId;
        let sketchForCloning: SketchModel | undefined = newState.sketches.find(s => s.id === sketchIdToClone);

        if (sketchForCloning) {
            const newSketch: SketchModel = CloneUtil.deepCloneSketch(sketchForCloning);
            newSketch.name = translations.CopyOf + ' ' + newSketch.name;
            const newSketchId = Utils.getNextId(getAllSketchesIDs(state));
            newSketch.id = newSketchId
            newState.sketches = newState.sketches.map(c => c);
            newState.sketches.push(newSketch);
            newState.SketchIdInEdit = newSketchId;
            newState.nights = newSketch.NightSchedule;
        }
        newState = StoreUtils.updateShmiraListRecordWithSketchChanges(newState)
        return newState

    },


}

const getAllSketchesIDs = (state: ShmiraListStore): string[] => {
    const sketchesIds = state.sketches.map(o => o.id);

    return [...sketchesIds]
}
