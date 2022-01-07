import React, {useEffect, useState} from 'react'
import {Box} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import {Collapse, Divider} from '@mui/material';
import {NightScheduleModel, SketchModel} from '../../models/Sketch.model';
import {VehicleModel} from '../../models/Vehicle.model';
import {SketchNight} from './sketch-night';
import {ActionsTypes} from '../../store/types.actions';
import {ShmiraListStore} from '../../store/store.types';
import {SketchNoSketchMessage} from './sketch-no-sketch-message';

import {TransitionGroup} from 'react-transition-group';
import {SketchPendingPreferences} from './SketchPendeingOrders';
import {ListSketchDriveEditDialog} from '../Dialogs/list-sketch-drive-edit-dialog';

const MOckDrive = {
    'id': '0',
    'flexibilityByDays': [
        '-30',
        '10'
    ],
    'halfOrFull': '1',
    'location': '6',
    'TypeOfInfoPreference': '2',
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
    const [chosenNight, setChosenNight] = useState<NightScheduleModel | null>(null);
    const [mock, setMock] = useState<boolean>(false)
    const handleSketchDriveEditDelete = (night: NightScheduleModel) => {
        setSketchDriveEditOpen(false);
        setChosenNight(null);
        const value = night
        dispatch({
            type: ActionsTypes.DELETE_SKETCH_DRIVE,
            payload: {
                value
            }
        })

    }


    const handleSketchDriveEditClose = (value: NightScheduleModel | null) => {
        setSketchDriveEditOpen(false);
        setChosenNight(null);
        if (value) {

            dispatch({
                type: ActionsTypes.UPDATE_SKETCH_NIGHT,
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
    const sketchNightClickHandler = (event: React.MouseEvent<HTMLElement>, night: NightScheduleModel) => {
        setChosenNight(night)
        setSketchDriveEditOpen(true);
    };

    const getVehicleNameFromId = (vehicleId: string): string | null => {
        return vehicles.find(v => v.id === vehicleId)?.vehicleName || vehicleId
    }

    const sketchInEdit: SketchModel | null = sketches.find((sketch: SketchModel) => sketch.id === SketchIdInEdit) || null;


    return (
        sketchInEdit ? (
            <Box id={'sketch-wrapper-row'} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'start',
                maxHeight: '75vh',
                // minWidth: '30vw',
            }}>
                <Box sx={{
                    maxHeight: '76vh',
                    maxWidth: '25vw',
                    overflowY: 'auto',
                    direction: 'ltr'
                }}>
                    <SketchPendingPreferences pendingPreferences={sketchInEdit.unassignedPreferences}/>
                </Box>
                <Box id={'sketch-wrapper-column'} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'start',
                    mb: '10px',
                    p: '2px',
                    justifyContent: 'center',
                    width: '75vw',
                    maxHeight: '80vh',
                    columnGap: '20px',
                    overflowY: 'auto'
                    // minWidth: '30vw',
                }}>


                    {sketchInEdit.NightSchedule.map((night: NightScheduleModel, i: number) => {
                        return (<Box key={i}>
                            <Box key={i} id={'vehicle-column'} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'stretch',
                                m: '1px',
                                justifyContent: 'start',
                                minWidth: '6vw',
                            }}>
                                <TransitionGroup>
                                    {

                                        <Collapse key={i}>
                                            <SketchNight
                                                sketchDriveClick={(event: React.MouseEvent<HTMLElement>, night: NightScheduleModel) => sketchNightClickHandler(event, night)}
                                                key={i} night={night}/>
                                        </Collapse>


                                    }
                                </TransitionGroup>

                            </Box>
                            <Divider orientation="vertical" variant={'fullWidth'} sx={{borderRight: '2px solid black '}} flexItem/>
                        </Box>)


                    })}

                </Box>

                {sketchDriveEditOpen && chosenNight ?
                    <ListSketchDriveEditDialog nightData={chosenNight as NightScheduleModel} onClose={handleSketchDriveEditClose}
                                               onDelete={handleSketchDriveEditDelete} key={'2'}
                                               open={sketchDriveEditOpen}/> : null}

            </Box>) : <SketchNoSketchMessage/>)


}
