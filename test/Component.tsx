import { For } from "solid-js";

import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import { createProvinces, createDistricts, createSubdistricts, createVillages } from "./regions-of-indonesia";

const AsyncComponent = () => {
  const provinces = createProvinces();
  const districts = createDistricts(() => "11");
  const subdistricts = createSubdistricts(() => "11.01");
  const villages = createVillages(() => "11.01.01");

  return (
    <div>
      <For each={provinces.data || []}>{(province) => <div data-testid={`province-${province.code}`}>{province.name}</div>}</For>
      <For each={districts.data || []}>{(district) => <div data-testid={`district-${district.code}`}>{district.name}</div>}</For>
      <For each={subdistricts.data || []}>
        {(subdistrict) => <div data-testid={`subdistrict-${subdistrict.code}`}>{subdistrict.name}</div>}
      </For>
      <For each={villages.data || []}>{(village) => <div data-testid={`village-${village.code}`}>{village.name}</div>}</For>
    </div>
  );
};

const client = new QueryClient();
const Component = () => {
  return (
    <QueryClientProvider client={client}>
      <AsyncComponent />
    </QueryClientProvider>
  );
};

export default Component;
