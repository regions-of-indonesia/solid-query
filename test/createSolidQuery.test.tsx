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

    const expects = (name: string, codes: string[]) => {
      const elements = codes.map((code) => getByTestId(`${name}-${code}`));
      for (let i = 0; i < elements.length; i++) expect(elements[i]).toBeDefined();
    };

    await delay(2000);
    expects("province", ["11", "12", "13"]);
    expects("district", ["11.01", "11.02", "11.03"]);
    expects("subdistrict", ["11.01.01", "11.01.02", "11.01.03"]);
    expects("village", ["11.01.01.2001", "11.01.01.2002", "11.01.01.2003"]);
  });
});
