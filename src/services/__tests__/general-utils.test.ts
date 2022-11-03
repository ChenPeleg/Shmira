import React from "react";
import { Utils } from "../utils";

describe("general utils ", () => {
  it("gets next id when given array of ids", () => {
    const res1 = Utils.getNextId(["1", "2", "4"]);
    const res2 = Utils.getNextId(["1", "2", "7"]);
    expect(res1).toBe("5");
    expect(res2).toBe("8");
  });
  it("returns next id  as 1 when given array empty", () => {
    const res1 = Utils.getNextId([]);
    expect(res1).toBe("1");
  });
});
