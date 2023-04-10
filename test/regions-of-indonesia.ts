import { create, log } from "@regions-of-indonesia/client";

import { createSolidQuery } from "../src";

const { createProvinces, createDistricts, createSubdistricts, createVillages } = createSolidQuery(
  create({
    baseURL: { dynamic: "http://127.1.0.0:8000", static: "http://127.1.0.0:8001" },
    middlewares: [log()],
  })
);

export { createProvinces, createDistricts, createSubdistricts, createVillages };
