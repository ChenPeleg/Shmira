import React from 'react';
import {SxProps, Theme} from '@mui/system';
import {InputLabel, Select} from '@mui/material';

const useStyles = () => ({
    root: {
        direction: (theme: Theme) => theme.direction,
        '& .MuiInputBase-input': {
            paddingLeft: '10px'
        },

    }
})
const lableSx: SxProps = {
    fontSize: (theme) => '0.7em'

}
const valuesToArray = (val: string | string[]): string [] => {
    if (Array.isArray(val)) {
        return val
    } else if (val.includes(',')) {
        return val.split(',').map(v => v.trim())
    } else {
        return [val]
    }
}
export const RenderSelectFieldDDays = (
    {
        input,
        label,
        meta: {
            touched,
            error
        },
        children,
        ...custom
    }: any,
) => {
    const classes = useStyles();
    const alteredInput = {...input};
    alteredInput.value = valuesToArray(alteredInput.value)
    return (
        <>


            <InputLabel sx={{...lableSx}} id="select-liable">{label}</InputLabel>
            <Select variant={'standard'}
                    multiple
                    sx={{
                        ...
                            classes
                                .root,
                        minWidth: '300px'
                    }}
                    labelId="select-liable"
                    label={label}

                    {...alteredInput}
                    onChange={(event: any, child: any) => {

                        input.onChange(event)
                    }}

                    children={children}
                    {...custom}>

            </Select>
        </>

    )
};
