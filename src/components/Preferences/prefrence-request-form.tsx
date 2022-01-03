import React, {useState} from 'react';

import {Field, Form} from 'react-final-form';
import {MuiFormPropsModel} from '../../models/mui-form-props.model';
import {useDispatch, useSelector} from 'react-redux';
import {RenderTextField} from '../Form/text-field';
import {RenderSelectField} from '../Form/select-field';
import {PreferenceType} from '../../models/PreferenceType.enum';
import {Box, SxProps, Theme} from '@mui/system';
import {Button, MenuItem} from '@mui/material';
import {translations} from '../../services/translations';
import {ActionsTypes} from '../../store/types.actions';
import {LocationModel} from '../../models/Location.model';
import {locations} from '../../services/locations';
import {LanguageUtilities} from '../../services/language-utilities';
import {RenderFullNightField} from '../Form/full-night-field';
import {RenderFlexibilityField} from '../Form/flex-field';
import {PreferenceFields, PreferenceModel} from '../../models/Preference.model';
import {RenderSelectFieldDDays} from '../Form/select-field-days';
import {ShmiraListRecord} from '../../store/store.types';


const TRL = translations;


const useStyles: any = (() => ({
    root: {
        direction: (theme: Theme) => theme.direction,
        '& .MuiFormLabel-root': {
            left: 'inherit'
        }
    },
    fieldWrapper: {
        padding: '10px'
    },
    fieldWrapperText: {
        display: 'inline-flex',
        padding: '10px',
        maxWidth: '150px'
    },
    cardBase: {
        direction: (theme: Theme) => theme.direction,
        padding: '10px',
        cursor: 'pointer',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    additionalText: {
        fontSize: '14px'
    }
}));
const fieldWrapper: SxProps = {
    padding: '10px'
}
const selectFieldWrapper: SxProps = {
    ...fieldWrapper,
    paddingBottom: '0px'
}

const fieldWrapperText = {
    display: 'inline-flex',
    padding: '10px',
    maxWidth: '150px'
};
const allLocations: LocationModel[] = locations.map(o => ({...o}))
const preferenceFields: PreferenceModel = new PreferenceFields();

const Divider = () => (<Box sx={{
    width: '10px',
    height: '5px'
}}/>)
const daysOfWeekMenuItem = [
    {
        name: 'ראשון',
        weekDayNumber: 1
    },
    {
        name: 'שני',
        weekDayNumber: 2
    },
    {
        name: 'שלישי',
        weekDayNumber: 3
    },
    {
        name: 'רביעי',
        weekDayNumber: 4
    },
    {
        name: 'חמישי',
        weekDayNumber: 5
    },
    {
        name: 'שישי',
        weekDayNumber: 6
    },
    {
        name: 'שבת',
        weekDayNumber: 7
    },
]
const createItemsFromDateRange = (dateFrom: string, dateTo: string): { dateInShort: string, timeStamp: string } [] => {

    const numberOfDays: number = Number(dateTo) - Number(dateFrom);
    const plainNumbersArray = Array.from(Array(40).keys())
    const dateStampArr = plainNumbersArray.map(d => d + Number(dateFrom))
    return dateStampArr.map(n =>
        ({
            dateInShort: n.toString(),
            timeStamp: n.toString(),
        })
    )
}
const MaterialUiForm = (muiFormProps: MuiFormPropsModel) => {
    const {
        handleSubmit,
        pristine,
        reset,
        submitting,
        typeOfDrive
    } = muiFormProps;
    const classes = useStyles();
    const shmiraListCollection: ShmiraListRecord[] = useSelector((state: { shmiraListCollection: ShmiraListRecord[] }) => state.shmiraListCollection);
    const shmiraListId: string = useSelector((state: { shmiraListId: string }) => state.shmiraListId);
    const currenList: ShmiraListRecord | undefined = shmiraListCollection.find(s => s.id === shmiraListId);
    let dateRange = createItemsFromDateRange('44444', '44480')
    if (currenList) {
        dateRange = createItemsFromDateRange(currenList.DateFrom, currenList.DateTo)

    }
    const [isAdvanced, setIsAdvanced] = useState(false);
    const handleSetAdvanced = (value: boolean = true) => {
        setIsAdvanced(value)
    }
    const advanceFieldWrapper: SxProps = {
        ...fieldWrapper,
        display: isAdvanced ? 'initial' : 'none'
    }
    const driveTimelanguage = LanguageUtilities.getPrefixByDriveType(typeOfDrive)
    //console.log(typeOfDrive, driveTimelanguage.location)
    return (

        <form onSubmit={(...args) => submitting(...args)} dir={'rtl'}>
            <Box id={'form-wrapper'} sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>


                <Box
                    sx={fieldWrapperText}
                >
                    <Field name={preferenceFields.guardName}
                           component={RenderTextField}
                           label={TRL.Name}
                    />
                </Box>
                <Box sx={selectFieldWrapper}>
                    <Field
                        label={TRL.TypeOfDrivePreference}
                        name={'flexibilityByDays'}
                        component={RenderSelectField}>

                        <MenuItem value={PreferenceType.CanGuardIn.toString()}>{TRL.CanGuardIn}</MenuItem>
                        <MenuItem value={PreferenceType.CanAlwaysGuard.toString()}> {TRL.CanAlwaysGuard}</MenuItem>
                        <MenuItem value={PreferenceType.CantGuardIn.toString()}>{TRL.CantGuardIn}</MenuItem>

                    </Field>

                </Box>
                <Box
                    sx={selectFieldWrapper}> <Field name={'weekDaysOrDates'}
                                                    component={RenderFlexibilityField}
                                                    label={TRL.flexibilityByDays}
                                                    rows={2}
                />


                </Box>
                <Box sx={{
                    ...selectFieldWrapper,
                    minWidth: '20%'
                }}>
                    <Field
                        name={'TypeOfDrivePreference'}
                        component={RenderSelectFieldDDays}
                        label={TRL.TypeOfDrivePreference ? TRL.CantGuardInDays : TRL.CantGuardInDays}


                    >
                        {daysOfWeekMenuItem.map((day: { name: string, weekDayNumber: number }) => {
                            return (<MenuItem key={day.weekDayNumber} value={day.weekDayNumber.toString()}>{day.name}</MenuItem>
                            )

                        })}
                    </Field>

                </Box>


                <Box sx={{
                    ...selectFieldWrapper,
                    minWidth: '30%'
                }}>
                    <Field
                        name={'TypeOfDrivePreference'}
                        component={RenderSelectFieldDDays}
                        label={TRL.TypeOfDrivePreference ? TRL.CantGuardInDays : TRL.CantGuardInDays}


                    >
                        {dateRange.map((day: { dateInShort: string, timeStamp: string }) => {
                            return (<MenuItem key={day.dateInShort} value={day.timeStamp.toString()}>{day.dateInShort}</MenuItem>
                            )

                        })}
                    </Field>

                </Box>

                <Box
                    sx={{
                        ...fieldWrapper,
                        alignSelf: 'flex-end'
                    }}> <Field name={preferenceFields.halfOrFull}
                               component={RenderFullNightField}
                               label={TRL.halfOrFull}
                               type={'text'}
                               rows={2}
                />


                </Box>
                <Box
                    sx={fieldWrapper}> <Field name={preferenceFields.Comments}
                                              component={RenderTextField}
                                              label={TRL.Comments}
                    // multiLine={true}
                                              rows={2}
                />
                </Box>


                <Box sx={{
                    ...fieldWrapper,
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'flex-end'
                }}
                >

                    <Button sx={{m: '5px'}} variant="contained" color={'primary'} type="button"
                            onClick={handleSubmit}>{TRL.Submit}</Button>


                </Box>
            </Box>
        </form>
    );
};

export const PrefrenceRequestForm = (formProps: MuiFormPropsModel) => {

    const dispatch = useDispatch();

    const id = formProps.preferenceId;
    const preferences = useSelector((state: { preferences: PreferenceModel[] }) => state.preferences);


    const initialValues = preferences.find(preference => preference.id === id);
    // @ts-ignore
    const [_typeOfDrive, set_typeOfDrive] = useState(initialValues.TypeOfDrivePreference as PreferenceType)
    let formValues = {...initialValues};


    return (
        <Form
            initialValues={initialValues}
            onSubmit={(values: any) => {
            }}
            validate={(values: any) => {

                if (!formProps.isInEdit) {
                    return
                }
                dispatch({
                    type: ActionsTypes.UPDATE_ORDER_IN_EDIT,
                    payload: {
                        ...values
                    }
                })
                if (values?.TypeOfDrivePreference && values?.TypeOfDrivePreference !== _typeOfDrive) {
                    set_typeOfDrive(values.TypeOfDrivePreference)
                }
                return {} // validate(values)
            }}
            handleSubmit={(event: Event, values: any) => {
                if (!formProps.isInEdit) {
                    return
                }
                dispatch({
                    type: ActionsTypes.UPDATE_ORDER,
                    payload: {
                        id: id
                    }
                })

            }}
            render={({handleSubmit}: any) => (MaterialUiForm({
                ...formProps,
                typeOfDrive: _typeOfDrive,
                handleSubmit,
            }))

            }/>
    )
}


