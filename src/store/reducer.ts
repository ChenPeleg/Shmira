import {IAction, ShmiraListStore} from './store.types';
import {SaveLoadService} from '../services/save-load.service';
import {ShmiraListReducer} from './shmiraList.reducer';
import {PreferenceReducer} from './preferenceReducer';
import {ImportExportReducer} from './import-export.reducer';
import {VehicleReducer} from './vehicle.reducer';
import {ActionsTypes} from './types.actions';
import {DisplayReducer} from './display.reducer';
import {ListSketchReducer} from './list-sketch.reducer';
import {PendingPreferencesReducer} from './pendingPreferencesReducer';
import {ListSketchNightReducer} from './list-sketch-night.reducer';
import {LocationGroupReducer} from './locationGroup.reducer';
import {DateRangesReducer} from './date-ranges.reducer';
import {StoreUtils} from './store-utils';


// @ts-ignore

const stateFromLocalStorage: ShmiraListStore | undefined = SaveLoadService.loadFromLocalStorage('chen').data?.savedStore
const initialState = stateFromLocalStorage || StoreUtils.defaultInitialState();

const reducer = (state: ShmiraListStore = initialState, action: IAction) => {
    let newState = {
        ...state
    }

    switch (action.type) {
        case ActionsTypes.CHOOSE_SIDUR:
        case ActionsTypes.RENAME_SIDUR:
        case ActionsTypes.ADD_NEW_SHMIRA:
        case ActionsTypes.DELETE_SHMIRA:
        case ActionsTypes.CLONE_SIDUR:
        case ActionsTypes.ARCHIVE_SIDUR:
        case ActionsTypes.MOVE_TO_ACTIVE_SIDUR:
        case  ActionsTypes.DELETE_FOREVER_SIDUR:
        case  ActionsTypes.UPDATE_DAYS_BETWEEN:

            return ShmiraListReducer[action.type](newState, action)

        case ActionsTypes.CLICKED_ORDER:
        case ActionsTypes.UPDATE_ORDER:
        case ActionsTypes.UPDATE_ORDER_IN_EDIT:
        case ActionsTypes.DELETE_ORDER:
        case ActionsTypes.ADD_NEW_ORDER:
        case ActionsTypes.CLONE_ORDER:

            return PreferenceReducer[action.type](newState, action)


        case ActionsTypes.OPEN_IMPORT_SHEETS_MODAL:
        case ActionsTypes.CLOSE_IMPORT_SHEETS_MODAL:
        case ActionsTypes.EXPORT_ALL:
        case ActionsTypes.IMPORT_FILE_UPLOADED:
        case ActionsTypes.IMPORT_ORDERS_AS_TEXT:
        case ActionsTypes.IMPORT_SHEETS_DATA_PASTE:

            return ImportExportReducer[action.type](newState, action);

        case ActionsTypes.NEW_VEHICLE:
        case ActionsTypes.UPDATE_VEHICLE:
        case ActionsTypes.DELETE_VEHICLE:

            return VehicleReducer[action.type](newState, action)
        case ActionsTypes.CHANGE_VIEW:
        case ActionsTypes.CHANGE_USER_NAME:
        case ActionsTypes.STOP_LOADING_ANIMATION:
        case ActionsTypes.START_LOADING_ANIMATION:
            return DisplayReducer[action.type](newState, action)


        case ActionsTypes.NEW_SKETCH:
        case ActionsTypes.CHOOSE_SKETCH:
        case  ActionsTypes.CLONE_SKETCH:
        case ActionsTypes.RENAME_SKETCH:
        case ActionsTypes.DELETE_SKETCH:
        case ActionsTypes.DOWNLOAD_SKETCH:
            return ListSketchReducer [action.type](newState, action)

        case ActionsTypes.CLICKED_PENDING_ORDER:
        case ActionsTypes.CLICKED_CLOSE_PENDING_ORDER:
        case ActionsTypes.CLICKED_REMOVE_PENDING_ORDER :
        case ActionsTypes.CLICKED_MERGE_PENDING_ORDER :
        case ActionsTypes.CLICKED_SPLIT_PENDING_ORDER :
        case ActionsTypes.CLICKED_CHANGE_PENDING_ORDER  :
        case ActionsTypes.CLICKED_CHANGE_TIME_PENDING_ORDER  :
        case ActionsTypes.CLICKED_REPLACE_EXISTING_PENDING_ORDER  :
        case ActionsTypes.CLICKED_PUBLIC_TRANSPORT_PENDING_ORDER  :
        case ActionsTypes.CLICKED_ADD_TO_PENDING_PENDING_ORDER:
        case ActionsTypes.CLICKED_ASSIGN_GUARD_TO_DATE:


            return PendingPreferencesReducer [action.type](newState, action)
        case ActionsTypes.DELETE_SKETCH_DRIVE:
        case ActionsTypes.UPDATE_SKETCH_NIGHT:
        case ActionsTypes.REMOVE_GUARD_FROM_SKETCH_NIGHT:
            return ListSketchNightReducer [action.type](newState, action);

        case   ActionsTypes.UPDATE_LOCATION_GROUP :
        case  ActionsTypes.DELETE_LOCATION_GROUP :
        case ActionsTypes.NEW_LOCATION_GROUP :
        case ActionsTypes.CLONE_LOCATION_GROUP :
        case ActionsTypes.RENAME_LOCATION_GROUP:
        case ActionsTypes.CHOOSE_LOCATION_GROUP:
        case ActionsTypes.CHOOSE_LOCATION_GROUP_TAB:

            return LocationGroupReducer [action.type](newState, action)

        case ActionsTypes.DATE_RANGES_UPDATE:
            return DateRangesReducer[action.type](newState, action)

        default:
            break;

    }

    return newState
}
export default reducer
