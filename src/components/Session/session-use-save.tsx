import {Box, Button} from '@mui/material';
import {translations} from '../../services/translations';
import {useDispatch, useSelector} from 'react-redux';
import {SessionModel} from '../../store/store.types';
import {RenameDialog} from '../Dialogs/rename-dialog';
import {useState} from 'react';
import {ActionsTypes} from '../../store/types.actions';


export const SessionUseSave = () => {
    const [isRenameDialogOpen, setIsRenameDialogOpen] = useState<boolean>(false)
    const session: SessionModel = useSelector((state: { currentSessionState: SessionModel }) => state.currentSessionState);
    const userName = session.userName;
    const dispatch = useDispatch()
    const handleClose = (value: string | null) => {
        setIsRenameDialogOpen(false);
        if (value && value.trim()?.length > 1) {
            dispatch({
                type: ActionsTypes.CHANGE_USER_NAME,
                payload: {value: value.trim()}
            })
        }
    }

    return (<Box sx={{
        mr: '2em',
        ml: '2em'
    }}> {!userName || userName === '' ? (
        <Button variant={'contained'} onClick={(e) => setIsRenameDialogOpen(true)}
                color={'secondary'}>  {translations.SaveToThisComputer}</Button>
    ) : translations.hello + ' ' + userName}
        <RenameDialog customType={'EnterUserName'} open={isRenameDialogOpen} selectedValue={''} onClose={handleClose}/>
    </Box>)
}
