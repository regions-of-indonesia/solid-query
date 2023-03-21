import { describe, expect, it } from "vitest";

import { render } from "@solidjs/testing-library";

import { delay, hasOwnProperties, isTypeofObject } from "javascript-yesterday";

import { createSolidQuery } from "../src";

import Component from "./Component";

describe("Create React Query", () => {
  it("Type check", async () => {
    const query = createSolidQuery();

    expect(
      isTypeofObject(query) &&
        hasOwnProperties(
          query,
          "createProvinces",
          "createProvince",
          "createDistricts",
          "createDistrict",
          "createSubdistricts",
          "createSubdistrict",
          "createVillages",
          "createVillage",
          "createSearch",
          "createSearchProvinces",
          "createSearchDistricts",
          "createSearchSubdistricts",
          "createSearchVillages"
        )
    ).toBeTruthy();

    expect(query.createProvinces).toBeTypeOf("function");
    expect(query.createProvince).toBeTypeOf("function");
    expect(query.createDistricts).toBeTypeOf("function");
    expect(query.createDistrict).toBeTypeOf("function");
    expect(query.createSubdistricts).toBeTypeOf("function");
    expect(query.createSubdistrict).toBeTypeOf("function");
    expect(query.createVillages).toBeTypeOf("function");
    expect(query.createVillage).toBeTypeOf("function");
    expect(query.createSearch).toBeTypeOf("function");
    expect(query.createSearchProvinces).toBeTypeOf("function");
    expect(query.createSearchDistricts).toBeTypeOf("function");
    expect(query.createSearchSubdistricts).toBeTypeOf("function");
    expect(query.createSearchVillages).toBeTypeOf("function");
  });

  it("Component", async () => {
    const { getByTestId } = render(() => <Component />);

    await delay(1000);

    const code11 = getByTestId("code-11");
    const code12 = getByTestId("code-12");
    const code13 = getByTestId("code-13");

    expect(code11).toBeDefined();
    expect(code12).toBeDefined();
    expect(code13).toBeDefined();
  });
});
