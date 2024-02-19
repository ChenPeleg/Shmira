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
      flexibilityByDates: ["45537", "45544", "45546", "45551"], //,,,
      halfOrFull: "2",
      TypeOfInfoPreference: "2",
      optionalGuardDaysByDates: "",
      guardName: "Yair Tzuker",
    };
    const Gilad = {
      flexibilityByDays: [],
      flexibilityByDates: ["45565", "45574", "45577", "45604", "45607"],
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

      "flexibility is not calculated properly - this functions needs to be updated every year: change the Yair and Gilad dates at the end of the file"
    );

    expect(foundGilad?.flexibilityByDates).toEqual(Gilad.flexibilityByDates);
  });
  it("identify comments and puts them in the comment", () => {
    const input = mockSheetInput.inputWithComments;
    const preferences: PreferenceModel[] = ImportPreferencesFromText(input);
    expect(preferences.length).toBe(5);
  });
});
