import React from "react";

import { customMatcherRunner } from "../../__tests-utils__/cutom-matchers";
import { mockSheetInput } from "../../__tests-utils__/mock-sheet-input";
import { ImportPreferencesFromText } from "../import-orders-from-text";
import { PreferenceModel } from "../../models/Preference.model";

jest.mock("react-dom", () => ({ render: jest.fn() }));

customMatcherRunner();

describe("import-orders-from-text", () => {
  it("creates prefernces properly form sheet input ", () => {
    const input = mockSheetInput.basicInput;
    const preferences: PreferenceModel[] = ImportPreferencesFromText(input);

    const Yair = {
      flexibilityByDates: ["44806", "44813", "44815", "44820"],
      halfOrFull: "2",
      TypeOfInfoPreference: "2",
      optionalGuardDaysByDates: "",
      guardName: "Yair Tzuker",
    };
    const Gilad = {
      flexibilityByDays: [],
      flexibilityByDates: ["44834", "44843", "44846", "44873", "44876"],
      halfOrFull: "2",
      TypeOfInfoPreference: "2",
      optionalGuardDaysByDates: "",
      guardName: "Gilad Peri",
      weekDaysOrDates: "2",
    };

    const foundYair = preferences.find((p) => p.guardName === Yair.guardName);
    const foundGilad = preferences.find((p) => p.guardName === Gilad.guardName);

    expect(!!(foundYair && foundGilad)).eq(
      true,
      "did not found two guards in the list"
    );
    expect(foundYair?.weekDaysOrDates == "2").eq(
      true,
      "guard is not weekDaysOrDates == 2"
    );
    expect(foundGilad?.weekDaysOrDates == "2").eq(
      true,
      "guard is not weekDaysOrDates == 2"
    );
    expect(foundYair?.flexibilityByDates.join(",")).eq(
      Yair.flexibilityByDates.join(","),
      "flexability is not calculated properly"
    );
    expect(foundGilad?.flexibilityByDates.join(",")).eq(
      Gilad.flexibilityByDates.join(","),
      "flexability is not calculated properly"
    );
  });
  it("identify comments and puts them in the comment", () => {
    const input = mockSheetInput.inputWithComments;
    const preferences: PreferenceModel[] = ImportPreferencesFromText(input);
    // expect()
  });
});
