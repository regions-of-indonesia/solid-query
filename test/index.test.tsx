import type { JSX } from "solid-js";

import { describe, expect, it } from "vitest";

import { render } from "@solidjs/testing-library";

import { isRegionCode, isRegionName } from "@regions-of-indonesia/utils";

import Provider from "./components/Provider";
import CreateProvinces from "./components/CreateProvinces";
import CreateProvince from "./components/CreateProvince";
import CreateDistricts from "./components/CreateDistricts";
import CreateDistrict from "./components/CreateDistrict";
import CreateSubdistricts from "./components/CreateSubdistricts";
import CreateSubdistrict from "./components/CreateSubdistrict";
import CreateVillages from "./components/CreateVillages";
import CreateVillage from "./components/CreateVillage";
import CreateRegion from "./components/CreateRegion";
import CreateSearch from "./components/CreateSearch";
import CreateSearchProvinces from "./components/CreateSearchProvinces";
import CreateSearchDistricts from "./components/CreateSearchDistricts";
import CreateSearchSubdistricts from "./components/CreateSearchSubdistricts";
import CreateSearchVillages from "./components/CreateSearchVillages";

const fetching = () => new Promise<void>((resolve) => setTimeout(resolve, 200));

const getDataElement = async (element: HTMLElement) => {
  expect(element).toBeDefined();
  expect(element.querySelector("#loading")).toBeDefined();
  await fetching();
  expect(element.querySelector("#error")).toBeNull();
  const data = element.querySelector("#data");
  expect(data).toBeDefined();
  return data!;
};

const expectRegionElement = (element: Element) => {
  expect(isRegionCode(element.getAttribute("data-code"))).toEqual(true);
  expect(isRegionName(element.getAttribute("data-name"))).toEqual(true);
};

const expectRegionsElement = (element: Element) => {
  [...element.children].forEach(expectRegionElement);
};

const itRegionElement = (id: string, Element: () => JSX.Element) => {
  it(id, async () =>
    expectRegionElement(
      await getDataElement(
        render(() => (
          <Provider>
            <Element />
          </Provider>
        )).getByTestId(id)
      )
    )
  );
};

const itRegionsElement = (id: string, Element: () => JSX.Element) => {
  it(id, async () =>
    expectRegionsElement(
      await getDataElement(
        render(() => (
          <Provider>
            <Element />
          </Provider>
        )).getByTestId(id)
      )
    )
  );
};

describe("Data", () => {
  itRegionsElement("create-provinces", () => <CreateProvinces />);
  itRegionElement("create-province", () => <CreateProvince />);
  itRegionsElement("create-districts", () => <CreateDistricts />);
  itRegionElement("create-district", () => <CreateDistrict />);
  itRegionsElement("create-subdistricts", () => <CreateSubdistricts />);
  itRegionElement("create-subdistrict", () => <CreateSubdistrict />);
  itRegionsElement("create-villages", () => <CreateVillages />);
  itRegionElement("create-village", () => <CreateVillage />);
  itRegionElement("create-region", () => <CreateRegion />);
  itRegionsElement("create-search", () => <CreateSearch />);
  itRegionsElement("create-search-provinces", () => <CreateSearchProvinces />);
  itRegionsElement("create-search-districts", () => <CreateSearchDistricts />);
  itRegionsElement("create-search-subdistricts", () => <CreateSearchSubdistricts />);
  itRegionsElement("create-search-villages", () => <CreateSearchVillages />);
});
