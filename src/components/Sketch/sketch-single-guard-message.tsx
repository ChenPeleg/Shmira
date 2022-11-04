import * as React from "react";
import { translations } from "../../services/translations";
import { Box } from "@mui/material";
import { Styles } from "../../hoc/themes";
import { LightTooltip } from "../Styled/styled-tool-tip";

export const SketchSingleGuardMessage = (props: any) => {
  return (
    <Box sx={Styles.flexRow}>
      <Box sx={{ width: "30px", h: "20px" }}></Box>
      <Box
        sx={{
          ...Styles.flexRow,
          p: "6px",
          // width: "300px",
          // height: "150px",
          // m: "3em",
        }}
      >
        {translations.SingleGuardMessage}
        &nbsp;
        <LightTooltip title={translations.SingleGuardMessageDetails}>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            {translations.details}
          </span>
        </LightTooltip>
      </Box>
    </Box>
  );
};
