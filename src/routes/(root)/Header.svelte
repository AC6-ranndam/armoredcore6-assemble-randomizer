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
  import { onMount } from "svelte";
  import {
    t,
    locale,
    loadTranslations,
    locales,
  } from "$lib/translations/translations";
  import { saveLocale, loadLocale } from "$lib/functions/i18nConfig";
  const optionTranslation = {
    腕部積載超過を許可: "permitExcessArmWeight",
    脚部積載超過を許可: "permitExcessLegWeight",
    コア拡張機能なしを許可: "extendedFunctionNonePermit",
    武装なしを許可: "armedNonePermit",
  };
  let language;
  let languageList = locales.get();
  const languageTranslation ={
    en:"English",
    ja:"日本語"
  }
  onMount(() => {
    language = loadLocale();
    //初期化処理
    loadTranslations(language, "/"); // 翻訳の読み込み
    saveLocale(language); // 言語設定をlocalStorageに保存
  });
  function assembleCreate() {
    result.set(assemble($option, $fixedParts, $weaponFormationedParameter));
    $parameter = displayParameterFormation($result);
  }
  function switchLanguage(event) {
    const selectedIndex = event.currentTarget.dataset.id;
    const selectedLanguage = languageList[selectedIndex];
    console.log(`Switched to language: ${selectedLanguage}`);
    locale.set(selectedLanguage);
    saveLocale(selectedLanguage);
  }
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
          <li><a href="/change-log">更新履歴</a></li>
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
    <div class="text-xl font-bold px-1">{$t("common.headerTitle")}</div>
  </div>
  <div class="flex-0">
    <button
      class="btn btn-success text-xl font-medium text-white"
      on:click={assembleCreate}>アセンブル生成</button
    >
    <div title="translationLanguage" class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost">
        <svg
          viewBox="0 0 512 512"
          style="width: 32px; height: 32px; opacity: 1;"
          xml:space="preserve"
        >
          <style type="text/css">
            .st0 {
              fill: #4b4b4b;
            }
          </style>
          <g>
            <path
              class="st0"
              d="M463.203,105.688c-3.047-4.25-6.234-8.406-9.609-12.484C406.641,36.313,335.531,0,256,0
            C176.484,0,105.359,36.313,58.406,93.203c-3.375,4.078-6.563,8.234-9.594,12.484C18.078,147.922,0,199.844,0,256
            c0,56.313,18.156,108.484,49.031,150.719c3.125,4.328,6.406,8.563,9.844,12.656C105.844,475.922,176.719,512,256,512
            c79.688,0,150.813-36.406,197.75-93.438c3.453-4.078,6.734-8.313,9.781-12.641C494.078,363.766,512,312,512,256
            C512,199.844,493.922,147.922,463.203,105.688z M471.688,247.969H385.75c-0.625-32.563-5.031-63.438-12.5-91.219
            c21.156-7.219,40.594-16.359,57.781-27.063C455.328,163.156,470.047,203.938,471.688,247.969z M263.984,41.906
            c37.375,5.188,70.438,46.109,89.297,104.281c-27.469,7.828-57.594,12.406-89.297,13.094V41.906z M247.984,41.906v117.375
            c-31.703-0.688-61.828-5.266-89.297-13.094C177.547,88.016,210.609,47.094,247.984,41.906z M247.984,175.266v72.703H142.219
            c0.625-30.766,4.891-60.094,11.984-86.516C183.094,169.75,214.703,174.594,247.984,175.266z M247.984,263.969v72.703
            c-33.234,0.797-64.828,5.734-93.703,14.094c-7.141-26.484-11.422-55.922-12.063-86.797H247.984z M247.984,352.656v117.375
            c-37.297-5.172-70.313-45.938-89.188-103.938C186.625,358.031,216.734,353.453,247.984,352.656z M263.984,470.031V352.625
            c31.703,0.563,61.859,5.094,89.359,12.875C334.5,423.813,301.406,464.844,263.984,470.031z M263.984,336.625v-72.656H369.75
            c-0.625,30.625-4.859,59.859-11.891,86.188C328.938,341.938,297.281,337.188,263.984,336.625z M263.984,247.969v-72.703
            c33.281-0.672,64.891-5.5,93.797-13.797c7.078,26.406,11.344,55.75,11.969,86.5H263.984z M421.281,117.203
            c-15.656,9.547-33.344,17.703-52.563,24.266c-13.219-40.938-33.266-74-57.406-94.219
            C354.906,58.797,393.156,83.609,421.281,117.203z M200.656,47.25c-24.141,20.234-44.188,53.281-57.406,94.203
            c-19.188-6.563-36.891-14.703-52.531-24.25C118.844,83.625,157.063,58.813,200.656,47.25z M80.969,129.688
            c17.188,10.703,36.609,19.828,57.75,27.063c-7.469,27.781-11.875,58.656-12.5,91.219H40.313
            C41.953,203.938,56.688,163.156,80.969,129.688z M40.313,263.969h85.906c0.625,32.688,5.063,63.688,12.594,91.563
            c-21.094,7.25-40.469,16.359-57.609,27.031C56.75,348.984,41.938,308.109,40.313,263.969z M91.125,395.203
            c15.875-9.703,33.484-17.797,52.281-24.297c13.219,40.781,33.25,73.703,57.344,93.844
            C157.344,453.25,119.219,428.594,91.125,395.203z M311.219,464.75c24.25-20.25,44.359-53.438,57.578-94.547
            c19.281,6.547,37.047,14.719,52.734,24.281C393.313,428.234,354.938,453.156,311.219,464.75z M431.359,381.922
            c-17.266-10.734-36.781-19.859-58.016-27.063c7.406-27.703,11.781-58.453,12.406-90.891h85.938
            C470.078,307.859,455.5,348.438,431.359,381.922z"
              style="fill: rgb(0, 0, 0);"
            ></path>
          </g>
        </svg>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {#each languageList as language}
          <li><button data-id={languageList.indexOf(language)} on:click={switchLanguage}>{languageTranslation[language]}</button></li>
        {/each}
      </ul>
    </div>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn m-1">
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
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button onclick="assembleOptionModal.showModal()"
            >アセンブルオプション</button
          >
        </li>
        <li>
          <button onclick="generalOptionModal.showModal()">一般設定</button>
        </li>
      </ul>
    </div>
  </div>
</div>
<dialog id="assembleOptionModal" class="modal">
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
<dialog id="generalOptionModal" class="modal">
  <div class="modal-box">
    <div class="text-lg font-bold" id="option-title">一般設定</div>
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">言語切り替え</span>
        <select
          class="select select-bordered w-full max-w-xs"
          bind:value={language}
          on:change={switchLanguage}
        >
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </label>
    </div>
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
