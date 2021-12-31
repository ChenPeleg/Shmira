import {OrderModel} from '../models/Order.model';
import {defaultOrderValues, defaultVehicleValues, IAction, SessionModel, SidurStore} from './store.types';
import {SaveLoadService} from '../services/save-load.service';
import {SidurReducer} from './sidur.reducer';
import {OrderReducer} from './order.reducer';
import {ImportExportReducer} from './import-export.reducer';
import {VehicleModel} from '../models/Vehicle.model';
import {VehicleReducer} from './vehicle.reducer';
import {ActionsTypes} from './types.actions';
import {DisplayReducer} from './display.reducer';
import {SketchReducer} from './sketch.reducer';
import {PendingOrdersReducer} from './pendingOrders.reducer';
import {SketchDriveReducer} from './sketch-drive.reducer';
import {LocationGroupReducer} from './locationGroup.reducer';
import {defaultSidurEshbal} from './store-inital-state';


const startOrders: OrderModel[] = ['חן', 'אבי', 'רוני'].map((name: string, index: number): OrderModel => ({
    ...defaultOrderValues,
    id: (index + 1).toString(),
    driverName: name
}));
const startVehicles: VehicleModel[] = ['סנאו', 'שלגיה', 'שכור', 'מאזדה'].map((name: string, index: number): VehicleModel => ({
    ...defaultVehicleValues,
    id: (index + 1).toString(),
    vehicleName: name,

}))
const sessionState: SessionModel = {
    LocationGroupTabOpen: null,
    SketchIdInEdit: null,
    locationGroupInEdit: null,
    orderIdInEdit: null,
    pendingOrderIdInEdit: null,
    dataHolderForCurrentOrderInEdit: null

}
// @ts-ignore
const defaultInitialState: SidurStore = {
    sidurArchive: [],
    locationGroupInEdit: null,
    sidurCollection: [{
        id: '1',
        Name: 'סידור גנים',
        orders: [],
        deletedOrders: [],
        vehicles: [defaultVehicleValues],
        sketches: [],
        chosenSketch: '',
        locationGroup: null
    }, defaultSidurEshbal

    ],
    sidurId: '1',
    orders: startOrders,
    vehicles: startVehicles,
    orderIdInEdit: '1',
    dataHolderForCurrentOrderInEdit: startOrders[0] || null,
    deletedOrders: [],
    defaultOrderValues: {...defaultOrderValues},
    sketches: [],
    displaySetting: {view: 'locationsView'},
    SketchIdInEdit: null,
    pendingOrderIdInEdit: null,
    currentSessionState: sessionState,
    LocationGroups: []

}

const stateFromLocalStorage: SidurStore | undefined = SaveLoadService.loadFromLocalStorage('chen').data?.savedStore
const initialState = stateFromLocalStorage || defaultInitialState;

const reducer = (state: SidurStore = initialState, action: IAction) => {
    let newState = {
        ...state
    }

    switch (action.type) {
        case ActionsTypes.CHOOSE_SIDUR:
        case ActionsTypes.RENAME_SIDUR:
        case ActionsTypes.ADD_NEW_SIDUR:
        case ActionsTypes.DELETE_SIDUR:
        case ActionsTypes.CLONE_SIDUR:
        case ActionsTypes.ARCHIVE_SIDUR:
        case ActionsTypes.MOVE_TO_ACTIVE_SIDUR:
        case  ActionsTypes.DELETE_FOREVER_SIDUR:

            return SidurReducer[action.type](newState, action)

        case ActionsTypes.CLICKED_ORDER:
        case ActionsTypes.UPDATE_ORDER:
        case ActionsTypes.UPDATE_ORDER_IN_EDIT:
        case ActionsTypes.DELETE_ORDER:
        case ActionsTypes.ADD_NEW_ORDER:
        case ActionsTypes.CLONE_ORDER:

            return OrderReducer[action.type](newState, action)

        case ActionsTypes.EXPORT_ALL:
        case ActionsTypes.IMPORT_FILE_UPLOADED:
        case ActionsTypes.IMPORT_ORDERS_AS_TEXT:

            return ImportExportReducer[action.type](newState, action);

        case ActionsTypes.NEW_VEHICLE:
        case ActionsTypes.UPDATE_VEHICLE:
        case ActionsTypes.DELETE_VEHICLE:

            return VehicleReducer[action.type](newState, action)
        case ActionsTypes.CHANGE_VIEW:
            return DisplayReducer[action.type](newState, action)


        case ActionsTypes.NEW_SKETCH:
        case ActionsTypes.CHOOSE_SKETCH:
        case  ActionsTypes.CLONE_SKETCH:
        case ActionsTypes.RENAME_SKETCH:
        case ActionsTypes.DELETE_SKETCH:
            return SketchReducer [action.type](newState, action)

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

            return PendingOrdersReducer [action.type](newState, action)
        case ActionsTypes.DELETE_SKETCH_DRIVE:
        case ActionsTypes.UPDATE_SKETCH_DRIVE:
        case ActionsTypes.REMOVE_ORDER_FROM_SKETCH_DRIVE:
            return SketchDriveReducer [action.type](newState, action);

        case   ActionsTypes.UPDATE_LOCATION_GROUP :
        case  ActionsTypes.DELETE_LOCATION_GROUP :
        case ActionsTypes.NEW_LOCATION_GROUP :
        case ActionsTypes.CLONE_LOCATION_GROUP :
        case ActionsTypes.RENAME_LOCATION_GROUP:
        case ActionsTypes.CHOOSE_LOCATION_GROUP:
        case ActionsTypes.CHOOSE_LOCATION_GROUP_TAB:

            return LocationGroupReducer [action.type](newState, action)

        default:
            break;

    }

    return newState
}
export default reducer