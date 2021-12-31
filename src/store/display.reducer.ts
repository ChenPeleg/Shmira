import {AppConstants, IAction, ShmiraListStore} from './store.types';
import {ActionsTypes} from './types.actions';

export type DisplayReducerFunctions =
    ActionsTypes.CHANGE_VIEW


export const DisplayReducer: Record<DisplayReducerFunctions, (state: ShmiraListStore, action: IAction) => ShmiraListStore> = {
    [ActionsTypes.CHANGE_VIEW]: (state: ShmiraListStore, action: IAction): ShmiraListStore => {
        let newState = {...state}
        newState.displaySetting = {...newState.displaySetting}
        newState.displaySetting.view = action.payload.value
        return newState
    },


}
const getAllOrdersIDs = (state: ShmiraListStore): string[] => {
    const ordersIds = state.orders.map(o => o.id);
    const deletedIdsWithWords = state.deletedOrders.map(o => o.id);
    const replaceIdsNames: RegExp = new RegExp(AppConstants.ArchiveIdPrefix + '|' + AppConstants.deleteIdPrefix, 'g');
    ;
    const deletedIds = deletedIdsWithWords.map(o => o.replace(replaceIdsNames, ''))
    return [...deletedIds, ...ordersIds]
}
const updateOrdersWithEditedOrder = (state: ShmiraListStore): ShmiraListStore => {
    const currentOrderId = state?.dataHolderForCurrentOrderInEdit?.id
    if (currentOrderId) {
        state.orders = state.orders.map(order => {
            if ((currentOrderId === order.id) && state.dataHolderForCurrentOrderInEdit) {
                order = state.dataHolderForCurrentOrderInEdit
            }
            return order
        });
    }

    return state
}


