import {DriveModel, SketchModel, VehicleScheduleModel} from '../models/Sketch.model';
import {OrderModel} from '../models/Order.model';
import {ShmiraListRecord} from '../store/store.types';


export class CloneUtil {
    constructor() {
    }

    static deepCloneOrder(obj: OrderModel): OrderModel {
        const cloned: OrderModel = {...obj}
        cloned.flexibility = [...cloned.flexibility]
        return cloned
    }

    static deepCloneDrive(obj: DriveModel): DriveModel {
        const cloned: DriveModel = {...obj}
        cloned.flexibility = [...cloned.flexibility]
        return cloned
    }

    static deepCloneVehicleSchedules(obj: VehicleScheduleModel): VehicleScheduleModel {
        const cloned: VehicleScheduleModel = {...obj}
        cloned.drives = cloned.drives.map(d => CloneUtil.deepCloneDrive(d))
        return cloned
    }

    static deepCloneShmiraList(shmiraList: ShmiraListRecord): ShmiraListRecord {
        const clonedShmiraList = {...shmiraList}
        clonedShmiraList.orders = clonedShmiraList.orders.map(o => (CloneUtil.deepCloneOrder(o)));
        clonedShmiraList.deletedOrders = clonedShmiraList.deletedOrders.map(o => (CloneUtil.deepCloneOrder(o)));
        clonedShmiraList.sketches = clonedShmiraList.sketches.map(o => (CloneUtil.deepCloneSketch(o)));
        clonedShmiraList.defaultOrderValues = clonedShmiraList.defaultOrderValues ? {...clonedShmiraList.defaultOrderValues} : undefined
        return clonedShmiraList
    }

    static deepCloneSketch(obj: SketchModel): SketchModel {
        obj.vehicleSchedules = obj.vehicleSchedules.map(vs => CloneUtil.deepCloneVehicleSchedules(vs))
        return {...obj}
    }

    public static deep(obj: ShmiraListRecord, name: 'ShmiraListRecord'): OrderModel ;
    public static deep(obj: OrderModel, name: 'OrderModel'): OrderModel ;
    public static deep(obj: SketchModel, name: 'SketchModel'): SketchModel ;
    public static deep(obj: any, name: string,): any {
        const newObj = {...obj}
        switch (name) {
            case 'SketchModel':
                return CloneUtil.deepCloneSketch(obj)
            case 'ShmiraListRecord':
                return CloneUtil.deepCloneShmiraList(obj)
            case 'OrderModel':
                newObj.flexibility = [(newObj).flexibility[0], (newObj).flexibility[1]];
        }
        return newObj;
    }
}

