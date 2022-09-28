import { RegionsOfIndonesiaClient } from "@regions-of-indonesia/client";

import { createQuery } from "@tanstack/solid-query";
import type { QueryFunctionContext as Ctx } from "@tanstack/solid-query";

function isNotEmptyString(value: unknown): value is string {
  return typeof value === "string" && value !== "";
}

function createCallbackIfNotEmptyStringOrNull<T>(value: unknown, callback: (value: string) => T) {
  return () => (isNotEmptyString(value) ? callback(value) : []);
}

function isValidTextOrCodeFromContext(ctx: Ctx<[string, string], any>) {
  return typeof ctx.queryKey[1] === "string" && ctx.queryKey[1] !== "";
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
    provinces: async () => await client.province.find(),
    province: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.province.findByCode(ctx.queryKey[1]) : undefined,
    districts: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.district.findByProvinceCode(ctx.queryKey[1]) : undefined,
    district: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.district.findByCode(ctx.queryKey[1]) : undefined,
    subdistricts: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.subdistrict.findByDistrictCode(ctx.queryKey[1]) : undefined,
    subdistrict: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.subdistrict.findByCode(ctx.queryKey[1]) : undefined,
    villages: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.village.findBySubdistrictCode(ctx.queryKey[1]) : undefined,
    village: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.village.findByCode(ctx.queryKey[1]) : undefined,

    search: async (ctx: Ctx<[string, string]>) => (isValidTextOrCodeFromContext(ctx) ? await client.search(ctx.queryKey[1]) : undefined),
    searchProvinces: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.province.search(ctx.queryKey[1]) : undefined,
    searchDistricts: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.district.search(ctx.queryKey[1]) : undefined,
    searchSubdistricts: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.subdistrict.search(ctx.queryKey[1]) : undefined,
    searchVillages: async (ctx: Ctx<[string, string]>) =>
      isValidTextOrCodeFromContext(ctx) ? await client.village.search(ctx.queryKey[1]) : undefined,
  };

  return {
    createProvinces() {
      return createQuery(key.provinces, fetcher.provinces);
    },
    createProvince(code: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(code, key.province), fetcher.province);
    },
    createDistricts(provinceCode: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(provinceCode, key.districts), fetcher.districts);
    },
    createDistrict(code: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(code, key.district), fetcher.district);
    },
    createSubdistricts(districtCode: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(districtCode, key.subdistricts), fetcher.subdistricts);
    },
    createSubdistrict(code: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(code, key.subdistrict), fetcher.subdistrict);
    },
    createVillages(subdistrictCode: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(subdistrictCode, key.villages), fetcher.villages);
    },
    createVillage(code: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(code, key.village), fetcher.village);
    },

    createSearch(text: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(text, key.search), fetcher.search);
    },
    createSearchProvinces(text: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchProvinces), fetcher.searchProvinces);
    },
    createSearchDistricts(text: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchDistricts), fetcher.searchDistricts);
    },
    createSearchSubdistricts(text: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchSubdistricts), fetcher.searchSubdistricts);
    },
    createSearchVillages(text: string) {
      return createQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchVillages), fetcher.searchVillages);
    },
  };
}

export default createSolidQuery;
