import React from "react";
import { Box, SxProps } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { locations } from "../../services/locations";
import { LanguageUtilities } from "../../services/language-utilities";

import { translations } from "../../services/translations";
import { PendingPreferenceMenu } from "./pending-order-menu";
import { ActionsTypes } from "../../store/types.actions";
import { PreferenceActionButton } from "../buttons/order-action-button";
import { PreferenceModel } from "../../models/Preference.model";
import { ShmiraListRecord, ShmiraListStore } from "../../store/store.types";
import { NightScheduleModel, SketchModel } from "../../models/Sketch.model";
import { ShmiraListBuilderTools } from "../../shmiraListBuilder/shmiraList.tools";
import { Utils } from "../../services/utils";
import { RangeModel } from "../../shmiraListBuilder/models/shmiraList.models";

interface sketchPendingPreferenceProps {
  preference: PreferenceModel;
  isInEdit: boolean;
  Range: RangeModel;
}

const pendingPreferenceMenuId = "sketch-pending-menu-button";
const timeText = (drive: PreferenceModel) =>
  LanguageUtilities.buildBriefText(drive, locations).timeText;
const assingAtText = (drive: PreferenceModel, dates: string[]) =>
  LanguageUtilities.buildBriefAssignText(drive, dates);
export const SketchPendingPreferenceFull = (
  props: sketchPendingPreferenceProps
) => {
  const dispatch = useDispatch();

  const SketchIdInEdit = useSelector(
    (state: ShmiraListStore) => state.SketchIdInEdit
  );
  const shmiraListId = useSelector(
    (state: ShmiraListStore) => state.shmiraListId
  );
  const shmiraListCollection = useSelector(
    (state: ShmiraListStore) => state.shmiraListCollection
  );
  const shmiraListSelected: ShmiraListRecord | undefined =
    shmiraListCollection.find(
      (shmiraListRecord: ShmiraListRecord) =>
        shmiraListRecord.id === shmiraListId
    ) as ShmiraListRecord;

  const sketches: SketchModel[] = useSelector(
    (state: { sketches: SketchModel[] }) => state.sketches
  );
  const sketchInEdit = sketches.find((s) => s.id === SketchIdInEdit);
  let datesThatThisGuardIsAssignedTo: any = [];
  if (sketchInEdit) {
    datesThatThisGuardIsAssignedTo = sketchInEdit.NightSchedule.filter((n) =>
      n.guards.includes(props.preference.id)
    ).map((n) => n.date);
  }
  const assignedText = assingAtText(
    props?.preference,
    datesThatThisGuardIsAssignedTo
  );

  const [pendingPreferenceAnchorEl, setPendingPreferenceAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const handlePendingPreferenceMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    date: string
  ) => {
    const preferenceId = props.preference.id;
    dispatch({
      type: ActionsTypes.CLICKED_ASSIGN_GUARD_TO_DATE,
      payload: {
        id: preferenceId,
        date: date,
      },
    });
    handleShmiraListMenuClose();
  };
  const handleShmiraListMenuClose = () => {
    setPendingPreferenceAnchorEl(null);
  };
  const handlePendingPreferenceMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setPendingPreferenceAnchorEl(event.currentTarget);
  };
  const actionClickHandler = () => {};
  const handlePendingPreferenceClose = () => {
    dispatch({
      type: ActionsTypes.CLICKED_CLOSE_PENDING_ORDER,
      payload: {
        id: props.preference.id,
      },
    });
  };
  let pendingPreferencesActions =
    LanguageUtilities.buildSketchEditActionsArray();
  pendingPreferencesActions = [];
  const preference = props.preference;
  const actionButtonSx: SxProps = {};
  const isShmiraListMenuOpen = Boolean(pendingPreferenceAnchorEl);
  const baseDays = ShmiraListBuilderTools.buildDaysYouCanGuard(preference, {
    DateTo: shmiraListSelected.DateTo,
    DateFrom: shmiraListSelected.DateFrom,
  });

  const nights: NightScheduleModel[] = sketchInEdit?.NightSchedule
    ? sketchInEdit.NightSchedule
    : [];
  const filteredDatesForHalfNight = nights
    .filter(
      (n: NightScheduleModel) =>
        baseDays.includes(n.date) && !(n.guards?.length === 2)
    )
    .map((n) => n.date);
  const filteredDatesForFullNight = nights
    .filter(
      (n: NightScheduleModel) =>
        baseDays.includes(n.date) && (!n.guards || n.guards.length == 0)
    )
    .map((n) => n.date);

  const baseDaysFiltered =
    preference.halfOrFull === "2"
      ? filteredDatesForFullNight
      : filteredDatesForHalfNight;

  const datesForMenu: { timeStamp: string; name: string }[] =
    baseDaysFiltered.map((d) => {
      return {
        timeStamp: d,
        name: Utils.Date.simpleDateFromDateStamp(d),
      };
    });
  const datesForMenuWithWarnings = datesForMenu.map((d) => {
    const mapedDay = { ...d };
    if (datesThatThisGuardIsAssignedTo.length) {
      datesThatThisGuardIsAssignedTo.forEach((d: string) => {
        const gap = Number(d) - Number(mapedDay.timeStamp);
        if (Math.abs(gap) < 7) {
          let textToAdd =
            " (" + translations.guardsAction + " " + Math.abs(gap).toString();

          if (gap < 0) {
            mapedDay.name += textToAdd + " " + translations.daysBefore + ")";
          } else if (gap > 0) {
            mapedDay.name += textToAdd + " " + translations.daysAfter + ")";
          } else if (d === mapedDay.timeStamp) {
            mapedDay.name += " (" + translations.guardsTheSameNight + ")";
          }
        }
      });
    }

    return mapedDay;
  });
  console.log(datesThatThisGuardIsAssignedTo, datesForMenuWithWarnings);
  const noPotentialPlacesWereFound =
    datesForMenuWithWarnings.length === 0
      ? ", " + translations.noPotentialPlacesFound
      : "";
  let additionalDateInfo = "";
  if (noPotentialPlacesWereFound) {
    const Range = props.Range;
    const datesYouCanGuard = ShmiraListBuilderTools.buildDaysYouCanGuard(
      preference,
      Range
    );
    additionalDateInfo =
      translations.CanGuardInDays +
      ": " +
      datesYouCanGuard
        .map((d) => Utils.Date.simpleDateFromDateStamp(d))
        .join(", ");
  }
  return (
    <Box id={"pending-preference"} sx={{ width: "95%" }}>
      <Box
        id={"pending-preference-data"}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "start",
          justifyContent: "start",
          width: "100%",
          p: "0.2em",
          pl: "0.5em",
          pr: "0.5em",
          //      flexGrow: 4,
        }}
      >
        <Typography sx={{}} variant={"subtitle1"}>
          {assignedText +
            " ," +
            LanguageUtilities.renderPassengerTextBrief(preference.halfOrFull) +
            noPotentialPlacesWereFound +
            " " +
            additionalDateInfo}{" "}
        </Typography>
      </Box>

      <Box
        id={"pending-preference-actions"}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "start",
          justifyContent: "start",
          p: "0.2em",
          pl: "0.4em",
          pr: "0.4em",
          //   flexGrow: 4,
        }}
      >
        {[...pendingPreferencesActions].map((n, i: number) => (
          <Box key={i} sx={{ p: "0.5em" }}>
            {" "}
            <PreferenceActionButton
              key={n.action.toString()}
              text={n.name}
              actionType={n.action}
              actionClickHandler={actionClickHandler}
            />
          </Box>
        ))}
        {datesForMenuWithWarnings.length > 0 ? (
          <Box sx={{ p: "0.5em" }}>
            <Button
              sx={{
                pl: "5px",
                pr: "5px",
              }}
              size="medium"
              aria-label="show more"
              aria-controls={pendingPreferenceMenuId}
              aria-haspopup="true"
              onClick={handlePendingPreferenceMenuOpen}
              variant={"contained"}
            >
              &nbsp; {translations.assignIn}
            </Button>
          </Box>
        ) : null}

        <Box sx={{ p: "0.5em" }}>
          <Button
            size="medium"
            aria-label="show more"
            aria-controls={pendingPreferenceMenuId}
            aria-haspopup="true"
            onClick={handlePendingPreferenceClose}
            variant={"contained"}
          >
            {" "}
            {translations.close}
          </Button>
        </Box>
      </Box>

      <PendingPreferenceMenu
        PendingPreferenceMenuAnchor={pendingPreferenceAnchorEl}
        PendingPreferenceMenuId={pendingPreferenceMenuId}
        isPendingPreferenceMenuOpen={isShmiraListMenuOpen}
        handlePendingPreferenceMenuClick={handlePendingPreferenceMenuClick}
        handlePendingPreferenceMenuClose={handleShmiraListMenuClose}
        dates={datesForMenuWithWarnings}
      />
    </Box>
  );
};
