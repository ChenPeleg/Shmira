import * as React from 'react';
import {ChangeEvent, useRef} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {translations} from '../../services/translations';
import {useDispatch, useSelector} from "react-redux";
import {types} from "util";
import {ActionsTypes} from "../../store/types.actions";
import {SxProps} from "@mui/system";
import {ShmiraListStore} from "../../store/store.types";

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
    const canImportSheetModalOpen =    useSelector((state: ShmiraListStore ) => state.currentSessionState.canImportSheetModalOpen );

    const dispatch = useDispatch();
    const valueRef: any = useRef('')
    const handleCloseCancel = () => {
        dispatch({type: ActionsTypes.CLOSE_IMPORT_SHEETS_MODAL})
    };
    const handleCloseRename = () => {
        // onClose(valueRef.current.value || selectedValue);
    };
    const dialogStyle: SxProps = {
        minWidth: "35vw",
        minHeight: '50vh'
    }
    const handlePasting = (event: ChangeEvent) => {
        // @ts-ignore
        const data = event.target.value as string ;
        dispatch({type: ActionsTypes.IMPORT_SHEETS_DATA_PAST, payload: data})
    }
    const headerText =  translations.ImportFromSheets  ;
    const inputLabel = translations.PastHereSheet  ;
    return (
        <div>

            <Dialog  open={open} onClose={handleCloseCancel}>
                <DialogTitle> {headerText}</DialogTitle>
                <DialogContent sx={dialogStyle}>

                    <TextField
                        sx={{
                            width:
                                '100%',
                        }}
                        autoFocus
                        margin="dense"
                        id={'shmiraList-rename-dialog-text-field'}
                        label={inputLabel}
                        type="text"
                        minRows={canImportSheetModalOpen ? 2 : 7}
                        maxRows={canImportSheetModalOpen ? 3 : 9}
                        multiline
                        fullWidth
                        variant="outlined"
                        defaultValue={''}
                        inputRef={valueRef}
                        onChange={handlePasting}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                handleCloseRename()
                            }
                        }}
                    />
                    {canImportSheetModalOpen ? translations.ImportFromSheetsPastSuccess : null}
                </DialogContent>
                <DialogActions>
                    <Button id={'shmiraList-rename-cancel-button'}
                            onClick={handleCloseCancel}>{translations.Cancel}</Button>
                    <Button disabled={!canImportSheetModalOpen} id={'shmiraList-rename-approve-button'} variant={'contained'}
                            onClick={handleCloseRename}>{translations.Approve}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
