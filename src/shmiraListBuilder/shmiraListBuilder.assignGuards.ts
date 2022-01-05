import {NightScheduleModel} from '../models/Sketch.model';
import {VehicleModel} from '../models/Vehicle.model';

import {PreferenceModel} from '../models/Preference.model';
import {PreferenceMetaDataModel} from './models/shmiraList.models';

interface OrdMetaScheduleData {
    start: number,
    finish: number,
    id: string,
    halfOrFull: string

}

export const ShmiraListBuilderBuildVehiclesAndUnAssigned = (preferences: PreferenceMetaDataModel[], vehicles: VehicleModel[], buildSettings: any = null): { nightSchedules: NightScheduleModel[], unassignedPreferences: PreferenceModel[], assignedPreferences: PreferenceModel[] } | null => {
    return null;
    
}

