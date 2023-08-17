import { Show } from "solid-js";

import { createRegion } from "../libs";

const CreateRegion = () => {
  const query = createRegion("11");

  return (
    <div data-testid="create-region">
      <Show
        when={query.error}
        fallback={
          <Show when={query.isLoading} fallback={<span id="data" data-code={query.data!.code} data-name={query.data!.name}></span>}>
            <span id="loading"></span>
          </Show>
        }
      >
        <span id="error"></span>
      </Show>
    </div>
  );
};

export default CreateRegion;
