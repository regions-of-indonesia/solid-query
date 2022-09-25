import { describe, expect, it } from "vitest";

import createSolidQuery from "./createSolidQuery";

describe("Create", () => {
  it("Typeof object", async () => {
    const query = createSolidQuery();

    expect(query).toBeTypeOf("object");
  });
});
