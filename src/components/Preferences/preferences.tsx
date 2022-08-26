import React from 'react'
import {translations} from '../../services/translations';
import {Box} from '@mui/system';
import {PrefrenceRequest} from './prefrence-request';
import {useDispatch, useSelector} from 'react-redux';
import {ActionsTypes} from '../../store/types.actions';
import {AddButton} from '../Icons/add-button';
import {PreferenceModel} from '../../models/Preference.model';
import {ShmiraListRecord, ShmiraListStore} from '../../store/store.types';
import {ImportFromSheetsButton} from "../Icons/import-from-sheets";
import { Styles } from '../../hoc/themes';

const TRL = translations;
const useStyles = (() => ({
    cardBase: {
        padding: '10px',
        cursor: 'pointer',
        width: '50vw',

        borderRadius: '15px'

    },
    cardHeader: {
        paddingBottom: 0,
        paddingTop: '10px'
    },
    additionalText: {
        fontSize: '14px'
    }
}))
const buildGenData = (numberOfPrefrences: number, NumberOfDays: number): string => {
    let text = numberOfPrefrences.toString() + ' ' + translations.guards;
    text += ', ' + NumberOfDays.toString() + ' ' + translations.guardDates;
    return text
}
export const Preferences = () => {
    const dispatch = useDispatch()
    const preferences = useSelector((state: { preferences: PreferenceModel[] }) => state.preferences);
    const preferenceIdInEdit = useSelector((state: { preferenceIdInEdit: string | null }) => state.preferenceIdInEdit);
    const shmiraListId = useSelector((state: ShmiraListStore) => state.shmiraListId);
    const shmiraListCollection = useSelector((state: ShmiraListStore) => state.shmiraListCollection);
    const shmiraListSelected = shmiraListCollection.find((shmiraListRecord: ShmiraListRecord) => shmiraListRecord.id === shmiraListId);
    const DateFromString = shmiraListSelected?.DateFrom || '0';
    const DateToString = shmiraListSelected?.DateTo || '0';
    const days = Number(DateFromString) - Number(DateToString)

    const generalData = buildGenData(preferences.length, Math.abs(days))
    const addClickHandler = (event: any) => {
        dispatch({
            type: ActionsTypes.ADD_NEW_ORDER,
            payload: {}
        })
    }
    const importClickHandler = (event: any) => {
        dispatch({
            type: ActionsTypes.OPEN_IMPORT_SHEETS_MODAL,
            payload: {}
        })
    }


    return (
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                mb: '10px',
                justifyContent: 'start',
                minWidth: '30vw',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    mb: '10px',
                    justifyContent: 'center',
                    minWidth: '18vw',
                }}>

                    {generalData}

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                    justifyContent: 'center',
                    minWidth: '15vw',
                }}>
                    <Box sx={{...Styles.divider}}></Box>
                    <AddButton addClickHandler={addClickHandler}/>
                    <Box sx={{...Styles.divider}}></Box>
                    <ImportFromSheetsButton importClickHandler={importClickHandler}/>
                </Box>
            </Box>
            <Box>
                {preferences.map((o) => (
                    <PrefrenceRequest preferenceId={o.id} key={o.id} isInEdit={preferenceIdInEdit === o.id}/>
                ))}

            </Box>
        </Box>


    )

}
