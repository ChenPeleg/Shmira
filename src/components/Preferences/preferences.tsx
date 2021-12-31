import React from 'react'
import {translations} from '../../services/translations';
import {Box} from '@mui/system';
import {PrefrenceRequest} from './prefrence-request';
import {useDispatch, useSelector} from 'react-redux';
import {PreferenceModel} from '../../models/Preference.model';
import {ActionsTypes} from '../../store/types.actions';
import {AddButton} from '../Icons/add-button';

const TRL = translations;
const useStyles = (() => ({
    cardBase: {
        padding: '10px',
        cursor: 'pointer',
        width: '50vw',

        bpreferenceRadius: '15px'

    },
    cardHeader: {
        paddingBottom: 0,
        paddingTop: '10px'
    },
    additionalText: {
        fontSize: '14px'
    }
}))

export const Preferences = () => {
    const dispatch = useDispatch()
    const preferences = useSelector((state: { preferences: PreferenceModel[] }) => state.preferences);
    const preferenceIdInEdit = useSelector((state: { preferenceIdInEdit: string | null }) => state.preferenceIdInEdit);
    const classes = useStyles();
    const addClickHandler = (event: any) => {
        dispatch({
            type: ActionsTypes.ADD_NEW_ORDER,
            payload: {}
        })
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mb: '10px',
                justifyContent: 'center',
                minWidth: '30vw',
            }}>
                <AddButton addClickHandler={addClickHandler}/>
            </Box>
            <Box>
                {preferences.map((o) => (
                    <PrefrenceRequest preferenceId={o.id} key={o.id} isInEdit={preferenceIdInEdit === o.id}/>
                ))}

            </Box>
        </Box>


    )

}
