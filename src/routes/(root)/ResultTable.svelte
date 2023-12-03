<script>
  import frame from "$lib/parts/frame.json";
  import weapon from "$lib/parts/weapon.json";
  import { fixedParts, result } from "$lib/store.js";
  const type = ["種類", "パーツ", "固定"];
  console.log(weapon["double-hand-weapon"], frame);
  const orderTranslation = {
    右腕武装: weapon["double-hand-weapon"],
    左腕武装: weapon["hand-weapon"],
    右肩武装: weapon["double-shoulder-weapon"].concat(
      weapon["double-hand-weapon"].filter(function (parts) {
        return parts["name"] != "NONE";
      }),
    ),
    左肩武装: weapon["shoulder-weapon"].concat(
      weapon["hand-weapon"].filter(function (parts) {
        return parts["name"] != "NONE";
      }),
    ),
    頭部: frame["head"],
    コア: frame["core"],
    腕部: frame["arm"],
    脚部: frame["reg"],
    ブースター: frame["booster"],
    火器管制: frame["fcs"],
    ジェネレータ: frame["generator"],
    拡張機能: frame["option"],
  };
  const orders = Object.keys(orderTranslation);
  const parameter = ["重量", "EN負荷"];
  function hiddenswitch(event, elementId) {
    if (event.srcElement.checked) {
      document.getElementById(elementId).disabled = !event.srcElement.checked;
    } else {
      document.getElementById(elementId).disabled = !event.srcElement.checked;
      delete $fixedParts[Object.values(orderTranslation)[elementId]];
    }
  }
  function changeFixedParts(event, elementId) {
    $fixedParts[Object.values(orderTranslation)[elementId]] =
      event.srcElement.value;
  }
</script>

<table class="table table-sm">
  <thead>
    <tr>
      {#each type as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each orders as order}
      <tr>
        <td>
          {order}
        </td>
        <td>
          <select
            id={orders.indexOf(order)}
            class="select select-ghost w-full"
            on:change={(event) =>
              changeFixedParts(event, orders.indexOf(order))}
            disabled
          >
            {#each [orderTranslation[order]] as categoryParts}
              {#each categoryParts as parts}
                {#if $result.length > 0}
                  {#if parts["name"] == $result[0][orders.indexOf(order)]["name"]}
                    <option value={parts["name"]} selected
                      >{parts["name"]}</option
                    >
                  {:else}
                    <option value={parts["name"]}>{parts["name"]}</option>
                  {/if}
                {:else}
                  <option value={parts["name"]}>{parts["name"]}</option>
                {/if}
              {/each}
            {/each}
          </select>
        </td>
        <td>
          <input
            type="checkbox"
            id={orders.indexOf(order)}
            on:change={(event) => hiddenswitch(event, orders.indexOf(order))}
            class="toggle"
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<table class="table table-sm">
  <thead>
    <tr>
      {#each parameter as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each $result.slice(1, 3) as row}
      <td>
        {row}
      </td>
    {/each}
  </tbody>
</table>

<style>
  th,
  td {
    text-align: center;
  }
</style>
