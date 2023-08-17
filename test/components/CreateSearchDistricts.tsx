import { For, Show } from "solid-js";

import { createSearchDistricts } from "../libs";

const CreateSearchDistricts = () => {
  const query = createSearchDistricts("a");

  return (
    <div data-testid="create-search-districts">
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

export default CreateSearchDistricts;
