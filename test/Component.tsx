import { For } from "solid-js";

import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import { createProvinces } from "./regions-of-indonesia";

const AsyncComponent = () => {
  const query = createProvinces();

  return (
    <div>
      <For each={query.data || []}>
        {(item) => {
          return <div data-testid={`code-${item.code}`}>{item.name}</div>;
        }}
      </For>
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
