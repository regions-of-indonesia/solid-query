import { describe, expect, it } from "vitest";

import { hasOwnProperties, isTypeofObject } from "javascript-yesterday";

import { createSolidQuery } from "../src";

describe("Create React Query", () => {
  it("Type check", async () => {
    const swr = createSolidQuery();

    expect(
      isTypeofObject(swr) &&
        hasOwnProperties(
          swr,
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

    expect(swr.createProvinces).toBeTypeOf("function");
    expect(swr.createProvince).toBeTypeOf("function");
    expect(swr.createDistricts).toBeTypeOf("function");
    expect(swr.createDistrict).toBeTypeOf("function");
    expect(swr.createSubdistricts).toBeTypeOf("function");
    expect(swr.createSubdistrict).toBeTypeOf("function");
    expect(swr.createVillages).toBeTypeOf("function");
    expect(swr.createVillage).toBeTypeOf("function");
    expect(swr.createSearch).toBeTypeOf("function");
    expect(swr.createSearchProvinces).toBeTypeOf("function");
    expect(swr.createSearchDistricts).toBeTypeOf("function");
    expect(swr.createSearchSubdistricts).toBeTypeOf("function");
    expect(swr.createSearchVillages).toBeTypeOf("function");
  });
});
