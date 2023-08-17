import { Show } from "solid-js";

import { createDistrict } from "../libs";

const CreateDistrict = () => {
  const query = createDistrict("11.01");

  return (
    <div data-testid="create-district">
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

export default CreateDistrict;
