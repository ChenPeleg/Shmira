import React from 'react';
import {Box, Slider, Theme} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {ActionsTypes} from '../../store/types.actions';
import {Styles} from '../../hoc/themes';
import {translations} from '../../services/translations';

export const DaysBetween = () => {
    const sliderSx = {

        direction: (theme: Theme) => theme.direction,

        '& .MuiSlider-thumb': {
            marginRight: -2,
            marginLeft: 0
        }
    }

    const dispatch = useDispatch()
    const daysBetweenGuardDuty = useSelector((state: { daysBetweenGuardDuty: string }) => state.daysBetweenGuardDuty);
    const value = Number(daysBetweenGuardDuty) || 6
    const handleSliderChange = (event: Event, newValue: any) => {
        const value = (newValue || 6).toString();
        dispatch({
            type: ActionsTypes.UPDATE_DAYS_BETWEEN,
            payload: {
                value: value.toString()
            }
        })
    }
    return (<Box sx={{
        ...Styles.flexColumn,
        width: '200px',
        ml: '1em',
        mr: '1em'
    }}>


        <Slider
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            sx={sliderSx}
            min={2}
            max={12}

            step={1}
            value={value}
            onChange={handleSliderChange}

        />
        {value.toString() + ' ' + translations.minimumBetweenDates}
    </Box>)
}
