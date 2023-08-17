import { For, Show } from "solid-js";

import { createSearchVillages } from "../libs";

const CreateSearchVillages = () => {
  const query = createSearchVillages("a");

  return (
    <div data-testid="create-search-villages">
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

export default CreateSearchVillages;
