import { SxProps } from "@mui/system";
import React from "react";
import { IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

export interface CloneButtonProps {
  sx: SxProps;
  cloneClickHandler: any;
}

export const CloneButton = (props: CloneButtonProps) => {
  return (
    <div>
      <IconButton
        tabIndex={-1}
        id={"clone-button"}
        onClick={props.cloneClickHandler}
        size={"small"}
        sx={{ ...props.sx }}
        aria-label="delete"
      >
        <ContentCopy />
      </IconButton>
    </div>
  );
};
