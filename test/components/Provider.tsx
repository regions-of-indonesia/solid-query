import type { ParentComponent } from "solid-js";

import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const client = new QueryClient();

const Provider: ParentComponent = (props) => {
  return <QueryClientProvider client={client}>{props.children}</QueryClientProvider>;
};

export default Provider;
