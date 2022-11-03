import * as React from "react";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { translations } from "../../services/translations";
import { Box, Card, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { NightScheduleModel, SketchModel } from "../../models/Sketch.model";
import { useDispatch, useSelector } from "react-redux";
import { SketchEditActionEnum } from "../../models/SketchEditAction.enum";
import { ActionsTypes } from "../../store/types.actions";
import { ShmiraListStore } from "../../store/store.types";
import { PreferenceActionButton } from "../buttons/order-action-button";
import { PreferenceModel } from "../../models/Preference.model";
import { Utils } from "../../services/utils";

interface SketchDriveEditDialogProps {
  open: boolean;
  nightData: NightScheduleModel;
  onDelete: (night: NightScheduleModel) => void;
  onClose: (vehicleUpdate: NightScheduleModel | null) => void;
}

export const ListSketchDriveEditDialog = (
  props: SketchDriveEditDialogProps
) => {
  const { onClose, onDelete, open, nightData } = props;
  // const vehicleId = sketchDriveData.vehicleId
  const thisNightData = nightData;
  const dispatch = useDispatch();
  const SketchIdInEdit = useSelector(
    (state: ShmiraListStore) => state.SketchIdInEdit
  );
  const sketches: SketchModel[] = useSelector(
    (state: { sketches: SketchModel[] }) => state.sketches
  );
  const sketchInEdit: SketchModel | null =
    sketches.find((sketch: SketchModel) => sketch.id === SketchIdInEdit) ||
    null;

  const night = nightData;
  const preferences = useSelector(
    (state: { preferences: PreferenceModel[] }) => state.preferences
  );

  const nightDateText = Utils.Date.simpleDateFromDateStamp(night.date);
  const dayOfWeek = Utils.Date.getDatOfWeekTextFromTimeStamp(night.date);
  //const optionalGuardsArr = preferences.filter(g => night.optionalGuards.includes(g.id)).map(g => g.guardName);
  const guardsRaw: (PreferenceModel | undefined)[] = night.guards.map(
    (guardId) => preferences.find((p) => p.id === guardId)
  );

  const sketchPreferences = preferences;
  const [nightChangedData, setNightChangedData] = useState<NightScheduleModel>({
    ...nightData,
  });

  const descriptionValueRef: any = useRef("");
  const filedWrapper: SxProps = {
    width: "230px",
  };
  const handleCloseCancel = () => {
    onClose(null);
  };

  const handleCloseEdit = (): void => {
    const editedData: NightScheduleModel | null = { ...nightChangedData };
    if (descriptionValueRef?.current?.value) {
    }
    onClose(editedData);
  };

  const addToPendingClickHandler = (event: Event, preferenceId: string) => {
    dispatch({
      type: ActionsTypes.REMOVE_GUARD_FROM_SKETCH_NIGHT,
      payload: {
        preferenceId,
        sketchNightId: thisNightData.id,
      },
    });
    const newNight = { ...nightChangedData };
    newNight.guards = newNight.guards.filter((g) => g !== preferenceId);
    setNightChangedData(newNight);
  };

  const implementedPreferences = nightChangedData.guards
    ? sketchPreferences.filter((o: PreferenceModel) =>
        nightChangedData.guards.includes(o.id)
      )
    : [];

  return (
    <Dialog open={open} onClose={handleCloseCancel}>
      <DialogTitle>
        {" "}
        {translations.Nesia + " " + nightDateText + " " + dayOfWeek}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            ...filedWrapper,
            display: "flex",
            flexDirection: "row",
            minWidth: "270px",
            // minWidth: '35vw'
          }}
        >
          <Box
            sx={{
              ...filedWrapper,
              display: "flex",
              flexDirection: "column",
              minWidth: "250px",
            }}
          >
            <Typography align={"center"} sx={{ mt: "1em" }} component="legend">
              <b>
                {" "}
                {implementedPreferences.length === 0
                  ? translations.none + " "
                  : null}{" "}
                {translations.guards}
              </b>
            </Typography>
            <Box id={"connected-preferences"}>
              {implementedPreferences.map(
                (preference: PreferenceModel, i: number) => (
                  <Card
                    key={i}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      p: "1em",
                      mb: "1em",
                    }}
                  >
                    <Box
                      sx={{
                        pb: "0.5em",
                        minWidth: "150px",
                      }}
                    >
                      {preference.guardName}
                    </Box>

                    <PreferenceActionButton
                      size={"small"}
                      sx={{ alignSelf: "flex-end" }}
                      actionType={SketchEditActionEnum.AddToPending}
                      text={"      " + translations.removeFromThisNight}
                      actionClickHandler={(event: any) =>
                        addToPendingClickHandler(event, preference.id)
                      }
                    />
                  </Card>
                )
              )}
            </Box>

            <Box
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1em",
                display: "flex",
              }}
            ></Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {/*<Button onClick={handleCloseDelete} aria-label="add" size="large">*/}
        {/*    <Delete/> {translations.Delete}*/}
        {/*</Button>*/}
        {/*<Button id={'vehicle-edit-cancel-button'} onClick={handleCloseCancel}>{translations.Cancel}</Button>*/}
        <Button id={"vehicle-edit-approve-button"} onClick={handleCloseEdit}>
          {translations.Approve}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
