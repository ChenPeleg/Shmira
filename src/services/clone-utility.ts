import {DriveModel, SketchModel, VehicleScheduleModel} from '../models/Sketch.model';
import {PreferenceModel} from '../models/Preference.model';
import {ShmiraListRecord} from '../store/store.types';


export class CloneUtil {
    constructor() {
    }

    static deepClonePreference(obj: PreferenceModel): PreferenceModel {
        const cloned: PreferenceModel = {...obj}
        cloned.flexibilityByDays = [...cloned.flexibilityByDays]
        return cloned
    }

    static deepCloneDrive(obj: DriveModel): DriveModel {
        const cloned: DriveModel = {...obj}
        cloned.flexibilityByDays = [...cloned.flexibilityByDays]
        return cloned
    }

    static deepCloneVehicleSchedules(obj: VehicleScheduleModel): VehicleScheduleModel {
        const cloned: VehicleScheduleModel = {...obj}
        cloned.drives = cloned.drives.map(d => CloneUtil.deepCloneDrive(d))
        return cloned
    }

    static deepCloneShmiraList(shmiraList: ShmiraListRecord): ShmiraListRecord {
        const clonedShmiraList = {...shmiraList}
        clonedShmiraList.preferences = clonedShmiraList.preferences.map(o => (CloneUtil.deepClonePreference(o)));
        clonedShmiraList.deletedPreferences = clonedShmiraList.deletedPreferences.map(o => (CloneUtil.deepClonePreference(o)));
        clonedShmiraList.sketches = clonedShmiraList.sketches.map(o => (CloneUtil.deepCloneSketch(o)));
        clonedShmiraList.defaultPreferenceValues = clonedShmiraList.defaultPreferenceValues ? {...clonedShmiraList.defaultPreferenceValues} : undefined
        return clonedShmiraList
    }

    static deepCloneSketch(obj: SketchModel): SketchModel {
        obj.vehicleSchedules = obj.vehicleSchedules.map(vs => CloneUtil.deepCloneVehicleSchedules(vs))
        return {...obj}
    }

    public static deep(obj: ShmiraListRecord, name: 'ShmiraListRecord'): PreferenceModel ;
    public static deep(obj: PreferenceModel, name: 'PreferenceModel'): PreferenceModel ;
    public static deep(obj: SketchModel, name: 'SketchModel'): SketchModel ;
    public static deep(obj: any, name: string,): any {
        const newObj = {...obj}
        switch (name) {
            case 'SketchModel':
                return CloneUtil.deepCloneSketch(obj)
            case 'ShmiraListRecord':
                return CloneUtil.deepCloneShmiraList(obj)
            case 'PreferenceModel':
                newObj.flexibilityByDays = [(newObj).flexibilityByDays[0], (newObj).flexibilityByDays[1]];
        }
        return newObj;
    }
}

