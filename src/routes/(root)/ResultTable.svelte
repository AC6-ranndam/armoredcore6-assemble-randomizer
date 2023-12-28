<script>
  import frame from "$lib/parts/frame.json";
  import weapon from "$lib/parts/weapon.json";
  import parameterList from "$lib/parts/parameter.json";
  import { option, fixedParts, result, parameter } from "$lib/store.js";
  import { parameterFormation } from "$lib/parameterFormation.js";
  const type = ["種類", "パーツ", "固定"];
  let x = []
  console.log(Object.values(parameterList["武器"]["腕部武装"]).map(element => element));
  
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
      document.getElementById(elementId).disabled = !event.target.checked;
      $fixedParts[elementId] =
        document.querySelectorAll("select")[elementId].value;
    } else {
      //そうでなければ
      document.getElementById(elementId).disabled = !event.target.checked;
      delete $fixedParts[elementId];
    }
  }
  function changeFixedParts(event, elementId) {
    $fixedParts[elementId] = event.target.value;
    console.log(event.target.value);
    if ($result.length > 0) {
      if (elementId < 4) {
        //武器なら
        Object.values(weapon)[elementId].forEach((element) => {
          if (element["name"] == event.target.value) {
            $result[1][elementId] = element["en"];
            $result[2][elementId] = element["weight"];
          }
        });
      } else {
        //フレームなら
        Object.values(frame)[elementId - 4].forEach((element) => {
          if (element["name"] == event.target.value) {
            $result[1][elementId] = element["en"];
            $result[2][elementId] = element["weight"];
          }
        });
      }
      $parameter = parameterFormation($result);
    }else{
      alert("まずアセンブルを生成してください")
      delete $fixedParts[elementId];
      console.log($fixedParts)
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
  td {
    text-align: center;
  }
  #parameter{
    width: calc(100%/3);
  }
</style>
