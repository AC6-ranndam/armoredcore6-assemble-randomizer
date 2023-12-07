<script>
  import frame from "$lib/parts/frame.json";
  import weapon from "$lib/parts/weapon.json";
  import { option, fixedParts, result, parameter } from "$lib/store.js";
  const type = ["種類", "パーツ", "固定"];
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
  const parameterType = ["EN負荷", "ジェネレータ出力", "重量", "脚部積載重量","両手武器総重量","腕部積載重量"];
  let enSum = 0;
  let weightSum = 0;
  function hiddenswitch(event, elementId) {
    if ([6, 7].includes(elementId)) {
      //脚部か腕部を固定した場合
      $option[Object.keys($option)[[6, 7].indexOf(elementId)]] =
        !$option[Object.keys($option)[[6, 7].indexOf(elementId)]]; //オプション自動指定
    } else {
      if (event.srcElement.checked) {
        //それ以外かつ固定を有効にしたら
        document.getElementById(elementId).disabled = !event.srcElement.checked;
        $fixedParts[elementId] =
          document.querySelectorAll("select")[elementId].value;
      } else {
        //そうでなければ
        document.getElementById(elementId).disabled = !event.srcElement.checked;
        delete $fixedParts[elementId];
      }
    }
  }
  function changeFixedParts(event, elementId) {
    $fixedParts[elementId] = event.srcElement.value;
    if ($result.length > 0) {
      if (elementId < 4) {
        //武器なら
        Object.values(weapon)[elementId].forEach((element) => {
          if (element["name"] == event.srcElement.value) {
            $result[1][elementId] = element["en"];
            $result[2][elementId] = element["weight"];
          }
        });
      } else {
        //フレームなら
        Object.values(frame)[elementId - 4].forEach((element) => {
          if (element["name"] == event.srcElement.value) {
            $result[1][elementId] = element["en"];
            $result[2][elementId] = element["weight"];
          }
        });
      }
      enSum = $result[1].reduce(function (sum, en) {
        return sum + en;
      }, 0);
      enSum -= $result[1][10]; //ジェネレータ分を引く
      weightSum = $result[2].reduce(function (sum, weight) {
        return sum + weight;
      }, 0);
      $parameter = [enSum,$result[1][10],weightSum,$result[0][7]["Loading Limit"],($result[2][0]+$result[2][1]),$result[0][6]["Loading Limit"]]
    }
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
      {#each parameterType as column}
        <th>{column}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each $parameter as row}<!--パーツ固定の変更に従ってパラメーターを変えたい-->
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
