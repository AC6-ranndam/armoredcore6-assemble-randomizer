<script>
  import "../app.css";
  import frame from "$lib/parts/frame.json";
  import weapon from "$lib/parts/weapon.json";
  import { assemble } from "$lib/assemble.js";
  let type = ["種類", "パーツ", "固定"];
  let orders = [
    "右腕武装",
    "左腕武装",
    "右肩武装",
    "左肩武装",
    "頭部",
    "コア",
    "腕部",
    "脚部",
    "ブースター",
    "火器管制",
    "ジェネレータ",
    "拡張機能",
  ];
  let orderTranslation = {
    "double-hand-weapon": "右腕武装",
    "hand-weapon": "左腕武装",
    "double-shoulder-weapon": "右肩武装",
    "shoulder-weapon": "左肩武装",
    head: "頭部",
    core: "コア",
    arm: "腕部",
    reg: "脚部",
    booster: "ブースター",
    fcs: "火器管制",
    generator: "ジェネレータ",
    option: "拡張機能",
  };
  let option = {
    permitExcessWeight: false,
    extendedFunctionNonePermit: false,
    armedNonePermit: false,
    hangerWeaponRate: 0,
  };
  let en = 0;
  let weight = 0;
  let partsList = [];
  let partsType = [];
  while (true) {
    Object.keys(frame).forEach(function (element) {
      let frameParts = [];
      if (option["extendedFunctionNonePermit"] === true) {
        frameParts = frame[element].filter(function (parts) {
          return parts["name"] != "NONE";
        });
      } else {
        frameParts = frame[element];
      }
      let choice = Math.floor(Math.random() * frameParts.length);
      partsList.push(frameParts[choice]["name"]);
      en += frameParts[choice]["en"];
      weight += frameParts[choice]["weight"];
      partsType.push(element);
    });
    Object.keys(weapon).forEach(function (element) {
      //左腕→左肩→右腕→右肩
      let weaponParts = [];
      if (option["armedNonePermit"] === true) {
        weaponParts = weapon[element].filter(function (parts) {
          return parts["name"] != "NONE";
        });
      } else {
        weaponParts = weapon[element];
      }
      let choice = Math.floor(Math.random() * weaponParts.length);
      if (option["hangerWeaponRate"] > 0) {
        if (
          Math.floor(Math.random() * 101) < option["hangerWeaponRate"] &&
          element.includes("shoulder")
        ) {
          if (element.includes("double")) {
            weaponParts = Object.assign(
              weaponParts["double-hand-weapon"],
              weaponParts["double-shoulder-weapon"]
            );
          } else {
            weaponParts = Object.assign(
              weapon["hand-weapon"],
              weapon["shoulder-weapon"]
            );
          }
        }
      }
      partsList.push(weaponParts[choice]["name"]);
      en += weaponParts[choice]["en"];
      weight += weaponParts[choice]["weight"];
      partsType.push(element);
    });
    if (
      en - partsList[4]["en"] <= partsList[4]["en"] &&
      (weight <= partsList[3]["Loading Limit"] || option["permitExcessWeight"])
    ) {
      break;
    } else {
      partsList = [];
      en = 0;
      weight = 0;
      partsType = [];
    }
  }
  let result = partsList;

  let allDatas = Object.assign(frame, weapon);
  console.log(result);
</script>

<!--<table class="table">
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
            {#each result[3] as type}
            <select id={type}>
              {#each allDatas as allData}
              {#if result[3] == allData[type]}
              <option value={result[0]["name"]} selected>result</option>
              {:else}
              <option value={allData[order[order]]}>{allData[order[order]]}</option>
              {/if}
            </select>
          </td>
          <td>
            <input type="checkbox" id={order}>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>-->
