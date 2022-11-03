import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { translations } from "../../services/translations";
import { useDispatch, useSelector } from "react-redux";
import { ActionsTypes } from "../../store/types.actions";
import { StyledToggleButtonGroup } from "./styled-toggle-button";
import { SxProps } from "@mui/system";
import { ShmiraListRecord, ShmiraListStore } from "../../store/store.types";

export const OneOrTwoToggleButtons = () => {
  const shmiraListId = useSelector(
    (state: ShmiraListStore) => state.shmiraListId
  );
  const shmiraListCollection = useSelector(
    (state: ShmiraListStore) => state.shmiraListCollection
  );
  const shmiraListSelected = shmiraListCollection.find(
    (shmiraListRecord: ShmiraListRecord) => shmiraListRecord.id === shmiraListId
  ) as ShmiraListRecord;
  const isOneGuardForNight = shmiraListSelected.isOneGuardForNight;
  const alignment = isOneGuardForNight ? "one" : "two";
  const dispatch = useDispatch();
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    dispatch({
      type: ActionsTypes.UPDATE_ONE_OR_TWO_GUARDS,
      payload: {
        value: newAlignment,
      },
    });
  };
  const customStl: SxProps = { borderRadius: "20px" };
  return (
    <StyledToggleButtonGroup
      value={alignment}
      exclusive
      sx={customStl}
      dir={"ltr"}
      onChange={handleChange}
    >
      <ToggleButton sx={customStl} value={"one"}>
        {translations.oneGuard}
      </ToggleButton>
      <ToggleButton sx={customStl} value={"two"}>
        {" "}
        {translations.twoGuards}{" "}
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};
