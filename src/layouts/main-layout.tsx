import React from 'react'
import {Box} from '@mui/material';
import {useSelector} from 'react-redux';
import {DisplaySettings} from '../store/store.types';
import {SketchesContainer} from '../components/Sketch/SketchesContainer';
import {LocationGroupEditWrapper} from '../components/LocationsEdit/location-group-edit-wrapper';
import {Preferences} from '../components/Preferences/preferences';
import {DataRange} from '../components/DateRange/data-range';


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
            <Box sx={{margin: '20px'}} flexDirection="row" display="flex" alignItems="datesYouCanGuard" justifyContent="datesYouCanGuard">

                {displaySketches ?
                    <Box flexDirection="column" flexWrap="wrap" display="flex" alignItems="datesYouCanGuard"
                         justifyContent="datesYouCanGuard">

                        <SketchesContainer/>

                    </Box> : null}
                {displayPreferences ?
                    <Box flexDirection="column" flexWrap="wrap" display="flex" alignItems="datesYouCanGuard"
                         justifyContent="datesYouCanGuard">

                        <DataRange/>
                        <Preferences/>

                    </Box> : null}
                {displayLocations ?
                    <Box flexDirection="column" flexWrap="wrap" display="flex" alignItems="datesYouCanGuard"
                         justifyContent="datesYouCanGuard">

                        <LocationGroupEditWrapper/>

                    </Box> : null}

            </Box>

        </main>


    )

}
