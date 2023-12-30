<script>
  import { assemble } from "$lib/functions/assemble.js";
  import {
    option,
    fixedParts,
    result,
    parameter,
    weaponFormationedParameter,
  } from "$lib/store.js";
  import { displayParameterFormation } from "$lib/functions/displayParameterFormation.js";
  function assembleCreate() {
    result.set(assemble($option, $fixedParts, $weaponFormationedParameter));
    $parameter = displayParameterFormation($result);
  }
  const optionTranslation = {
    腕部積載超過を許可: "permitExcessArmWeight",
    脚部積載超過を許可: "permitExcessLegWeight",
    コア拡張機能なしを許可: "extendedFunctionNonePermit",
    武装なしを許可: "armedNonePermit",
  };
  function changeToggleOption(event, elementId) {
    if (
      ($fixedParts[6] !== undefined &&
        ($fixedParts[6] !== undefined) == $option["permitExcessArmWeight"]) ||
      ($fixedParts[7] !== undefined &&
        ($fixedParts[7] !== undefined) == $option["permitExcessArmWeight"])
    ) {
      alert(
        "腕部または脚部パーツの固定時に積載超過のオプションを解除しないで下さい"
      );
      event.target.checked = !event.target.checked;
    } else {
      $option[elementId] = event.target.checked;
    }
  }
</script>

<div class="navbar bg-base-100">
  <div class="flex-none">
    <div class="drawer">
      <input id="sideMenu" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="sideMenu" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            /></svg
          >
        </label>
      </div>
      <div class="drawer-side">
        <label
          for="sideMenu"
          aria-label="close sidebar"
          class="drawer-overlay"
        />
        <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <!-- Sidebar content here -->
          <li><a href="/">ホーム</a></li>
          <li>
            <a href="https://forms.gle/cJcMZ3sy6g31PYt88">お問い合わせ</a>
          </li>
          <li>
            <a href="https://github.com/y0329/armoredcore6-assemble-randomizer"
              >ソースコード・ヘルプ</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex-1">
    <div class="text-xl font-bold px-1">アーマードコア6　賽投げシステム</div>
  </div>
  <div class="flex-none">
    <button
      class="btn btn-success text-xl font-medium text-white"
      on:click={assembleCreate}>アセンブル生成</button
    >
    <button class="btn btn-square btn-ghost" onclick="optionModal.showModal()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block h-5 w-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        /></svg
      >
    </button>
  </div>
</div>
<dialog id="optionModal" class="modal">
  <div class="modal-box">
    <div class="text-lg font-bold" id="option-title">アセンブルオプション</div>
    {#each Object.keys(optionTranslation) as options}
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">{options}</span>
          <input
            type="checkbox"
            data-id={optionTranslation[options]}
            on:change={(event) =>
              changeToggleOption(event, optionTranslation[options])}
            class="toggle"
            bind:checked={$option[optionTranslation[options]]}
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
        bind:value={$option["hangerWeaponRate"]}
      />
    </label>
    <div class="modal-action">
      <form method="dialog">
          <button class="btn">設定完了</button>
      </form>
    </div>
  </div>
</dialog>

<style>
  #option-title {
    text-align: center;
  }
  .modal-action {
    display: flex;
    justify-content: center;
  }
  .drawer-side {
    z-index: 100;
  }
</style>
