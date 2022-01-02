import {TextFieldPropertiesModel} from '../../models/text-field-properties.model';

import React from 'react';
import {Box, Slider, Theme, Typography} from '@mui/material';
import {translations} from '../../services/translations';
import {Styles} from '../../hoc/themes';


const sliderSx = {

    direction: (theme: Theme) => theme.direction,

    '& .MuiSlider-thumb': {
        marginRight: -2,
        marginLeft: 0
    }
}


const renderFlexibilityText = (flexValues: [number, number]): string => {
    const absValue = (n: number): string => Math.abs(n).toString()
    let text = translations.flexEarly + ' ' + absValue(flexValues[0]) + ' ' + translations.min + ', ' +
        translations.flexLate + ' ' + absValue(flexValues[1]) + ' ' + translations.min;
    return text
}
export const RenderFlexibilityField = (
    {
        input,
        label,
        meta: {
            touched,
            error
        },
        ...custom
    }: TextFieldPropertiesModel,
) => {
    const convertedInput = {...input}
    // convertedInput.value = convertedInput.value.map((v: string) => Utils.convertStrToNum(v))
    return (
        <>
            <Box sx={Styles.flexRow}>
                <Typography component="legend"><b>{translations.byDates}: </b> </Typography>

                <Box sx={{width: '50px'}}>

                    <Slider variant={'standard'}
                            sx={sliderSx}
                            disableSwap
                            valueLabelDisplay="auto"
                            label={label}
                            min={1}
                            max={2}
                            step={1}
                            onChange={input.onChange}

                            {...convertedInput}
                            {...custom}
                    />
                </Box>
                <Typography component="legend"><b>{translations.byWeekDays}: </b> </Typography>
            </Box>
        </>
    );
}
