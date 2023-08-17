import { Show } from "solid-js";

import { createVillage } from "../libs";

const CreateVillage = () => {
  const query = createVillage("11.01.01.2001");

  return (
    <div data-testid="create-village">
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

export default CreateVillage;
