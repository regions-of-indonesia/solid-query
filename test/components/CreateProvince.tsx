import { Show } from "solid-js";

import { createProvince } from "../libs";

const CreateProvince = () => {
  const query = createProvince("11");

  return (
    <div data-testid="create-province">
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

export default CreateProvince;
