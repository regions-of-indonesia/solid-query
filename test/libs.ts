import * as client from "@regions-of-indonesia/client";

import { create } from "../src";

export const {
  createProvinces,
  createProvince,
  createDistricts,
  createDistrict,
  createSubdistricts,
  createSubdistrict,
  createVillages,
  createVillage,
  createRegion,
  createSearch,
  createSearchProvinces,
  createSearchDistricts,
  createSearchSubdistricts,
  createSearchVillages,
} = create(
  client.create({
    baseURL: { dynamic: "http://localhost:8000" },
    static: false,
  })
);
