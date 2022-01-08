import React from 'react'
import {Box} from '@mui/system';
import {useDispatch} from 'react-redux';
import {Typography} from '@mui/material';
import {locations} from '../../services/locations';
import {LanguageUtilities} from '../../services/language-utilities';
import {PreferenceModel} from '../../models/Preference.model';


interface sketchPendingPreferenceProps {
    preference: PreferenceModel,
    isInEdit: boolean
}

const getLocationFromId = (locationId: string): string | null => {
    return locations.find(v => v.id === locationId)?.name || locationId
}
const timeText = (drive: PreferenceModel) => LanguageUtilities.buildBriefText(drive, locations).timeText;
const driverAndLocation = (drive: PreferenceModel) => LanguageUtilities.buildBriefText(drive, locations).driverAndLocation;
export const SketchPendingPreferenceBrief = (props: sketchPendingPreferenceProps) => {
    const dispatch = useDispatch();
    const preference = props.preference;


    return ((<Box id={'pending-preference'}>


            <Box id={'drive-description'}>
                <Box sx={{
                    width: '5px',
                    height: '10px'
                }}/>
                <Typography fontWeight={props.isInEdit ? 'bold' : ''}
                            variant={'subtitle1'}>{timeText(preference) + ' ' + driverAndLocation(preference)}  </Typography>

            </Box>

        </Box>)

    )

}
