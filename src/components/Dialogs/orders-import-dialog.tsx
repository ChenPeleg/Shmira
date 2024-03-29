import * as React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translations } from "../../services/translations";
import { useDispatch } from "react-redux";
import { ActionsTypes } from "../../store/types.actions";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";

interface FileUploadProps {
  open: boolean;
  onClose: () => void;
}

export const PreferenceImportDialog = (props: FileUploadProps) => {
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const valueRef: any = useRef("");
  const handleCloseCancel = () => {
    onClose();
  };
  const handleCloseImportPreference = () => {
    if (valueRef.current.value && valueRef.current.value.length) {
      dispatch({
        type: ActionsTypes.IMPORT_ORDERS_AS_TEXT,
        payload: { importedPreferences: valueRef.current.value },
      });
    }
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseCancel}>
        <DialogTitle> {translations.ImportPreferences}</DialogTitle>
        <Box>
          {/*<DialogContentText> {translations.PastHere}</DialogContentText>*/}
        </Box>

        <Typography />
        <DialogContent>
          <TextField
            id={"import-preferences-dialog-text-field"}
            autoFocus
            sx={{
              width: "200px",
            }}
            label={translations.PastHere}
            type="text"
            fullWidth
            multiline={true}
            variant="standard"
            inputRef={valueRef}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleCloseCancel();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            id={"preferences-import-cancel-button"}
            onClick={handleCloseCancel}
          >
            {translations.Finish}
          </Button>
          <Button
            id={"preferences-import-approve-button"}
            onClick={handleCloseImportPreference}
          >
            {translations.Approve}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
