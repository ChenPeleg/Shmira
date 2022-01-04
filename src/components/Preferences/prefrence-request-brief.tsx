import React from 'react';
import {useSelector} from 'react-redux';
import {Box, SxProps, Theme} from '@mui/system';
import {Typography} from '@mui/material';
import {translations} from '../../services/translations';
import {LocationModel} from '../../models/Location.model';
import {locations} from '../../services/locations';
import {PreferenceType, WeekDaysOrDates} from '../../models/PreferenceType.enum';
import {PreferenceFields, PreferenceModel} from '../../models/Preference.model';
import {Utils} from '../../services/utils';
import {LanguageUtilities} from '../../services/language-utilities';


//const TRL = translations;

type AppProps = {
    preferenceId: string;
    sx: SxProps,
    isInEdit: boolean
};
const allLocations: LocationModel[] = locations.map(o => ({...o}))
const useStyles: any = (() => ({
    root: {
        direction: (theme: Theme) => theme.direction,
        '& .MuiFormLabel-root': {
            left: 'inherit'
        }
    },
    fieldWrapper: {
        display: 'inline-flex',
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
}))
const preferenceFields: PreferenceModel = new PreferenceFields();
const getGuardDatesFromRecord = (preference: PreferenceModel): string[] => {
    if (preference.TypeOfInfoPreference === PreferenceType.CanAlwaysGuard) {
        return []
    } else if (preference.TypeOfInfoPreference === PreferenceType.CantGuardIn || preference.TypeOfInfoPreference === PreferenceType.CanGuardIn) {
        if (preference.weekDaysOrDates === WeekDaysOrDates.Dates) {
            return preference.flexibilityByDates.map(d => Utils.Date.simpleDateFromDateStamp(d))
        }
        if (preference.weekDaysOrDates === WeekDaysOrDates.WeekDays) {
            return preference.flexibilityByDays.map(d => Utils.Date.simpleDateFromDateStamp(d))
        }
    }

    return []
}
const doesNameExist = (allPreferences: PreferenceModel[], thisPreference: PreferenceModel): boolean => {
    return allPreferences.filter(p => p.id !== thisPreference.id).map(p => p.guardName.trim()).includes(thisPreference.guardName.trim());

}
const areDetailsMissing = (preferenceValues: PreferenceModel): boolean => {
    if (!preferenceValues.TypeOfInfoPreference || !preferenceValues.guardName) {
        return true
    }
    if (preferenceValues.TypeOfInfoPreference === PreferenceType.CanGuardIn) {
        if (!preferenceValues.finishHour || !preferenceValues.optionalGuardDaysByDates) {
            return true
        }
    }
    return false
}

const buildBriefText = (preferenceValues: PreferenceModel): string => {
    const isWithName = preferenceValues.guardName.trim() !== '';
    if (!isWithName) {
        return translations.NewPreference
    }
    let abilityText = '';
    //const get

    const datesArray = getGuardDatesFromRecord(preferenceValues);

    const daysText = ''

    if (preferenceValues.TypeOfInfoPreference === PreferenceType.CanAlwaysGuard) {
        abilityText = translations.CanAlwaysGuardShort
    } else if (preferenceValues.TypeOfInfoPreference === PreferenceType.CanGuardIn || preferenceValues.TypeOfInfoPreference === PreferenceType.CantGuardIn) {
        abilityText = preferenceValues.TypeOfInfoPreference === PreferenceType.CanGuardIn ? translations.CanGuardInDaysShort : translations.CantGuardInDaysShort;
        let daysArr: any [] = [];

        if (preferenceValues.weekDaysOrDates === WeekDaysOrDates.Dates) {
            daysArr = getGuardDatesFromRecord(preferenceValues);
        }
        if (preferenceValues.weekDaysOrDates === WeekDaysOrDates.WeekDays) {
            daysArr = preferenceValues.flexibilityByDays.map(d => {
                const dayName = Utils.Date.dateOfWeekObject.find(dObj => dObj.weekDayNumber.toString() === d.toString())
                return dayName?.name
            }).filter(d => d);

        }
        if (daysArr.length) {
            abilityText += ': ' + daysArr.join(', ');
        } else {
            abilityText = ''
        }

    }

    let briefText = LanguageUtilities.trimText(preferenceValues.guardName + ' ' + abilityText, 55)

    return briefText
}
export const PrefrenceRequestBrief = (props: AppProps) => {
    const id = props.preferenceId;


    const allPreferences = useSelector((state: { preferences: PreferenceModel[] }) => state.preferences) || [];
    const preferenceValues = allPreferences.find(preference => preference.id === id) as PreferenceModel;


    const missingDetailsShown: boolean = areDetailsMissing(preferenceValues) && !props.isInEdit;
    const isThereSimilarName: boolean = doesNameExist(allPreferences, preferenceValues) && !props.isInEdit;


    return (
        <Box sx={{
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start'
        }}>
            <Typography fontWeight={props.isInEdit ? 'bold' : 'initial'} fontSize={'large'} padding={'initial'}>
                {buildBriefText(preferenceValues)}
            </Typography>
            <Typography fontSize={'large'} color={'red'} padding={'initial'}>  &nbsp;
                {missingDetailsShown ? '(' + translations.missingDetails + ')' : null}
                {isThereSimilarName && !missingDetailsShown ? '(' + translations.nameExist + ')' : null}
            </Typography>

        </Box>


    )
}


