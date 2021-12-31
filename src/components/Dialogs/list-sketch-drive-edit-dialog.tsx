import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {translations} from '../../services/translations';
import {Box, Card, Typography} from '@mui/material';
import {SxProps} from '@mui/system';
import {Delete} from '@mui/icons-material';
import {DriveModel, SketchModel} from '../../models/Sketch.model';
import {VerticalHourField} from '../buttons/vertical-hour-field';
import {PreferenceModel} from '../../models/Preference.model';
import {useDispatch, useSelector} from 'react-redux';
import {Utils} from '../../services/utils';
import {PreferenceActionButton} from '../buttons/preference-action-button';
import {SketchEditActionEnum} from '../../models/SketchEditAction.enum';
import {ActionsTypes} from '../../store/types.actions';
import {ShmiraListStore} from '../../store/store.types';

interface SketchDriveEditDialogProps {
    open: boolean;
    sketchDriveData: { drive: DriveModel, vehicleId: string };
    vehicleId: string;
    onDelete: (sketchDriveData: { drive: DriveModel, vehicleId: string }) => void;
    onClose: (vehicleUpdate: DriveModel | null) => void;
}

export const ListSketchDriveEditDialog = (props: SketchDriveEditDialogProps) => {
    const {
        onClose,
        onDelete,
        open,
        sketchDriveData
    } = props;
    const vehicleId = sketchDriveData.vehicleId
    const driveData = sketchDriveData.drive
    const dispatch = useDispatch();
    const SketchIdInEdit = useSelector((state: ShmiraListStore) => state.SketchIdInEdit);
    const sketches: SketchModel[] = useSelector((state: { sketches: SketchModel[] }) => state.sketches);
    const sketchInEdit: SketchModel | null = sketches.find((sketch: SketchModel) => sketch.id === SketchIdInEdit) || null;

    const sketchPreferences = sketchInEdit?.assignedPreferences || [];
    const [driveChangedData, setDriveChangedData] = useState<DriveModel>({...driveData});


    const descriptionValueRef: any = useRef('')
    const filedWrapper: SxProps = {
        width: '230px'
    }
    const handleCloseCancel = () => {
        onClose(null);
    };

    const handleCloseEdit = (): void => {
        const editedData: DriveModel | null = {...driveChangedData};
        if (descriptionValueRef?.current?.value) {
            editedData.description = descriptionValueRef?.current?.value
        }
        onClose(editedData);

    };
    const handleCloseDelete = (): void => {
        const sketchDriveDataForDelete = {...sketchDriveData}
        
        onDelete(sketchDriveDataForDelete);
    };
    const addToPendingClickHandler = (event: Event, preferenceId: string) => {

        dispatch({
            type: ActionsTypes.REMOVE_ORDER_FROM_SKETCH_DRIVE,
            payload: {
                preferenceId,
                sketchDriveId: driveData.id
            }
        })
        const newDrive = {...driveChangedData};
        newDrive.implementsPreferences = newDrive.implementsPreferences.filter(o => o !== preferenceId);
        setDriveChangedData(newDrive)
    }
    const handleHourChange =
        (event: Event, input: any) => {


            const newSketchData = {...driveChangedData};
            newSketchData.startHour = Utils.DecimalTimeToHourText(input[0]);
            newSketchData.finishHour = Utils.DecimalTimeToHourText(input[1]);
            setDriveChangedData(newSketchData);


        }
    const implementedPreferences = sketchPreferences.filter((o: PreferenceModel) => driveChangedData.implementsPreferences.includes(o.id))

    return (


        <Dialog open={open} onClose={handleCloseCancel}>
            <DialogTitle> {translations.EditDrive}</DialogTitle>
            <DialogContent>
                <Box sx={{
                    ...filedWrapper,
                    display: 'flex',
                    flexDirection: 'row',
                    minWidth: '35vw'
                }}>


                    <Box sx={{
                        ...filedWrapper,
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '160px',
                        p: '0 0.2em',

                    }}>
                        <Typography align={'center'}
                                    component="legend"><b>{translations.DriveTimes}</b>
                        </Typography>

                        <VerticalHourField input={[driveData.startHour, driveData.finishHour]}
                                           onHoursChange={handleHourChange}
                                           label={translations.Start}/>

                    </Box>
                    <Box sx={{
                        ...filedWrapper,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography align={'center'}
                                    component="legend"><b>{translations.DriveDescription}</b>
                        </Typography>

                        <Box sx={{...filedWrapper}}>
                            <TextField
                                size={'medium'}
                                //sx={{minHeight: '200px'}}
                                margin="dense"
                                id="vehicle-comments-dialog-text-field"
                                //  label={translations.Comments}
                                type="text"
                                fullWidth
                                multiline={true}
                                variant="standard"
                                defaultValue={(driveData?.description || '').replace('  ', ' ')}
                                inputRef={descriptionValueRef}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        handleCloseEdit()
                                    }
                                }}
                            />
                        </Box>
                        <Typography align={'center'} sx={{mt: '1em'}}
                                    component="legend"><b> {implementedPreferences.length === 0 ? (translations.none + ' ') : null} {
                            translations
                                .connectedPreferences
                        }</b>
                        </Typography>
                        <Box id={'connected-preferences'}>
                            {implementedPreferences.map((preference: PreferenceModel, i: number) => (
                                <Card key={i} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: '1em'
                                }}>
                                    <Box sx={{pb: '0.5em'}}>
                                        {preference.Comments}
                                    </Box>

                                    <PreferenceActionButton sx={{width: '100%'}} size={'small'}
                                                       actionType={SketchEditActionEnum.AddToPending}
                                                       text={'      ' + translations.SketchActionAddToPending}
                                                       actionClickHandler={(event: any) => addToPendingClickHandler(event, preference.id)}/>

                                </Card>))}
                        </Box>


                        <Box sx={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '1em',
                            display: 'flex'
                        }}>

                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDelete} aria-label="add" size="large">
                    <Delete/> {translations.Delete}
                </Button>
                <Button id={'vehicle-edit-cancel-button'} onClick={handleCloseCancel}>{translations.Cancel}</Button>
                <Button id={'vehicle-edit-approve-button'} onClick={handleCloseEdit}>{translations.Approve}</Button>
            </DialogActions>
        </Dialog>

    );
}
