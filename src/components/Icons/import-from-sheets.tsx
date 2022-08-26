import {SxProps} from '@mui/system';
import React from 'react';
import {Add, ListAlt} from '@mui/icons-material';
import {Box, Button} from '@mui/material';
import {translations} from '../../services/translations';


export interface AddButtonProps {
    sx?: SxProps,
    importClickHandler: any

}

export const ImportFromSheetsButton = (props: AddButtonProps) => {


    return (

        <Box>
            <Button id={'import-from-sheet-preference-button'} variant="contained"
                    sx={{'backgroundColor':"#5d3962"}}
                    onClick={props.importClickHandler} aria-label="add" size="large">

                <ListAlt/>  &nbsp;&nbsp; {translations.ImportFromSheets}
            </Button>

        </Box>


    )

}
