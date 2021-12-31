import React from 'react'
import {Box} from '@mui/material';
import {useSelector} from 'react-redux';
import {DisplaySettings} from '../store/store.types';
import {SketchesContainer} from '../components/Sketch/SketchesContainer';
import {LocationGroupEditWrapper} from '../components/LocationsEdit/location-group-edit-wrapper';
import { Preferences } from '../components/Preferences/preferences';


export const MainLayout = () => {
    const displaySetting: DisplaySettings = useSelector((state: { displaySetting: DisplaySettings }) => state.displaySetting);
    let displaySketches: boolean = false;
    let displayPreferences: boolean = true;
    let displayLocations: boolean = false

    switch (displaySetting?.view) {
        case 'preferences':
            displayPreferences = true;
            displaySketches = false;
            break;
        case 'sketch':
            displayPreferences = false;
            displaySketches = true;
            break;
        case 'locationsView':
            displayPreferences = false;
            displaySketches = false;
            displayLocations = true
            break;
        default:
            break;

    }

    return (

        <main>
            <Box sx={{margin: '20px'}} flexDirection="row" display="flex" alignItems="start" justifyContent="start">

                {displaySketches ? <Box flexDirection="column" flexWrap="wrap" display="flex" alignItems="start" justifyContent="start">

                    <SketchesContainer/>

                </Box> : null}
                {displayPreferences ? <Box flexDirection="column" flexWrap="wrap" display="flex" alignItems="start" justifyContent="start">


                    <Preferences/>

                </Box> : null}
                {displayLocations ? <Box flexDirection="column" flexWrap="wrap" display="flex" alignItems="start" justifyContent="start">

                    <LocationGroupEditWrapper/>

                </Box> : null}

            </Box>

        </main>


    )

}
