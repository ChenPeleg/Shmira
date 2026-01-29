import React, { useCallback, useState } from "react";

import { MuiFormPropsModel } from "../../models/mui-form-props.model";
import { useDispatch, useSelector } from "react-redux";
import { RenderTextField } from "../Form/text-field";
import { RenderSelectField } from "../Form/select-field";
import {
  PreferenceType,
  WeekDaysOrDates,
} from "../../models/PreferenceType.enum";
import { Box, SxProps } from "@mui/system";
import { Button, MenuItem } from "@mui/material";
import { translations } from "../../services/translations";
import { ActionsTypes } from "../../store/types.actions";
import { RenderFullNightField } from "../Form/full-night-field";
import { RenderFlexibilityField } from "../Form/flex-field";
import {
  PreferenceFields,
  PreferenceModel,
} from "../../models/Preference.model";
import { RenderSelectFieldDDays } from "../Form/select-field-days";
import { ShmiraListRecord } from "../../store/store.types";
import { Utils } from "../../services/utils";
import { Styles } from "../../hoc/themes";

const TRL = translations;

const getLabelByPreferenceType = (
  canOrCant: PreferenceType,
  weekDaysOrDates: WeekDaysOrDates
): string => {
  let res = "";
  switch (canOrCant) {
    case PreferenceType.CanAlwaysGuard:
      return "";
    case PreferenceType.CanGuardIn:
      return weekDaysOrDates === WeekDaysOrDates.WeekDays
        ? translations.CanGuardInDays
        : translations.CanGuardInDaysDates;

    case PreferenceType.CantGuardIn:
      return weekDaysOrDates === WeekDaysOrDates.WeekDays
        ? translations.CantGuardInDays
        : translations.CantGuardInDaysDates;
    default:
      return "";
  }
  return res;
};
const fieldWrapper: SxProps = {
  padding: "10px",
};
const selectFieldWrapper: SxProps = {
  ...fieldWrapper,
  paddingBottom: "0px",
};

const fieldWrapperText = {
  display: "inline-flex",
  padding: "10px",
  maxWidth: "150px",
};
const preferenceFields: PreferenceModel = new PreferenceFields();

const daysOfWeekMenuItem = Utils.Date.dateOfWeekObject;

const createItemsFromDateRange = (
  dateFrom: string,
  dateTo: string
): { dateInShort: string; timeStamp: string }[] => {
  const dateStampArr = Utils.Date.getTimestampArrayFromStartAndFinishDate(
    dateFrom,
    dateTo
  );
  return dateStampArr.map((n) => {
    const simpleDate = Utils.Date.simpleDateFromDateStamp(n.toString());
    return {
      dateInShort: simpleDate,
      timeStamp: n.toString(),
    };
  });
};

const emptyMeta = { touched: false, error: undefined };

export const PreferenceRequestForm = (formProps: MuiFormPropsModel) => {
  const dispatch = useDispatch();

  const id = formProps.preferenceId;
  const preferences = useSelector(
    (state: { preferences: PreferenceModel[] }) => state.preferences
  );

  const initialValues = preferences.find(
    (preference) => preference.id === id
  ) as PreferenceModel;

  const [values, setValues] = useState<PreferenceModel>(() => ({
    ...initialValues,
  }));

  const shmiraListCollection: ShmiraListRecord[] = useSelector(
    (state: { shmiraListCollection: ShmiraListRecord[] }) =>
      state.shmiraListCollection
  );
  const shmiraListId: string = useSelector(
    (state: { shmiraListId: string }) => state.shmiraListId
  );
  const currenList: ShmiraListRecord | undefined = shmiraListCollection.find(
    (s) => s.id === shmiraListId
  );
  let dateRange = createItemsFromDateRange("44444", "44480");
  if (currenList) {
    dateRange = createItemsFromDateRange(
      currenList.DateFrom,
      currenList.DateTo
    );
  }

  const typeOfPreference = values.TypeOfInfoPreference ?? undefined;
  const weekDaysOrDates = values.weekDaysOrDates ?? undefined;

  const update = useCallback((name: keyof PreferenceModel, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formProps.isInEdit) {
        return;
      }
      dispatch({
        type: ActionsTypes.UPDATE_ORDER_IN_EDIT,
        payload: { ...values },
      });
      dispatch({
        type: ActionsTypes.UPDATE_ORDER,
        payload: { id },
      });
    },
    [formProps.isInEdit, values, id, dispatch]
  );

  return (
    <form onSubmit={onSubmit} dir={"rtl"}>
      <Box
        id={"form-wrapper"}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Box sx={fieldWrapperText}>
          <RenderTextField
            input={{
              value: values.guardName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                update("guardName", e.target.value),
              name: preferenceFields.guardName,
            }}
            label={TRL.Name}
            meta={emptyMeta}
            custom={{}}
          />
        </Box>
        <Box sx={selectFieldWrapper}>
          <RenderSelectField
            input={{
              value: values.TypeOfInfoPreference ?? "",
              onChange: (e: { target: { value: string } }) =>
                update(
                  "TypeOfInfoPreference",
                  e.target.value as PreferenceType
                ),
              name: "TypeOfInfoPreference",
            }}
            label={TRL.TypeOfInfoPreference}
            meta={emptyMeta}
          >
            <MenuItem value={PreferenceType.CanGuardIn.toString()}>
              {TRL.CanGuardIn}
            </MenuItem>
            <MenuItem value={PreferenceType.CanAlwaysGuard.toString()}>
              {" "}
              {TRL.CanAlwaysGuard}
            </MenuItem>
            <MenuItem value={PreferenceType.CantGuardIn.toString()}>
              {TRL.CantGuardIn}
            </MenuItem>
          </RenderSelectField>
        </Box>
        {(typeOfPreference === PreferenceType.CanGuardIn ||
          typeOfPreference === PreferenceType.CantGuardIn) && (
          <Box sx={selectFieldWrapper}>
            <RenderFlexibilityField
              input={{
                value: values.weekDaysOrDates ?? "",
                onChange: (_e: unknown, newVal: string | null) =>
                  update("weekDaysOrDates", newVal as WeekDaysOrDates),
                name: "weekDaysOrDates",
              }}
              label={TRL.flexibilityByDays}
              meta={emptyMeta}
              custom={{ rows: 2 }}
            />
          </Box>
        )}
        {(typeOfPreference === PreferenceType.CanGuardIn ||
          typeOfPreference === PreferenceType.CantGuardIn) &&
          weekDaysOrDates === WeekDaysOrDates.WeekDays && (
            <Box
              sx={{
                ...selectFieldWrapper,
                minWidth: "20%",
              }}
            >
              <RenderSelectFieldDDays
                input={{
                  value: values.flexibilityByDays ?? [],
                  onChange: (e: { target: { value: unknown } }) => {
                    const v = e.target.value;
                    update(
                      "flexibilityByDays",
                      Array.isArray(v) ? v : typeof v === "string" ? [v] : []
                    );
                  },
                  name: "flexibilityByDays",
                }}
                label={getLabelByPreferenceType(
                  typeOfPreference,
                  WeekDaysOrDates.WeekDays
                )}
                meta={emptyMeta}
              >
                {daysOfWeekMenuItem.map(
                  (day: { name: string; weekDayNumber: number }) => (
                    <MenuItem
                      key={day.weekDayNumber}
                      value={day.weekDayNumber.toString()}
                    >
                      {day.name}
                    </MenuItem>
                  )
                )}
              </RenderSelectFieldDDays>
            </Box>
          )}
        {(typeOfPreference === PreferenceType.CanGuardIn ||
          typeOfPreference === PreferenceType.CantGuardIn) &&
          weekDaysOrDates === WeekDaysOrDates.Dates && (
            <Box
              sx={{
                ...selectFieldWrapper,
                minWidth: "30%",
              }}
            >
              <RenderSelectFieldDDays
                input={{
                  value: values.flexibilityByDates ?? [],
                  onChange: (e: { target: { value: unknown } }) => {
                    const v = e.target.value;
                    update(
                      "flexibilityByDates",
                      Array.isArray(v) ? v : typeof v === "string" ? [v] : []
                    );
                  },
                  name: "flexibilityByDates",
                }}
                label={getLabelByPreferenceType(
                  typeOfPreference,
                  WeekDaysOrDates.Dates
                )}
                meta={emptyMeta}
              >
                {dateRange.map(
                  (day: { dateInShort: string; timeStamp: string }) => (
                    <MenuItem
                      key={day.dateInShort}
                      value={day.timeStamp.toString()}
                    >
                      {day.dateInShort}
                    </MenuItem>
                  )
                )}
              </RenderSelectFieldDDays>
            </Box>
          )}

        <Box
          sx={{
            ...Styles.flexRow,
            flexWrap: "wrap",
            mt: "0.5em",
          }}
        >
          <Box sx={fieldWrapper}>
            <RenderTextField
              input={{
                value: values.Comments,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  update("Comments", e.target.value),
                name: preferenceFields.Comments,
              }}
              label={TRL.Comments}
              meta={emptyMeta}
              custom={{ rows: 2 }}
            />
          </Box>
          <Box sx={fieldWrapper}>
            <RenderFullNightField
              input={{
                value: values.halfOrFull,
                onChange: (_e: unknown, newVal: number | null) =>
                  update("halfOrFull", newVal != null ? String(newVal) : ""),
                name: preferenceFields.halfOrFull,
              }}
              label={TRL.halfOrFull}
              meta={emptyMeta}
              custom={{ type: "text", rows: 2 }}
            />
          </Box>

          <Box
            sx={{
              ...fieldWrapper,
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
          >
            <Button
              sx={{
                alignSelf: "flex-end",
                justifySelf: "end",
                m: "5px",
                width: "90px",
              }}
              variant="contained"
              color={"primary"}
              type="submit"
            >
              {TRL.Submit}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
