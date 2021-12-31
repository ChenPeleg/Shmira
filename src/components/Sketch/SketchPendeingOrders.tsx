import React from 'react'
import {Box} from '@mui/system';
import {useSelector} from 'react-redux';
import {Typography} from '@mui/material';
import {PreferenceModel} from '../../models/Preference.model';
import {translations} from '../../services/translations';
import {SketchPendingPreference} from './SketchPendingPreference';
import {ShmiraListStore} from '../../store/store.types';


interface sketchPendingPreferencesProps {
    pendingPreferences: PreferenceModel[],
}


export const SketchPendingPreferences = (props: sketchPendingPreferencesProps) => {
 
    const pendingPreferenceInEdit = useSelector((state: ShmiraListStore) => state.pendingPreferenceIdInEdit);

    return (<Box id={'pending-preference-container'} sx={{
            m: '0.2em',
            mb: '0.3em',
            minHeight: '10vh',
            minWidth: '30vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'start',
        }}>
            <Typography variant={'h6'}> {translations.PendingPreferences} </Typography>

            {(props.pendingPreferences || []).map((preference: PreferenceModel) => {
                return <SketchPendingPreference isInEdit={pendingPreferenceInEdit === preference.id} key={preference.id} preference={preference}/>
            })}
        </Box>

    )

}
