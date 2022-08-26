import * as React from 'react';
import {useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {translations} from '../../services/translations';
import {useDispatch} from "react-redux";
import {types} from "util";
import {ActionsTypes} from "../../store/types.actions";

interface ImportSheetsProps {
    open: boolean;
    selectedValue: string;
    customType?: 'EnterUserName'
}

export const ImportSheetsDialog = (props: ImportSheetsProps) => {
    // const [open, setOpen] = React.useState(false);
    const {
        selectedValue,
        open
    } = props;
    const dispatch = useDispatch()
    const valueRef: any = useRef('')
    const handleCloseCancel = () => {
         dispatch({type : ActionsTypes.CLOSE_IMPORT_SHEETS_MODAL})
    };
    const handleCloseRename = () => {
       // onClose(valueRef.current.value || selectedValue);
    };

    const headerText = props.customType === 'EnterUserName' ? translations.NameWhatIsMyName : translations.Rename
    const inputLabel = props.customType === 'EnterUserName' ? translations.Name : translations.NewName

    return (
        <div>

            <Dialog open={open} onClose={handleCloseCancel}>
                <DialogTitle> {headerText}</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id={'shmiraList-rename-dialog-text-field'}
                        label={inputLabel}
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={selectedValue}
                        inputRef={valueRef}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                handleCloseRename()
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button id={'shmiraList-rename-cancel-button'} onClick={handleCloseCancel}>{translations.Cancel}</Button>
                    <Button id={'shmiraList-rename-approve-button'} onClick={handleCloseRename}>{translations.Approve}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
