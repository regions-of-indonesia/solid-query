import { Show } from "solid-js";

import { createSubdistrict } from "../libs";

const CreateSubdistrict = () => {
  const query = createSubdistrict("11.01.01");

  return (
    <div data-testid="create-subdistrict">
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

export default CreateSubdistrict;
