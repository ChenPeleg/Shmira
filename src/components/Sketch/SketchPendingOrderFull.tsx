import React from 'react'
import {Box, SxProps} from '@mui/system';
import {useDispatch} from 'react-redux';
import {Button, Typography} from '@mui/material';
import {locations} from '../../services/locations';
import {LanguageUtilities} from '../../services/language-utilities';
import {PreferenceModel} from '../../models/Preference.model';
import {ActionsTypes} from '../../store/types.actions';
import {PendingPreferenceMenu} from './pending-preference-menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import {PreferenceActionButton} from '../buttons/preference-action-button';
import {translations} from '../../services/translations';
import {SketchEditActionEnum} from '../../models/SketchEditAction.enum';


interface sketchPendingPreferenceProps {
    preference: PreferenceModel,
    isInEdit: boolean
}


const pendingPreferenceMenuId = 'sketch-pending-menu-button';
const timeText = (drive: PreferenceModel) => LanguageUtilities.buildBriefText(drive, locations).timeText;
const driverAndLocation = (drive: PreferenceModel) => LanguageUtilities.buildBriefText(drive, locations).driverAndLocation;
export const SketchPendingPreferenceFull = (props: sketchPendingPreferenceProps) => {
    const dispatch = useDispatch();
    const [pendingPreferenceAnchorEl, setPendingPreferenceAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const handlePendingPreferenceMenuClick = (event: React.MouseEvent<HTMLElement>, clickAction: SketchEditActionEnum) => {
        const preferenceId = props.preference.id
        switch (clickAction) {

            case SketchEditActionEnum.AddToPending:
                dispatch({
                    type: ActionsTypes.CLONE_SIDUR,
                    payload: {id: preferenceId}
                })
                break;
            case SketchEditActionEnum.RemoveFromPending:
                dispatch({
                    type: ActionsTypes.CLICKED_REMOVE_PENDING_ORDER,
                    payload: {id: preferenceId}
                })
                break;


            default:
        }
        handleShmiraListMenuClose()
    };
    const handleShmiraListMenuClose = () => {
        setPendingPreferenceAnchorEl(null);
    };
    const handlePendingPreferenceMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setPendingPreferenceAnchorEl(event.currentTarget);
    };
    const actionClickHandler = () => {

    }
    const handlePendingPreferenceClose = () => {
        dispatch({
            type: ActionsTypes.CLICKED_CLOSE_PENDING_ORDER,
            payload: {
                id: props.preference.id
            }
        })
    }
    let pendingPreferencesActions = LanguageUtilities.buildSketchEditActionsArray();
    pendingPreferencesActions = [];
    const preference = props.preference;
    const actionButtonSx: SxProps = {}
    const isShmiraListMenuOpen = Boolean(pendingPreferenceAnchorEl);

    return ((<Box id={'pending-preference'}>
            <Box id={'pending-preference-data'} sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'start',
                justifyContent: 'start',
                p: '0.2em',
                pl: '0.4em',
                pr: '0.4em',
                flexGrow: 4,

            }}>

                <Typography
                    variant={'subtitle1'}>{preference.Comments + ', ' + LanguageUtilities.renderPassengerText(preference.passengers)}  </Typography>

            </Box>

            <Box id={'pending-preference-actions'} sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'start',
                justifyContent: 'start',
                p: '0.2em',
                pl: '0.4em',
                pr: '0.4em',
                flexGrow: 4,

            }}>


                {[...pendingPreferencesActions].map((n, i: number) => (
                    <Box key={i} sx={{p: '0.5em'}}> <PreferenceActionButton key={n.action.toString()} text={n.name} actionType={n.action}
                                                                       actionClickHandler={actionClickHandler}/>
                    </Box>))}
                <Box sx={{p: '0.5em'}}>
                    <Button
                        size="medium"
                        aria-label="show more"
                        aria-controls={pendingPreferenceMenuId}
                        aria-haspopup="true"
                        onClick={(event) => handlePendingPreferenceMenuClick(event, SketchEditActionEnum.RemoveFromPending)}
                        variant={'contained'}
                    > {translations.SketchActionRemove}
                    </Button>
                </Box>
                <Box sx={{p: '0.5em'}}>
                    <Button sx={{
                        pl: '5px',
                        pr: '5px'
                    }}
                            size="medium"
                            aria-label="show more"
                            aria-controls={pendingPreferenceMenuId}
                            aria-haspopup="true"
                            onClick={handlePendingPreferenceMenuOpen}
                            variant={'contained'}
                    >&nbsp; {translations.moerActions}
                        <MoreIcon sx={{
                            pl: 0,
                            pr: 0,
                            mr: 0,
                            ml: 0
                        }}/>
                    </Button>
                </Box>
                <Box sx={{p: '0.5em'}}>
                    <Button
                        size="medium"
                        aria-label="show more"
                        aria-controls={pendingPreferenceMenuId}
                        aria-haspopup="true"
                        onClick={handlePendingPreferenceClose}
                        variant={'contained'}
                    > {translations.close}
                    </Button>
                </Box>


            </Box>
            <PendingPreferenceMenu PendingPreferenceMenuAnchor={pendingPreferenceAnchorEl} PendingPreferenceMenuId={pendingPreferenceMenuId}
                              isPendingPreferenceMenuOpen={isShmiraListMenuOpen}
                              handlePendingPreferenceMenuClick={handlePendingPreferenceMenuClick} handlePendingPreferenceMenuClose={handleShmiraListMenuClose}/>
        </Box>)

    )

}
