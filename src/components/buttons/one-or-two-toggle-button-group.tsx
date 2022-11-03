import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { translations } from "../../services/translations";
import { useDispatch } from "react-redux";
import { ActionsTypes } from "../../store/types.actions";
import { StyledToggleButtonGroup } from "./styled-toggle-button";

export const OneOrTwoToggleButtons = () => {
  const [alignment, setAlignment] = React.useState("web");

  const dispatch = useDispatch();
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    if (event) return;
    dispatch({
      type: ActionsTypes.CHANGE_VIEW,
      payload: {
        value: newAlignment,
      },
    });
  };

  return (
    <StyledToggleButtonGroup
      value={alignment}
      exclusive
      // sx={{color: 'white'}}
      dir={"ltr"}
      onChange={handleChange}
    >
      <ToggleButton sx={{}} value={"sketch"}>
        {translations.oneGuard}
      </ToggleButton>
      <ToggleButton sx={{}} value={"preferences"}>
        {" "}
        {translations.twoGuards}{" "}
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};
