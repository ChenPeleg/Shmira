import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {PreferenceModel} from '../../models/Preference.model';
import {SketchPendingPreferenceBrief} from './SketchPendingPreferenceBrief';
import {ActionsTypes} from '../../store/types.actions';
import {SxProps} from '@mui/system';
import {Box, Card, Collapse} from '@mui/material';
import {SketchPendingPreferenceFull} from './SketchPendingPreferenceFull';


interface sketchPendingPreferenceProps {
    preference: PreferenceModel,
    isInEdit: boolean
}

export const SketchPendingPreference = (props: sketchPendingPreferenceProps) => {

    const [inHover, setInHover] = useState(false);
    const onMouseOver = () => {
        setInHover(!props.isInEdit)
    };
    const onMouseOut = () => {
        setInHover(false)
    };
    const dispatch = useDispatch();
    const cardClickHandler = (event: MouseEvent) => {
        dispatch({
            type: ActionsTypes.CLICKED_PENDING_ORDER,
            payload: {
                id: props.preference.id
            }
        })
    }


    const briefPreferenceStyle: SxProps = props.isInEdit ? {} : {
        cursor: 'pointer',
        bgcolor: {
            transition: ' ease-in-out 100ms',
        },


    }
    const preference = props.preference;
    return (<>
            <Box sx={{display: 'flex'}}>
                <Card onMouseOver={onMouseOver}
                      onMouseOut={onMouseOut} elevation={inHover ? 7 : 2} sx={{
                    m: '0.2em',
                    mb: '0.3em',
                    minHeight: '10vh',
                    minWidth: '30vw',
                    maxWidth: '50vw',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    justifyContent: 'start',
                }}
                      onClick={(event: any) => !props.isInEdit ? cardClickHandler(event) : null}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'start'
                    }}>
                        <div tabIndex={0}>
                            <Box sx={{

                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                mr: '0.6em',
                                ml: '0.6em',
                                mt: '0'
                            }}>
                                <SketchPendingPreferenceBrief isInEdit={props.isInEdit} preference={props.preference}/>


                            </Box>
                        </div>


                        <Collapse in={props.isInEdit} unmountOnExit>

                            <SketchPendingPreferenceFull isInEdit={props.isInEdit} preference={preference}/>

                        </Collapse>
                    </Box>

                </Card>


            </Box>
            <Box sx={{}}/>  </>


    )

}
