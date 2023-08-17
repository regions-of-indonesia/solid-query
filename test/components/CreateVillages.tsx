import { For, Show } from "solid-js";

import { createVillages } from "../libs";

const CreateVillages = () => {
  const query = createVillages("11.01.01");

  return (
    <div data-testid="create-villages">
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

export default CreateVillages;
