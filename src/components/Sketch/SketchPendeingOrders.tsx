import React from 'react'
import {Box} from '@mui/system';
import {useSelector} from 'react-redux';
import {Typography} from '@mui/material';
import {translations} from '../../services/translations';

import {ShmiraListStore} from '../../store/store.types';
import {SketchPendingPreference} from './SketchPendingOrder';
import {PreferenceModel} from '../../models/Preference.model';


interface sketchPendingPreferencesProps {
    pendingPreferences: PreferenceModel[],
}


export const SketchPendingPreferences = (props: sketchPendingPreferencesProps) => {

    const pendingPreferenceInEdit = useSelector((state: ShmiraListStore) => state.pendingPreferenceIdInEdit);
    //console.log(pendingPreferenceInEdit)
    return (<Box id={'pending-preference-container'} sx={{
            direction: 'rtl',
            m: '0.2em',
            mb: '0.3em',
            minHeight: '10vh',
            minWidth: '20vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'start',
        }}>
            <Typography variant={'h6'}> {translations.GuardsNoAssigned} </Typography>

            {(props.pendingPreferences || []).map((preference: PreferenceModel) => {
                return <SketchPendingPreference isInEdit={pendingPreferenceInEdit === preference.id} key={preference.id}
                                                preference={preference}/>
            })}
        </Box>

    )

}
