import { describe, expect, it, vi } from "vitest";
import { customMatcherRunner } from "../__tests-utils__/cutom-matchers";
//import { render  } from '@testing-library/react';

vi.mock("react-dom", () => ({ render: vi.fn() }));

customMatcherRunner();

describe("Application root", () => {
  it("try custom matchers", () => {
    expect(9).toBePowerOf(9, 6);
  });
  it("try custom matchers with message ", () => {
    expect(9).eq(9, "9 is not equal to 8");
  });
});
