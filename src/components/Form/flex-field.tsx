import { TextFieldPropertiesModel } from "../../models/text-field-properties.model";

import React from "react";
import { Box, Theme, ToggleButtonGroup } from "@mui/material";
import { translations } from "../../services/translations";
import { Styles } from "../../hoc/themes";
import ToggleButton from "@mui/material/ToggleButton";
import { WeekDaysOrDates } from "../../models/PreferenceType.enum";
import { SxProps } from "@mui/system";

const sliderSx = {
  direction: (theme: Theme) => theme.direction,

  "& .MuiSlider-thumb": {
    marginRight: -2,
    marginLeft: 0,
  },
};
const toggleStyle: SxProps = {
  "& .MuiToggleButton-root": {
    borderRadius: "30px 30px 30px 30px",
    border: "1px solid grey",
  },
  "& .MuiButtonBase-root": {
    borderRadius: "30px 30px 30px 30px",
    border: "1px solid grey",
  },
};
const renderFlexibilityText = (flexValues: [number, number]): string => {
  const absValue = (n: number): string => Math.abs(n).toString();
  let text =
    translations.flexEarly +
    " " +
    absValue(flexValues[0]) +
    " " +
    translations.min +
    ", " +
    translations.flexLate +
    " " +
    absValue(flexValues[1]) +
    " " +
    translations.min;
  return text;
};
export const RenderFlexibilityField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}: TextFieldPropertiesModel) => {
  const convertedInput = { ...input };
  const valueAsEnumb: WeekDaysOrDates | null =
    convertedInput.value == "1"
      ? WeekDaysOrDates.WeekDays
      : WeekDaysOrDates.Dates;
  // convertedInput.value = convertedInput.value.map((v: string) => Utils.convertStrToNum(v))
  return (
    <>
      <Box sx={Styles.flexRow}>
        <Box
          sx={{
            height: "40px",
            pt: "10px",
          }}
        >
          <ToggleButtonGroup
            size={"small"}
            dir={"ltr"}
            label={""}
            onChange={input.onChange}
            value={valueAsEnumb}
            {...convertedInput}
            {...custom}
          >
            <ToggleButton
              key={1}
              sx={{ ...toggleStyle }}
              value={WeekDaysOrDates.Dates.toString()}
            >
              {" "}
              {translations.byDates}{" "}
            </ToggleButton>
            <ToggleButton
              key={2}
              sx={{ ...toggleStyle }}
              value={WeekDaysOrDates.WeekDays.toString()}
            >
              {translations.byWeekDays}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </>
  );
};
