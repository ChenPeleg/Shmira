import * as React from "react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translations } from "../../services/translations";

interface RenameProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string | null) => void;
  customType?: "EnterUserName";
}

export const RenameDialog = (props: RenameProps) => {
  // const [open, setOpen] = React.useState(false);
  const { onClose, selectedValue, open } = props;
  const valueRef: any = useRef("");
  const handleCloseCancel = () => {
    onClose(null);
  };
  const handleCloseRename = () => {
    onClose(valueRef.current.value || selectedValue);
  };

  const headerText =
    props.customType === "EnterUserName"
      ? translations.NameWhatIsMyName
      : translations.Rename;
  const inputLabel =
    props.customType === "EnterUserName"
      ? translations.Name
      : translations.NewName;

  return (
    <div>
      <Dialog open={open} onClose={handleCloseCancel}>
        <DialogTitle> {headerText}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id={"shmiraList-rename-dialog-text-field"}
            label={inputLabel}
            type="text"
            fullWidth
            variant="standard"
            defaultValue={selectedValue}
            inputRef={valueRef}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleCloseRename();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            data-testid={"shmiraList-rename-cancel-button"}
            id={"shmiraList-rename-cancel-button"}
            onClick={handleCloseCancel}
          >
            {translations.Cancel}
          </Button>
          <Button
            data-testid={"shmiraList-rename-approve-button"}
            id={"shmiraList-rename-approve-button"}
            onClick={handleCloseRename}
          >
            {translations.Approve}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
