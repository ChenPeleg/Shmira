import * as React from 'react';
import {ChangeEvent, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {translations} from '../../services/translations';
import {useDispatch, useSelector} from "react-redux";
import {ActionsTypes} from "../../store/types.actions";
import {SxProps} from "@mui/system";
import {ShmiraListStore} from "../../store/store.types";
import {LinearLoading} from "../Loading/linear-loading";
import {Box} from "@mui/material";
import {Styles} from "../../hoc/themes";
import {Check, ErrorOutline} from "@mui/icons-material";

interface ImportSheetsProps {
    open: boolean;
    selectedValue: string;
    customType?: 'EnterUserName'
}

export const ImportSheetsDialog = (props: ImportSheetsProps) => {

    const {
        selectedValue,
        open
    } = props;
    const importSheetCheckStatus =    useSelector((state: ShmiraListStore ) => state.currentSessionState.importSheetCheckStatus );

    const dispatch = useDispatch();
    const [isWaitingForValidation, setIsWaitingForValidation ] = useState( false)
    const valueRef: any = useRef('')
    const handleCloseCancel = () => {
        setIsWaitingForValidation(false);
        dispatch({type: ActionsTypes.CLOSE_IMPORT_SHEETS_MODAL})
    };
    const handleCloseRename = () => {
        // onClose(valueRef.current.value || selectedValue);
    };
    const handleClearData = () => {
        valueRef.current.value = '';
        setIsWaitingForValidation(false);
        dispatch({type: ActionsTypes.OPEN_IMPORT_SHEETS_MODAL})

    };
    const dialogStyle: SxProps = {
        minWidth: "35vw",
        minHeight: '50vh'
    }
    const handlePasting = (event: ChangeEvent & {target: { value: string }}) => {

        const data = event.target.value ;
        setIsWaitingForValidation(true);
        setTimeout (()=> {
        dispatch({type: ActionsTypes.IMPORT_SHEETS_DATA_PASTE, payload: data})
        }, 1000)
    }
    const headerText =  translations.ImportFromSheets  ;
    const inputLabel = translations.PastHereSheet  ;
    const disableText = isWaitingForValidation   ;
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
                        minRows={importSheetCheckStatus ? 2 : 7}
                        maxRows={importSheetCheckStatus ? 3 : 9}
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
                        disabled={disableText}
                    />
                    {(isWaitingForValidation && !importSheetCheckStatus) ? <Box id={'waiting-for-validation'}>
                        <Box sx={{padding: '20px', ...Styles.flexRow }}>
                            {translations.ImportFromSheetsPastValidating}
                        </Box>

                        <LinearLoading timeToFinish={200}/>
                    </Box> : null}

                    {importSheetCheckStatus === 'OK' ?  <Box sx={{padding: '20px', ...Styles.flexColumn,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }}>
                        <Box sx={{   ...Styles.flexRow , marginBottom : '20px'}}>
                            <Box sx={{padding: '0 20px 0 20px '}}>
                                <Check  sx={{fontSize: '30px', color : 'green'}} />
                            </Box>
                            {translations.ImportFromSheetsPastSuccess}

                        </Box>

                        <Button disabled={!importSheetCheckStatus} id={'shmiraList-rename-approve-button'} variant={'contained'}
                                onClick={handleCloseRename}>{translations.ImportFromSheetsApprove}</Button>
                    </Box>  : null}

                    {importSheetCheckStatus === 'FAIL' ?  <Box sx={{padding: '20px', ...Styles.flexColumn,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }}>
                        <Box sx={{   ...Styles.flexRow , marginBottom : '20px'}}>
                            <Box sx={{padding: '0 20px 0 20px '}}>
                                <ErrorOutline  sx={{fontSize: '30px', color : 'red'}} />
                            </Box>
                            {translations.ImportFromSheetsPastFail}

                        </Box>

                        <Button disabled={!importSheetCheckStatus} id={'import-approve-btn'} variant={'contained'}
                                onClick={handleClearData}>{translations.Approve}</Button>
                    </Box>  : null}



                </DialogContent>
                <DialogActions>
                    <Button id={'shmiraList-rename-cancel-button'}
                            onClick={handleCloseCancel}>{translations.Cancel}</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
