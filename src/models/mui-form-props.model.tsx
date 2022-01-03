import {PreferenceType} from './PreferenceType.enum';

export interface MuiFormPropsModel {
    handleSubmit: any,
    pristine: any,
    reset: any,
    submitting: any,
    preferenceId: any,
    isInEdit: boolean,
    typeOfDrive?: PreferenceType

};
