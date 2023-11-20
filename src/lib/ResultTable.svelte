<script>
    import frame from "$lib/parts/frame.json";
    import weapon from "$lib/parts/weapon.json";
    import { fixedParts,result} from "$lib/store.js";
    const type = ["種類", "パーツ", "固定"];
    const orderTranslation = {
    右腕武装: "double-hand-weapon",
    左腕武装: "hand-weapon",
    右肩武装: "double-shoulder-weapon",
    左肩武装: "shoulder-weapon",
    頭部: "head",
    コア: "core",
    腕部: "arm",
    脚部: "reg",
    ブースター: "booster",
    火器管制: "fcs",
    ジェネレータ: "generator",
    拡張機能: "option",
  };
  const orders = Object.keys(orderTranslation);
  const allDatas = Object.assign(frame, weapon);
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
              {#each allDatas[orderTranslation[order]] as categoryParts}
                {#if $result.length > 0}
                  {#if categoryParts["name"] == $result[0][orders.indexOf(order)]["name"]}
                    <option value={categoryParts["name"]} selected>{categoryParts["name"]}</option>
                  {:else}
                    <option value={categoryParts["name"]}>{categoryParts["name"]}</option>
                  {/if}
                {:else}
                  <option value={categoryParts["name"]}>{categoryParts["name"]}</option>
                {/if}
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