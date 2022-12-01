import { RegionsOfIndonesiaClient } from "@regions-of-indonesia/client";

import { createQuery } from "@tanstack/solid-query";
import type { QueryFunctionContext as Context } from "@tanstack/solid-query";

function getValidKey<T>(value: unknown, callback: (value: string) => T) {
  return () => (typeof value === "string" && value !== "" ? callback(value) : []);
}

function isContext(ctx: Context): ctx is Context<[string, string]> {
  return typeof ctx.queryKey[1] === "string" && ctx.queryKey[1] !== "";
}

async function error(): Promise<undefined> {
  throw new Error("Oops");
}

function createSolidQuery(client: RegionsOfIndonesiaClient = new RegionsOfIndonesiaClient()) {
  const key = {
    provinces: () => ["provinces"],
    province: (code: string) => ["province", code],
    districts: (provinceCode: string) => ["districts", provinceCode],
    district: (code: string) => ["district", code],
    subdistricts: (districtCode: string) => ["subdistricts", districtCode],
    subdistrict: (code: string) => ["subdistrict", code],
    villages: (subdistrictCode: string) => ["villages", subdistrictCode],
    village: (code: string) => ["village", code],

    search: (text: string) => ["search", text],
    searchProvinces: (text: string) => ["search/provinces", text],
    searchDistricts: (text: string) => ["search/districts", text],
    searchSubdistricts: (text: string) => ["search/subdistricts", text],
    searchVillages: (text: string) => ["search/villages", text],
  };

  const fetcher = {
    provinces: () => client.province.find(),
    province: (ctx: Context) => (isContext(ctx) ? client.province.findByCode(ctx.queryKey[1]) : error()),
    districts: (ctx: Context) => (isContext(ctx) ? client.district.findByProvinceCode(ctx.queryKey[1]) : error()),
    district: (ctx: Context) => (isContext(ctx) ? client.district.findByCode(ctx.queryKey[1]) : error()),
    subdistricts: (ctx: Context) => (isContext(ctx) ? client.subdistrict.findByDistrictCode(ctx.queryKey[1]) : error()),
    subdistrict: (ctx: Context) => (isContext(ctx) ? client.subdistrict.findByCode(ctx.queryKey[1]) : error()),
    villages: (ctx: Context) => (isContext(ctx) ? client.village.findBySubdistrictCode(ctx.queryKey[1]) : error()),
    village: (ctx: Context) => (isContext(ctx) ? client.village.findByCode(ctx.queryKey[1]) : error()),

    search: (ctx: Context) => (isContext(ctx) ? client.search(ctx.queryKey[1]) : error()),
    searchProvinces: (ctx: Context) => (isContext(ctx) ? client.province.search(ctx.queryKey[1]) : error()),
    searchDistricts: (ctx: Context) => (isContext(ctx) ? client.district.search(ctx.queryKey[1]) : error()),
    searchSubdistricts: (ctx: Context) => (isContext(ctx) ? client.subdistrict.search(ctx.queryKey[1]) : error()),
    searchVillages: (ctx: Context) => (isContext(ctx) ? client.village.search(ctx.queryKey[1]) : error()),
  };

  return {
    createProvinces() {
      return createQuery(key.provinces, fetcher.provinces);
    },
    createProvince(code: string) {
      return createQuery(getValidKey(code, key.province), fetcher.province);
    },
    createDistricts(provinceCode: string) {
      return createQuery(getValidKey(provinceCode, key.districts), fetcher.districts);
    },
    createDistrict(code: string) {
      return createQuery(getValidKey(code, key.district), fetcher.district);
    },
    createSubdistricts(districtCode: string) {
      return createQuery(getValidKey(districtCode, key.subdistricts), fetcher.subdistricts);
    },
    createSubdistrict(code: string) {
      return createQuery(getValidKey(code, key.subdistrict), fetcher.subdistrict);
    },
    createVillages(subdistrictCode: string) {
      return createQuery(getValidKey(subdistrictCode, key.villages), fetcher.villages);
    },
    createVillage(code: string) {
      return createQuery(getValidKey(code, key.village), fetcher.village);
    },

    createSearch(text: string) {
      return createQuery(getValidKey(text, key.search), fetcher.search);
    },
    createSearchProvinces(text: string) {
      return createQuery(getValidKey(text, key.searchProvinces), fetcher.searchProvinces);
    },
    createSearchDistricts(text: string) {
      return createQuery(getValidKey(text, key.searchDistricts), fetcher.searchDistricts);
    },
    createSearchSubdistricts(text: string) {
      return createQuery(getValidKey(text, key.searchSubdistricts), fetcher.searchSubdistricts);
    },
    createSearchVillages(text: string) {
      return createQuery(getValidKey(text, key.searchVillages), fetcher.searchVillages);
    },
  };
}

export default createSolidQuery;
