import { styled } from "@mui/system";
import { ToggleButtonGroup } from "@mui/material";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      backgroundColor: "rgba(255,255,255,0.11)",
      // margin: theme.spacing(0.5),
      // border: 0,
      "&.Mui-disabled": {
        // border: 0,
      },
      "&.Mui-selected": {
        backgroundColor: "rgba(218,255,248,0.64)",
        // border: 0,
      },
      "&:not(:first-of-type)": {
        // borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        // borderRadius: theme.shape.borderRadius,
      },
    },
  })
);
