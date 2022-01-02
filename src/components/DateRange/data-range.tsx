import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {translations} from '../../services/translations';
import {Box} from '@mui/material';
import {Styles} from '../../hoc/themes';
import {useDispatch, useSelector} from 'react-redux';
import {ShmiraListRecord, ShmiraListStore} from '../../store/store.types';
import {Utils} from '../../services/utils';
import {ActionsTypes} from '../../store/types.actions';

type FromOrTo = 'From' | 'To';
const textFieldSx = {bgcolor: 'rgba(240,240,240,0.2)'}


export const DataRange = () => {

    const shmiraListId = useSelector((state: ShmiraListStore) => state.shmiraListId);
    const shmiraListCollection = useSelector((state: ShmiraListStore) => state.shmiraListCollection);
    const shmiraListSelected = shmiraListCollection.find((shmiraListRecord: ShmiraListRecord) => shmiraListRecord.id === shmiraListId);
    const DateFromString = shmiraListSelected?.DateFrom || null;
    const DateToString = shmiraListSelected?.DateTo || null;
    const DateFrom = Utils.Date.dateStampToDate(DateFromString || '');
    const dispatch = useDispatch()
    const DateTo = Utils.Date.dateStampToDate(DateToString || '');
    console.log(DateTo, DateFrom)
    const handleDatesChange = (newValue: Date | null, fromOrTo: FromOrTo): void => {
        const payload = {
            DateTo: DateToString,
            DateFrom: DateFromString
        };
        if (fromOrTo === 'From' && newValue) {
            payload.DateFrom = Utils.Date.dateToDateStamp(newValue)
        }
        if (fromOrTo === 'To' && newValue) {
            payload.DateTo = Utils.Date.dateToDateStamp(newValue)
        }
        console.dir(payload)
        dispatch({
            type: ActionsTypes.DATE_RANGES_UPDATE,
            payload
        })

    }


    return (
        <Box sx={{
            ...Styles
                .flexRow,
            m: '1em',
            mt: 0
        }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={translations.FromDate}
                    value={DateFrom}
                    onChange={(newValue: Date | null) => {
                        // setValue(newValue);
                        handleDatesChange(newValue, 'From')
                    }}
                    renderInput={(params) => <TextField sx={textFieldSx}  {...params} />}
                />
                <Box sx={Styles.divider}/>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={translations.ToDate}
                    value={DateTo}
                    onChange={(newValue: Date | null) => {

                        handleDatesChange(newValue, 'To')
                    }}
                    renderInput={(params) => <TextField sx={textFieldSx} {...params} />}
                />
            </LocalizationProvider>
        </Box>
    );
}
