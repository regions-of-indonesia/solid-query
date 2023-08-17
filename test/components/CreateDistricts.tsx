import { For, Show } from "solid-js";

import { createDistricts } from "../libs";

const CreateDistricts = () => {
  const query = createDistricts("11");

  return (
    <div data-testid="create-districts">
      <Show
        when={query.error}
        fallback={
          <Show
            when={query.isLoading}
            fallback={
              <ul id="data">
                <For each={query.data!}>{(item) => <li data-code={item.code} data-name={item.name}></li>}</For>
              </ul>
            }
          >
            <span id="loading"></span>
          </Show>
        }
      >
        <span id="error"></span>
      </Show>
    </div>
  );
};

export default CreateDistricts;