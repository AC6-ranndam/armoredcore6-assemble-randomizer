<script>
  import "../app.css";
  import frame from "$lib/parts/frame.json";
  import weapon from "$lib/parts/weapon.json";
  import { assemble } from "$lib/assemble.js";
  const type = ["種類", "パーツ", "固定"];
  const parameter = ["重量", "EN負荷"];
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
  let option = {
    permitExcessWeight: true,
    extendedFunctionNonePermit: false,
    armedNonePermit: false,
    hangerWeaponRate: 0,
  };
  let result = [];
  let fixedParts = {};
  const optionTranslation = {
    積載超過を許可: "permitExcessWeight",
    コア拡張機能なしを許可: "extendedFunctionNonePermit",
    武装なしを許可: "armedNonePermit",
  };
  const allDatas = Object.assign(frame, weapon);
  function hiddenswitch(event, elementId) {
    console.log(event.srcElement.checked);
    if (event.srcElement.checked) {
      document.getElementById(elementId).disabled = !event.srcElement.checked;
    } else {
      document.getElementById(elementId).disabled = !event.srcElement.checked;
      delete fixedParts[Object.values(orderTranslation)[elementId]];
    }
  }
  function assembleCreate() {
    result = assemble(option, fixedParts);
  }
  function changeFixedParts(event, elementId) {
    fixedParts[Object.values(orderTranslation)[elementId]] =
      event.srcElement.value;
  }
  function changeToggleOption(event, elementId) {
    option[elementId] = event.srcElement.checked;
  }
</script>
<div class="navbar bg-base-100">
  <div class="flex-none">
    <div class="drawer">
      <input id="sideMenu" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="sideMenu" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <div class="drawer-side">
        <label for="sideMenu" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <!-- Sidebar content here -->
          <li><a href="/">ホーム</a></li>
          <li><a>ご要望</a></li>
          <li><a>Github</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">アーマードコア6　賽投げシステム</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost" onclick="optionModal.showModal()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>
<dialog id="optionModal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">アセンブルオプション</h3>
    {#each Object.keys(optionTranslation) as options}
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">{options}</span>
          <input
            type="checkbox"
            id={optionTranslation[options]}
            on:change={(event) =>
              changeToggleOption(event, optionTranslation[options])}
            class="toggle"
          />
        </label>
      </div>
    {/each}
    <label class="label cursor-pointer">
      <span class="label-text">ハンガー武器の割合</span>
      <input
        type="number"
        class="input input-bordered w-full max-w-xs"
        min="0"
        max="100"
        bind:value={option["hangerWeaponRate"]}
      />
    </label>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">設定完了</button>
      </form>
    </div>
  </div>
</dialog>
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
              {#if result.length > 0}
                {#if categoryParts["name"] == result[0][orders.indexOf(order)]["name"]}
                  <option value={categoryParts["name"]} selected
                    >{categoryParts["name"]}</option
                  >
                {:else}
                  <option value={categoryParts["name"]}
                    >{categoryParts["name"]}</option
                  >
                {/if}
              {:else}
                <option value={categoryParts["name"]}
                  >{categoryParts["name"]}</option
                >
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
<div class="btn-container">
  <button class="btn text-xl font-medium" on:click={assembleCreate}
    >アセンブル作成</button
  >
</div>
<table class="table table-sm">
  <thead>
    <tr>
      {#each parameter as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each result.slice(1, 3) as row}
      <td>
        {row}
      </td>
    {/each}
  </tbody>
</table>
<style>
  .btn-container {
    display: flex;
    justify-content: center;

  }
  .drawer {
    z-index: 100;
  }
  th,
  td {
    text-align: center;
  }
</style>
