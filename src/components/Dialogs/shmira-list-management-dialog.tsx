import * as React from "react";
import { ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translations } from "../../services/translations";
import { Box, Tooltip } from "@mui/material";
import {
  AppConstants,
  ShmiraListRecord,
  ShmiraListStore,
} from "../../store/store.types";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import {
  Archive,
  Delete,
  DeleteForever,
  Edit,
  Unarchive,
} from "@mui/icons-material";
import { ShmiraListManagementActionType } from "../../models/ShmiraListMenuClickActionType.enum";
import { SxProps } from "@mui/system";
import { Styles } from "../../hoc/themes";
import { red } from "@mui/material/colors";
import { ActionsTypes } from "../../store/types.actions";

interface FileUploadProps {
  open: boolean;
  onClose: () => void;
}

export const ShmiraListManagementDialog = (props: FileUploadProps) => {
  const { onClose, open } = props;
  const shmiraListArchive: ShmiraListRecord[] = useSelector(
    (state: ShmiraListStore) => state.shmiraListArchive
  );
  const shmiraListCollection: ShmiraListRecord[] = useSelector(
    (state: ShmiraListStore) => state.shmiraListCollection
  );
  const dispatch = useDispatch();

  const handleCloseCancel = () => {
    onClose();
  };
  const handleActionClick = (
    event: any,
    props: { action: ShmiraListManagementActionType; shmiraListId: string }
  ) => {
    switch (props.action) {
      case ShmiraListManagementActionType.DeleteForever:
        dispatch({
          type: ActionsTypes.DELETE_FOREVER_SIDUR,
          payload: { id: props.shmiraListId },
        });
        break;
      case ShmiraListManagementActionType.MoveToArchive:
        dispatch({
          type: ActionsTypes.ARCHIVE_SIDUR,
          payload: { id: props.shmiraListId },
        });
        break;
      case ShmiraListManagementActionType.MoveToTrash:
        dispatch({
          type: ActionsTypes.DELETE_SHMIRA,
          payload: { id: props.shmiraListId },
        });
        break;
      case ShmiraListManagementActionType.Rename:
        // dispatch({
        //     type: ActionTypes.ARCHIVE_SIDUR,
        //     payload: {id: props.shmiraListId}
        // })
        break;
      case ShmiraListManagementActionType.MoveToActive:
        dispatch({
          type: ActionsTypes.MOVE_TO_ACTIVE_SIDUR,
          payload: { id: props.shmiraListId },
        });
        break;
    }
  };
  const ActionButton = (props: {
    action: ShmiraListManagementActionType;
    shmiraListId: string;
  }) => {
    const buttonBuilder = (
      action: ShmiraListManagementActionType
    ): { text: string; icon: ReactNode } | null => {
      switch (action) {
        case ShmiraListManagementActionType.DeleteForever:
          return {
            text: translations.DeleteForever,
            icon: (
              <DeleteForever
                sx={{
                  ...Styles.smallIcons,
                  color: red,
                }}
              />
            ),
          };
        case ShmiraListManagementActionType.MoveToArchive:
          return {
            text: translations.Archive,
            icon: <Archive sx={Styles.smallIcons} />,
          };
        case ShmiraListManagementActionType.MoveToTrash:
          return {
            text: translations.MoveToTrash,
            icon: <Delete sx={Styles.smallIcons} />,
          };
        case ShmiraListManagementActionType.Rename:
          return {
            text: translations.Rename,
            icon: <Edit sx={Styles.smallIcons} />,
          };
        case ShmiraListManagementActionType.MoveToActive:
          return {
            text: translations.MoveToActive,
            icon: <Unarchive sx={Styles.smallIcons} />,
          };
        default:
          return null;
      }
    };
    const buttonProps = buttonBuilder(props.action);
    return (
      <Tooltip title={buttonProps?.text || ""} placement="top">
        <IconButton
          size="small"
          aria-label="show more"
          onClick={(event) => handleActionClick(event, props)}
          color="inherit"
        >
          {buttonProps?.icon}
        </IconButton>
      </Tooltip>
    );
  };
  const DividingLine = () => (
    <Box
      sx={{
        borderBottom: "solid grey 1px",
        margin: "20px 5px",
        width: "100%",
        height: "5px",
      }}
    />
  );

  const listBoxSx: SxProps = {
    minWidth: "5vw",
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
  };
  const headerSx: SxProps = {
    fontWeight: "bold",
    mb: "15px",
  };
  const oneShmiraListSx: SxProps = {
    minWidth: "20vw",
    display: "flex",
    alignItems: "start",
    flexDirection: "row",
    flexWrap: "wrap",
  };
  //Box sx={headerSx}
  return (
    <div>
      <Dialog open={open} onClose={handleCloseCancel}>
        <DialogTitle> {translations.ManageAllSidrurim}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              minWidth: "40vw",
              display: "flex",
              m: "20px",
              alignItems: "start",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={listBoxSx}>
              <Box sx={headerSx}>{translations.ActiveShmiraListim}</Box>
              {shmiraListCollection.map(
                (shmiraList: ShmiraListRecord, index: number) => (
                  <Box sx={oneShmiraListSx} key={index}>
                    {" "}
                    {shmiraList.Name}
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.MoveToArchive}
                    />
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.MoveToTrash}
                    />
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.Rename}
                    />
                  </Box>
                )
              )}
            </Box>
            <DividingLine />
            <Box sx={listBoxSx}>
              <Box sx={headerSx}>{translations.inArchive}</Box>

              {shmiraListArchive
                .filter((s: ShmiraListRecord) =>
                  s.id.includes(AppConstants.ArchiveIdPrefix)
                )
                .map((shmiraList: ShmiraListRecord, index: number) => (
                  <Box sx={oneShmiraListSx} key={index}>
                    {" "}
                    {shmiraList.Name}
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.MoveToActive}
                    />
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.MoveToTrash}
                    />
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.Rename}
                    />
                  </Box>
                ))}
            </Box>
            <DividingLine />
            <Box sx={listBoxSx}>
              <Box sx={headerSx}>{translations.Trash}</Box>
              {shmiraListArchive
                .filter((s: ShmiraListRecord) =>
                  s.id.includes(AppConstants.deleteIdPrefix)
                )
                .map((shmiraList: ShmiraListRecord, index: number) => (
                  <Box sx={oneShmiraListSx} key={index}>
                    {" "}
                    {shmiraList.Name}
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.MoveToActive}
                    />
                    <ActionButton
                      shmiraListId={shmiraList.id}
                      action={ShmiraListManagementActionType.DeleteForever}
                    />{" "}
                  </Box>
                ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>{translations.Finish}</Button>
          {/*<Button onClick={handleCloseUploaded}>{translations.Approve}</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );
};
