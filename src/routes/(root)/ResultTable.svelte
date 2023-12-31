<script>
  import parameterList from "$lib/database/parts-parameter.json";
  import {
    option,
    fixedParts,
    result,
    parameter,
    weaponFormationedParameter,
  } from "$lib/store.js";
  import { displayParameterFormation } from "$lib/functions/displayParameterFormation.js";
  import { weaponParameterFormation } from "$lib/functions/weaponParameterFormation.js";
  const type = ["装備箇所", "パーツ名", "固定", "詳細表示"];
  $weaponFormationedParameter = weaponParameterFormation(parameterList);
  const orderTranslation = {
    右腕武装: $weaponFormationedParameter[0],
    左腕武装: $weaponFormationedParameter[1],
    右肩武装: $weaponFormationedParameter[2],
    左肩武装: $weaponFormationedParameter[3],
    頭部: parameterList["フレーム"]["頭部"],
    コア: parameterList["フレーム"]["コア"],
    腕部: parameterList["フレーム"]["腕部"],
    脚部: parameterList["フレーム"]["脚部"],
    ブースター: parameterList["内装"]["ブースター"],
    火器管制: parameterList["内装"]["FCS"],
    ジェネレータ: parameterList["内装"]["ジェネレータ"],
    拡張機能: parameterList["拡張機能"],
  };
  const orders = Object.keys(orderTranslation);
  const parameterType = [
    ["EN負荷", "総重量", "武器総重量"],
    ["ジェネレータ出力", "脚部積載重量", "腕部積載重量"],
  ];
  function hiddenswitch(event, elementId) {
    if (event.target.checked) {
      if ([6, 7].includes(elementId)) {
        //脚部か腕部を固定した場合
        $option[Object.keys($option)[[6, 7].indexOf(elementId)]] =
          !$option[Object.keys($option)[[6, 7].indexOf(elementId)]]; //オプション自動指定
      }
      //それ以外かつ固定を有効にしたら
      document.querySelector(`select[data-id="${elementId}"]`).disabled =
        !event.target.checked;
      $fixedParts[elementId] = document.querySelector(
        `select[data-id="${elementId}"]`
      ).value;
    } else {
      //そうでなければ
      document.querySelector(`select[data-id="${elementId}"]`).disabled =
        !event.target.checked;
      delete $fixedParts[elementId];
    }
  }
  function changeFixedParts(event, elementId) {
    $fixedParts[elementId] = event.target.value;
    if ($result.length > 0) {
      if (elementId < 4) {
        //武器なら
        Object.values(
          Object.assign(
            Object.values(parameterList["武器"]).flat()[0],
            Object.values(parameterList["武器"]).flat()[1]
          )
        ).forEach((category) => {
          category.forEach((parts) => {
            if (
              parts["パーツ名"] == event.target.value &&
              parts["カテゴリー"] !== undefined
            ) {
              //カテゴリー名の変更
              $result[0][elementId] = parts;
              $result[1][elementId] = parts["EN負荷"];
              $result[2][elementId] = parts["重量"];
              document.querySelector(`div[data-id="${elementId}"]`).innerText =
                parts["カテゴリー"];
            } else if (
              parts["パーツ名"] == event.target.value &&
              parts["カテゴリー"] === undefined
            ) {
              //選択なし時のカテゴリー名の除去
              document.querySelector(`div[data-id="${elementId}"]`).innerText =
                "";
            }
          });
        });
      } else if (elementId < 8) {
        //フレームなら
        Object.values(parameterList["フレーム"]).forEach((category) => {
          category.forEach((parts) => {
            if (parts["パーツ名"] == event.target.value) {
              $result[0][elementId] = parts;
              $result[1][elementId] = parts["EN負荷"];
              $result[2][elementId] = parts["重量"];
              if (parts["カテゴリー"] !== undefined) {
                document.querySelector(
                  `div[data-id="${elementId}"]`
                ).innerText = parts["カテゴリー"];
              }
            }
          });
        });
      } else if (elementId < 11) {
        //内装部分なら
        Object.values(parameterList["内装"]).forEach((category) => {
          category.forEach((parts) => {
            if (parts["パーツ名"] == event.target.value && elementId == 10) {
              $parameter["ジェネレータ出力"] = parseInt(
                parts["EN出力"] * ($result[0][5]["ジェネレータ出力補正"] / 100)
              );
              $result[0][elementId] = parts;
              $result[2][elementId] = parts["重量"];
              return;
            } else if (
              parts["パーツ名"] == event.target.value &&
              elementId != 10
            ) {
              $result[0][elementId] = parts;
              $result[1][elementId] = parts["EN負荷"];
              $result[2][elementId] = parts["重量"];
            }
          });
        });
      }
      if (elementId != 10) {
        $parameter = displayParameterFormation($result);
      }
    } else {
      alert("まずアセンブルを生成してください");
      delete $fixedParts[elementId];
    }
  }
  function assembleCopy() {
    let assembleText = "";
    for (let i = 0; i < orders.length; i++) {
      assembleText += orders[i].toString();
      assembleText += ":";
      assembleText += $result[0].map((item) => item["パーツ名"])[i];
      assembleText += "\n";
    }
    if (!navigator.clipboard) {
      alert("このブラウザは対応していません");
      return;
    }

    navigator.clipboard.writeText(assembleText).then(
      () => {
        alert("アセンブルをクリップボードにコピーしました");
      },
      () => {
        alert("アセンブルのコピーに失敗しました。");
      }
    );
  }
  function assembleDownload() {
    let assembleText = "";
    for (let i = 0; i < orders.length; i++) {
      assembleText += orders[i].toString();
      assembleText += ":";
      assembleText += $result[0].map((item) => item["パーツ名"])[i];
      assembleText += "\n";
    }
    assembleText = assembleText.replace(/\\n/g, "");
    let downLoadLink = document.createElement("a");
    downLoadLink.download = "assemble.txt";
    downLoadLink.href = URL.createObjectURL(
      new Blob([assembleText], { type: "text.plain" })
    );
    downLoadLink.dataset.downloadurl = [
      "text/plain",
      downLoadLink.download,
      downLoadLink.href,
    ].join(":");
    downLoadLink.click();
  }
</script>

{#if $result.length > 0}
  {#each $result[0] as parts}
    <dialog id="parts{$result[0].indexOf(parts)}Modal" class="modal">
      <div class="modal-box">
        <div class="text-lg font-bold" id="parts-title">パーツパラメータ</div>
        <div class="overflow-x-auto">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>パラメータ名</th>
                <th>数値</th>
              </tr>
            </thead>
            <tbody>
              {#each Object.keys(parts) as order}
                <tr>
                  <td>
                    {order}
                  </td>
                  <td>
                    {parts[order]}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  {/each}
{/if}
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
            data-id={orders.indexOf(order)}
            class="select select-ghost w-full"
            on:change={(event) =>
              changeFixedParts(event, orders.indexOf(order))}
            disabled
          >
            {#each [orderTranslation[order]] as categoryParts}
              {#each categoryParts as parts}
                {#if $result.length > 0}
                  {#if parts["パーツ名"] == $result[0][orders.indexOf(order)]["パーツ名"]}
                    <option value={parts["パーツ名"]} selected
                      >{parts["パーツ名"]}</option
                    >
                  {:else}
                    <option value={parts["パーツ名"]}
                      >{parts["パーツ名"]}</option
                    >
                  {/if}
                {:else}
                  <option value={parts["パーツ名"]}>{parts["パーツ名"]}</option>
                {/if}
              {/each}
            {/each}
          </select>
          {#each [orderTranslation[order]] as categoryParts}
            {#each categoryParts as parts}
              {#if $result.length > 0}
                {#if parts["カテゴリー"] !== undefined && parts["パーツ名"] == $result[0][orders.indexOf(order)]["パーツ名"]}
                  <div data-id={orders.indexOf(order)}>
                    {parts["カテゴリー"]}
                  </div>
                {/if}
              {/if}
            {/each}
          {/each}
        </td>
        <td>
          <input
            type="checkbox"
            data-id={orders.indexOf(order)}
            on:change={(event) => hiddenswitch(event, orders.indexOf(order))}
            class="toggle"
          />
        </td>
        <td>
          <button
            class="btn btn-square btn-ghost"
            data-id={orders.indexOf(order)}
            onclick="parts{orders.indexOf(order)}Modal.showModal()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path></svg
            >
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="copy-button">
  <button
    class="btn btn-success text-xl font-medium text-white"
    on:click={assembleCopy}>アセンブルをコピー</button
  >
</div>
<div class="download-button">
  <button
    class="btn btn-success text-xl font-medium text-white"
    on:click={assembleDownload}>アセンブルをファイルとしてダウンロード</button
  >
</div>
{#each parameterType as type}
  <table class="table table-sm">
    <thead>
      <tr id="parameter">
        {#each type as column}
          <th>{column}</th>
        {/each}
      </tr>
    </thead>

    <tbody>
      {#each type as column}
        <td id="parameter">
          {$parameter[column] != undefined ? $parameter[column] : "0"}
        </td>
      {/each}
    </tbody>
  </table>
{/each}

<style>
  th,
  td,
  #parts-title {
    text-align: center;
  }
  #parameter {
    width: calc(100% / 3);
  }
  .copy-button,
  .download-button {
    display: flex;
    justify-content: center;
  }
</style>
