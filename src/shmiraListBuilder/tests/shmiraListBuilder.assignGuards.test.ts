import { ShmiraListBuilderBuildNightsAndUnAssigned } from "../shmiraListBuilder.assignGuards";
import { shmiraBuildFixtures } from "./shmiraBuildFixtures";
import { PreferenceMetaDataModel } from "../models/shmiraList.models";

const preferencesFixture: PreferenceMetaDataModel[] =
  shmiraBuildFixtures.preferences;

const settingsFixture = shmiraBuildFixtures.settings;

// @ts-ignore
describe("shmiraListBuilder.assignGuards", () => {
  it("generate guards List", () => {
    const res = ShmiraListBuilderBuildNightsAndUnAssigned(
      preferencesFixture,
      settingsFixture
    );
    expect(res).toEqual(shmiraBuildFixtures.result);
  });
});
