import React, {useEffect, useState} from 'react'
import {Box} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import {Collapse, Divider, Typography} from '@mui/material';
import {DriveModel, SketchModel, VehicleScheduleModel} from '../../models/Sketch.model';
import {VehicleModel} from '../../models/Vehicle.model';
import {SketchDrive} from './SketchDrive';
import {ListSketchDriveEditDialog} from '../Dialogs/list-sketch-drive-edit-dialog';
import {ActionsTypes} from '../../store/types.actions';
import {ShmiraListStore} from '../../store/store.types';
import {SketchNoSketchMessage} from './sketch-no-sketch-message';

import {TransitionGroup} from 'react-transition-group';
import {SketchPendingPreferences} from './SketchPendeingOrders';

const MOckDrive = {
    'id': '0',
    'flexibilityByDays': [
        '-30',
        '10'
    ],
    'halfOrFull': '1',
    'location': '6',
    'TypeOfDrivePreference': '2',
    'optionalGuardDaysByDates': '09:45',
    'Comments': 'ורד תשמח לשעה במשגב, גמישה עד 1320. לא דחוף, רק אם מסתדר.',
    'guardName': 'ורד',
    'finishHour': '10:00',
    'implementsPreferences': [
        '104'
    ],
    'description': ''
}

export const Sketch = () => {
    const dispatch = useDispatch()

    const SketchIdInEdit = useSelector((state: ShmiraListStore) => state.SketchIdInEdit);

    const vehicles = useSelector((state: { vehicles: VehicleModel[] }) => state.vehicles);
    const sketches: SketchModel[] = useSelector((state: { sketches: SketchModel[] }) => state.sketches);
    const [sketchDriveEditOpen, setSketchDriveEditOpen] = React.useState(false);
    const [sketchMoreAnchorEl, setSketchMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [chosenDrive, setChosenDrive] = useState<{ drive: DriveModel, vehicleId: string } | null>(null);
    const [mock, setMock] = useState<boolean>(false)
    const handleSketchDriveEditDelete = (sketchDriveData: { drive: DriveModel, vehicleId: string }) => {
        setSketchDriveEditOpen(false);
        setChosenDrive(null);
        const value = sketchDriveData.drive
        dispatch({
            type: ActionsTypes.DELETE_SKETCH_DRIVE,
            payload: {
                value
            }
        })

    }


    const handleSketchDriveEditClose = (value: DriveModel | null) => {
        setSketchDriveEditOpen(false);
        setChosenDrive(null);
        if (value) {

            dispatch({
                type: ActionsTypes.UPDATE_SKETCH_DRIVE,
                payload: {
                    value
                }
            })


        }
    };
    useEffect(() => {
        if (!mock) {
            setTimeout(_ => {

            }, 2000)
        }
    })
    const sketchDriveClickHandler = (event: React.MouseEvent<HTMLElement>, drive: DriveModel, vehicleId: string) => {
        setChosenDrive({
            drive: drive,
            vehicleId: vehicleId
        })
        setSketchDriveEditOpen(true);
    };

    const getVehicleNameFromId = (vehicleId: string): string | null => {
        return vehicles.find(v => v.id === vehicleId)?.vehicleName || vehicleId
    }

    const sketchInEdit: SketchModel | null = sketches.find((sketch: SketchModel) => sketch.id === SketchIdInEdit) || null;


    return (
        sketchInEdit ? (
            <Box>
                <Box id={'sketch-wrapper-row'} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'start',
                    mb: '10px',
                    justifyContent: 'center',
                    minWidth: '30vw',
                }}>
                    <SketchPendingPreferences pendingPreferences={sketchInEdit.unassignedPreferences}/>


                    {sketchInEdit.vehicleSchedules.map((vehicleTimeTable: VehicleScheduleModel, i: number) => {
                        return (<Box key={i}>
                            <Box key={i} id={'vehicle-column'} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                m: '15px',
                                mt: '0px',
                                justifyContent: 'start',
                                minWidth: '6vw',
                                minHeight: '60vh',
                            }}> <Typography variant={'h6'}>{getVehicleNameFromId(vehicleTimeTable.VehicleId)}  </Typography>
                                <TransitionGroup>
                                    {vehicleTimeTable.drives.map((drive: DriveModel, i: number) => {
                                        return (
                                            <Collapse key={i}>
                                                <SketchDrive
                                                    sketchDriveClick={(event: React.MouseEvent<HTMLElement>, drive: DriveModel) => sketchDriveClickHandler(event, drive, vehicleTimeTable.id)}
                                                    key={i} drive={drive} prevoiusDrive={vehicleTimeTable.drives[i - 1] || null}/>
                                            </Collapse>

                                        )

                                    })}
                                </TransitionGroup>

                            </Box>
                            <Divider orientation="vertical" variant={'fullWidth'} sx={{borderRight: '2px solid black '}} flexItem/>
                        </Box>)


                    })}

                </Box>
                {chosenDrive ?
                    <ListSketchDriveEditDialog vehicleId={'1'} open={sketchDriveEditOpen} onClose={handleSketchDriveEditClose}
                                               sketchDriveData={chosenDrive}
                                               onDelete={handleSketchDriveEditDelete}/> : null}


            </Box>) : <SketchNoSketchMessage/>)


}
