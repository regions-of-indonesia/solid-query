import { RegionsOfIndonesiaClient } from "@regions-of-indonesia/client";

import { createQuery } from "@tanstack/solid-query";
import type { QueryFunctionContext as Context } from "@tanstack/solid-query";

function isKey(value: unknown): value is string {
  return typeof value === "string" && value !== "";
}

function getValidKey<T>(value: unknown, callback: (value: string) => T) {
  return () => (isKey(value) ? callback(value) : ([] as unknown as [string, string]));
}

function createSolidQuery(client: RegionsOfIndonesiaClient = new RegionsOfIndonesiaClient()) {
  const key = {
    provinces: () => ["provinces"],
    province: (code: string) => ["province", code] as [string, string],
    districts: (provinceCode: string) => ["districts", provinceCode] as [string, string],
    district: (code: string) => ["district", code] as [string, string],
    subdistricts: (districtCode: string) => ["subdistricts", districtCode] as [string, string],
    subdistrict: (code: string) => ["subdistrict", code] as [string, string],
    villages: (subdistrictCode: string) => ["villages", subdistrictCode] as [string, string],
    village: (code: string) => ["village", code] as [string, string],

    search: (text: string) => ["search", text] as [string, string],
    searchProvinces: (text: string) => ["search/provinces", text] as [string, string],
    searchDistricts: (text: string) => ["search/districts", text] as [string, string],
    searchSubdistricts: (text: string) => ["search/subdistricts", text] as [string, string],
    searchVillages: (text: string) => ["search/villages", text] as [string, string],
  };

  const fetcher = {
    provinces: () => client.province.find(),
    province: <C extends Context<[string, string]>>(ctx: C) => client.province.findByCode(ctx.queryKey[1]),
    districts: <C extends Context<[string, string]>>(ctx: C) => client.district.findByProvinceCode(ctx.queryKey[1]),
    district: <C extends Context<[string, string]>>(ctx: C) => client.district.findByCode(ctx.queryKey[1]),
    subdistricts: <C extends Context<[string, string]>>(ctx: C) => client.subdistrict.findByDistrictCode(ctx.queryKey[1]),
    subdistrict: <C extends Context<[string, string]>>(ctx: C) => client.subdistrict.findByCode(ctx.queryKey[1]),
    villages: <C extends Context<[string, string]>>(ctx: C) => client.village.findBySubdistrictCode(ctx.queryKey[1]),
    village: <C extends Context<[string, string]>>(ctx: C) => client.village.findByCode(ctx.queryKey[1]),

    search: <C extends Context<[string, string]>>(ctx: C) => client.search(ctx.queryKey[1]),
    searchProvinces: <C extends Context<[string, string]>>(ctx: C) => client.province.search(ctx.queryKey[1]),
    searchDistricts: <C extends Context<[string, string]>>(ctx: C) => client.district.search(ctx.queryKey[1]),
    searchSubdistricts: <C extends Context<[string, string]>>(ctx: C) => client.subdistrict.search(ctx.queryKey[1]),
    searchVillages: <C extends Context<[string, string]>>(ctx: C) => client.village.search(ctx.queryKey[1]),
  };

  return {
    createProvinces() {
      return createQuery(key.provinces, fetcher.provinces);
    },
    createProvince(code?: string) {
      return createQuery(getValidKey(code, key.province), fetcher.province, { enabled: isKey(code) });
    },
    createDistricts(provinceCode?: string) {
      return createQuery(getValidKey(provinceCode, key.districts), fetcher.districts, { enabled: isKey(provinceCode) });
    },
    createDistrict(code?: string) {
      return createQuery(getValidKey(code, key.district), fetcher.district, { enabled: isKey(code) });
    },
    createSubdistricts(districtCode?: string) {
      return createQuery(getValidKey(districtCode, key.subdistricts), fetcher.subdistricts, { enabled: isKey(districtCode) });
    },
    createSubdistrict(code?: string) {
      return createQuery(getValidKey(code, key.subdistrict), fetcher.subdistrict, { enabled: isKey(code) });
    },
    createVillages(subdistrictCode?: string) {
      return createQuery(getValidKey(subdistrictCode, key.villages), fetcher.villages, { enabled: isKey(subdistrictCode) });
    },
    createVillage(code?: string) {
      return createQuery(getValidKey(code, key.village), fetcher.village, { enabled: isKey(code) });
    },

    createSearch(text?: string) {
      return createQuery(getValidKey(text, key.search), fetcher.search, { enabled: isKey(text) });
    },
    createSearchProvinces(text?: string) {
      return createQuery(getValidKey(text, key.searchProvinces), fetcher.searchProvinces, { enabled: isKey(text) });
    },
    createSearchDistricts(text?: string) {
      return createQuery(getValidKey(text, key.searchDistricts), fetcher.searchDistricts, { enabled: isKey(text) });
    },
    createSearchSubdistricts(text?: string) {
      return createQuery(getValidKey(text, key.searchSubdistricts), fetcher.searchSubdistricts, { enabled: isKey(text) });
    },
    createSearchVillages(text?: string) {
      return createQuery(getValidKey(text, key.searchVillages), fetcher.searchVillages, { enabled: isKey(text) });
    },
  };
}

export default createSolidQuery;
